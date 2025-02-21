import { BeneficiaireCraData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { createBeneficiairesForParticipantsAnonymes } from '@app/web/beneficiaire/createBeneficiairesForParticipantsAnonymes'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import { craDureeDataToMinutes } from '@app/web/cra/minutesToCraDuree'
import { prismaClient } from '@app/web/prismaClient'
import { invalidError } from '@app/web/server/rpc/trpcErrors'
import { getStructureEmployeuseAddressForMediateur } from '@app/web/structure/getStructureEmployeuseAddress'
import { addMutationLog } from '@app/web/utils/addMutationLog'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { yesNoToOptionalBoolean } from '@app/web/utils/yesNoBooleanOptions'
import { Prisma, Structure, TypeActivite } from '@prisma/client'
import { v4 } from 'uuid'

const getExistingBeneficiairesSuivis = async ({
  beneficiaires,
  mediateurId,
  activiteId,
}: {
  beneficiaires: { id?: string | null }[]
  mediateurId: string
  activiteId?: string | null
}) => {
  if (beneficiaires.length === 0) return []

  const existingBeneficiairesIds = beneficiaires
    .map((beneficiaire) => beneficiaire.id)
    .filter(onlyDefinedAndNotNull)

  const existingBeneficiaires = await prismaClient.beneficiaire.findMany({
    where: {
      id: {
        in: existingBeneficiairesIds,
      },
    },
    select: {
      id: true,
      mediateurId: true,
      anonyme: true,
      accompagnements: {
        select: { id: true, activiteId: true },
      },
    },
  })

  if (existingBeneficiaires.length !== existingBeneficiairesIds.length) {
    throw invalidError('Beneficiaire not found')
  }

  for (const existingBeneficiaire of existingBeneficiaires) {
    if (existingBeneficiaire.mediateurId !== mediateurId) {
      throw invalidError('Beneficiaire not created by current mediateur')
    }
  }

  const beneficiairesWithPremierAccompagnement = existingBeneficiaires.map(
    ({ accompagnements, ...rest }) => ({
      ...rest,
      premierAccompagnement:
        accompagnements.length === 0 ||
        (accompagnements.length === 1 &&
          accompagnements[0].activiteId === activiteId),
    }),
  )

  // Beneficiaire anonyme returned from cra individuel / demarche should not be included
  // as we delete/recreate them from anonymous data given in the form
  return beneficiairesWithPremierAccompagnement.filter(
    ({ anonyme }) => !anonyme,
  )
}

export const getBeneficiairesAnonymesWithOnlyAccompagnementsForThisActivite =
  async ({ activiteId }: { activiteId: string }) => {
    /**
     * We were using prisma :
     * where: {
     *         anonyme: true,
     *         accompagnements: {
     *           every: {
     *             activiteId: id,
     *           },
     *         },
     *       }
     *
     * but this was compiled as a  NOT IN ( ... subquery ) which is way too slow (o(n*m))
     *
     * so we now use a raw query that uses indexes effectively
     */
    const anonymesIds = await prismaClient.$queryRaw<
      { beneficiaire_id: string }[]
    >`
        select a.beneficiaire_id
        from accompagnements a
                 inner join beneficiaires b
                            on b.id = a.beneficiaire_id
                                and b.anonyme = true
        where a.activite_id = ${activiteId}::UUID
          and not exists (select 1
                          from accompagnements a2
                          where a2.beneficiaire_id = a.beneficiaire_id
                            and a2.activite_id <> ${activiteId}::UUID);
    `

    return anonymesIds.map(({ beneficiaire_id }) => beneficiaire_id)
  }

const getExistingStructure = async ({
  structureId,
  mediateurId,
}: {
  structureId: string | null | undefined
  mediateurId: string
}) => {
  if (!structureId) {
    return null
  }
  const existingStructure = await prismaClient.structure.findUnique({
    where: {
      id: structureId,
      mediateursEnActivite: {
        some: {
          mediateurId,
        },
      },
    },
  })

  if (!existingStructure) {
    throw invalidError('Structure not found')
  }

  return existingStructure
}

const beneficiaireAnonymeCreateDataFromForm = ({
  prenom,
  nom,
  telephone,
  email,
  anneeNaissance,
  adresse,
  communeResidence,
  genre,
  trancheAge,
  statutSocial,
  notes,
  mediateurId,
  dejaAccompagne,
}: BeneficiaireCraData): Prisma.BeneficiaireCreateInput & {
  id: string
  dejaAccompagne: boolean
} => ({
  id: v4(),
  mediateur: { connect: { id: mediateurId } },
  prenom: prenom ?? undefined,
  nom: nom ?? undefined,
  anonyme: true,
  telephone: telephone ?? undefined,
  email: email ?? undefined,
  anneeNaissance: anneeNaissance ?? undefined,
  adresse: adresse ?? undefined,
  genre: genre ?? undefined,
  trancheAge: trancheAge ?? undefined,
  statutSocial: statutSocial ?? undefined,
  notes: notes ?? undefined,
  commune: communeResidence?.commune ?? undefined,
  communeCodePostal: communeResidence?.codePostal ?? undefined,
  communeCodeInsee: communeResidence?.codeInsee ?? undefined,
  dejaAccompagne: dejaAccompagne ?? false,
})

// Utilisée comme localisation fallback pour les activités à distance
export type StructureEmployeuseCraInfo = Pick<
  Structure,
  'commune' | 'codePostal' | 'codeInsee'
>

export type CreateOrUpdateActiviteInput =
  | {
      type: 'Collectif'
      data: CraCollectifData
    }
  | {
      type: 'Individuel'
      data: CraIndividuelData
    }
  | {
      type: 'Demarche'
      data: CraDemarcheAdministrativeData
    }

const withoutDejaAccompagne = <T>({
  dejaAccompagne: _,
  ...beneficiaireAnonymeToCreate
}: T & { id: string; dejaAccompagne: boolean }) => beneficiaireAnonymeToCreate

// TODO more integration test cases on this critical function
export const createOrUpdateActivite = async ({
  input,
  userId,
}: {
  input: CreateOrUpdateActiviteInput
  userId: string
}) => {
  const stopwatch = createStopwatch()

  const { data } = input

  const { date, duree, id, mediateurId, notes, structureId } = data

  const creationId = v4()

  const existingBeneficiairesSuivis = await getExistingBeneficiairesSuivis({
    mediateurId,
    beneficiaires:
      input.type === TypeActivite.Collectif
        ? input.data.participants
        : [input.data.beneficiaire],
    activiteId: id,
  })

  const beneficiairesAnonymesCollectif =
    input.type === 'Collectif'
      ? createBeneficiairesForParticipantsAnonymes({
          mediateurId,
          rootUuid: id ?? creationId,
          participantsAnonymes: input.data.participantsAnonymes,
        })
      : []

  // TODO Check this for both update and create
  const beneficiaireAnonymeToCreate =
    input.type === 'Collectif' ||
    // Do not create anonymous beneficiaire for one to one cra if it is "suivi"
    existingBeneficiairesSuivis.length > 0
      ? undefined
      : beneficiaireAnonymeCreateDataFromForm(input.data.beneficiaire)

  const structure =
    data.typeLieu === 'LieuActivite'
      ? await getExistingStructure({
          structureId,
          mediateurId,
        })
      : null

  // If accompagnement is "A distance", we fetch the structure employeuse to assign location
  const structureEmployeuse =
    data.typeLieu === 'ADistance'
      ? await getStructureEmployeuseAddressForMediateur(mediateurId)
      : null

  const orienteVersStructure = yesNoToOptionalBoolean(
    'orienteVersStructure' in data ? data.orienteVersStructure : undefined,
  )

  const { lieuCommune, lieuCodePostal, lieuCodeInsee } =
    data.typeLieu === 'Domicile' || data.typeLieu === 'Autre'
      ? {
          lieuCommune: data.lieuCommuneData?.commune,
          lieuCodePostal: data.lieuCommuneData?.codePostal,
          lieuCodeInsee: data.lieuCommuneData?.codeInsee,
        }
      : data.typeLieu === 'ADistance'
        ? {
            lieuCommune: structureEmployeuse?.structure.commune ?? null,
            lieuCodePostal: structureEmployeuse?.structure.codePostal ?? null,
            lieuCodeInsee: structureEmployeuse?.structure.codeInsee ?? null,
          }
        : {
            lieuCommune: null,
            lieuCodePostal: null,
            lieuCodeInsee: null,
          }

  const prismaData = {
    autonomie: 'autonomie' in data ? data.autonomie : undefined,
    date: new Date(date),
    mediateur: {
      connect: { id: mediateurId },
    },
    duree: craDureeDataToMinutes(duree),
    typeLieu: data.typeLieu ?? undefined,
    niveau: 'niveau' in data ? data.niveau : undefined,
    materiel: 'materiel' in data ? data.materiel : undefined,
    titreAtelier: 'titreAtelier' in data ? data.titreAtelier : undefined,
    precisionsDemarche:
      'precisionsDemarche' in data ? data.precisionsDemarche : undefined,
    degreDeFinalisation:
      'degreDeFinalisation' in data ? data.degreDeFinalisation : undefined,
    lieuCommune,
    lieuCodePostal,
    lieuCodeInsee,
    notes,
    orienteVersStructure,
    structureDeRedirection:
      // For cra individuel, only set structure de redirection if orienteVersStructure is true
      input.type === 'Individuel'
        ? orienteVersStructure
          ? input.data.structureDeRedirection
          : null
        : 'structureDeRedirection' in data
          ? data.structureDeRedirection
          : undefined,

    thematiques:
      input.type === 'Demarche'
        ? (input.data.thematiquesMediationNumerique ?? [])
        : input.data.thematiques,
    thematiquesDemarche:
      input.type === 'Demarche' ? input.data.thematiques : undefined,
    structure:
      // Only set structure if it is the correct type of lieuAccompagnement
      structure
        ? { connect: { id: structure.id } }
        : id
          ? { disconnect: true } // disconnect if this is an update
          : undefined, // no data if creation
  } satisfies Prisma.ActiviteUpdateInput

  if (id) {
    // We delete all the anonymes beneficiaires that have only this activite as accompagmements to ease the
    // merge logic of old and new anonymous beneficiaires
    const anonymesIdsToDelete =
      await getBeneficiairesAnonymesWithOnlyAccompagnementsForThisActivite({
        activiteId: id,
      })

    // This is an Update operation
    await prismaClient.$transaction(
      [
        // Delete all accompagnements as we recreate them after
        prismaClient.accompagnement.deleteMany({
          where: {
            activiteId: id,
          },
        }),
        anonymesIdsToDelete.length > 0
          ? prismaClient.beneficiaire.deleteMany({
              where: {
                anonyme: true,
                id: {
                  in: anonymesIdsToDelete,
                },
              },
            })
          : null,
        // (re)Create beneficiaire anonyme for one-to-one cra
        beneficiaireAnonymeToCreate?.id
          ? prismaClient.beneficiaire.create({
              data: withoutDejaAccompagne(beneficiaireAnonymeToCreate),
              select: { id: true },
            })
          : null,
        // Create beneficiairesAnonymesCollectif
        beneficiairesAnonymesCollectif.length > 0
          ? prismaClient.beneficiaire.createMany({
              data: beneficiairesAnonymesCollectif.map((beneficiaire) =>
                withoutDejaAccompagne(beneficiaire),
              ),
            })
          : null,
        // Create accompagnements
        prismaClient.accompagnement.createMany({
          data: [
            ...existingBeneficiairesSuivis.map((beneficiaire) => ({
              id: v4(),
              beneficiaireId: beneficiaire.id,
              activiteId: id,
              premierAccompagnement: beneficiaire.premierAccompagnement,
            })),
            ...beneficiairesAnonymesCollectif.map((beneficiaire) => ({
              id: v4(),
              beneficiaireId: beneficiaire.id,
              activiteId: id,
              premierAccompagnement: !beneficiaire.dejaAccompagne,
            })),
            ...(beneficiaireAnonymeToCreate
              ? [
                  {
                    id: v4(),
                    beneficiaireId: beneficiaireAnonymeToCreate.id,
                    activiteId: id,
                    premierAccompagnement:
                      !beneficiaireAnonymeToCreate.dejaAccompagne,
                  },
                ]
              : []),
          ],
        }),
        // Update the activite
        prismaClient.activite.update({
          where: { id },
          data: {
            ...prismaData,
          },
        }),
      ].filter(onlyDefinedAndNotNull),
    )

    // Create mutation for audit log
    addMutationLog({
      userId,
      nom: 'ModifierActivite',
      duration: stopwatch.stop().duration,
      data: input,
    })

    return {
      id,
      type: input.type,
    }
  }

  await prismaClient.$transaction(
    [
      // Create beneficiaire anonyme for one to one cras,
      beneficiaireAnonymeToCreate
        ? prismaClient.beneficiaire.create({
            data: withoutDejaAccompagne(beneficiaireAnonymeToCreate),
            select: { id: true },
          })
        : null,
      // Create beneficiaires anonymes
      beneficiairesAnonymesCollectif.length > 0
        ? prismaClient.beneficiaire.createMany({
            data: beneficiairesAnonymesCollectif.map((beneficiaire) =>
              withoutDejaAccompagne(beneficiaire),
            ),
          })
        : null,
      // Create activite
      prismaClient.activite.create({
        data: {
          ...prismaData,
          type: input.type,
          id: creationId,
        },
        select: { id: true },
      }),
      // Create accompagnements
      prismaClient.accompagnement.createMany({
        data: [
          ...existingBeneficiairesSuivis.map((beneficiaire) => ({
            id: v4(),
            beneficiaireId: beneficiaire.id,
            activiteId: creationId,
            premierAccompagnement: beneficiaire.premierAccompagnement,
          })),
          ...beneficiairesAnonymesCollectif.map((beneficiaire) => ({
            id: v4(),
            beneficiaireId: beneficiaire.id,
            activiteId: creationId,
            premierAccompagnement: !beneficiaire.dejaAccompagne,
          })),
          ...(beneficiaireAnonymeToCreate
            ? [
                {
                  id: v4(),
                  beneficiaireId: beneficiaireAnonymeToCreate.id,
                  activiteId: creationId,
                  premierAccompagnement:
                    !beneficiaireAnonymeToCreate.dejaAccompagne,
                },
              ]
            : []),
        ],
      }),
    ].filter(onlyDefinedAndNotNull),
  )

  // Create mutation for audit log
  addMutationLog({
    userId,
    nom: 'CreerActivite',
    duration: stopwatch.stop().duration,
    data: input,
  })

  return {
    id: creationId,
    type: input.type,
  }
}
