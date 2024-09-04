import { prismaClient } from '@app/web/prismaClient'
import { invalidError } from '@app/web/server/rpc/trpcErrors'
import { BeneficiaireCraData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { Prisma, TypeActivite } from '@prisma/client'
import { yesNoToOptionalBoolean } from '@app/web/utils/yesNoBooleanOptions'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import { v4 } from 'uuid'
import { createBeneficiairesForParticipantsAnonymes } from '@app/web/beneficiaire/createBeneficiairesForParticipantsAnonymes'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { addMutationLog } from '@app/web/utils/addMutationLog'

const getExistingBeneficiaire = async ({
  beneficiaireId,
  mediateurId,
}: {
  beneficiaireId: string | null | undefined
  mediateurId: string
}) => {
  if (!beneficiaireId) {
    return null
  }
  const existingBeneficiaire = await prismaClient.beneficiaire.findUnique({
    where: {
      id: beneficiaireId,
      mediateurId,
    },
    select: {
      id: true,
      mediateurId: true,
    },
  })
  // Enforce that the beneficiaire is created by the current mediateur
  if (!existingBeneficiaire) {
    throw invalidError('Beneficiaire not found')
  }
  if (existingBeneficiaire.mediateurId !== mediateurId) {
    throw invalidError('Beneficiaire not created by current mediateur')
  }

  return existingBeneficiaire
}

const getExistingBeneficiairesSuivis = async ({
  beneficiaires,
  mediateurId,
}: {
  beneficiaires: { id?: string | null }[]
  mediateurId: string
}) => {
  if (beneficiaires.length === 0) return []

  const existingBeneficiaires = await prismaClient.beneficiaire.findMany({
    where: {
      id: {
        in: beneficiaires
          .map((beneficiaire) => beneficiaire.id)
          .filter(isDefinedAndNotNull),
      },
    },
    select: {
      id: true,
      mediateurId: true,
      anonyme: true,
    },
  })

  if (existingBeneficiaires.length !== beneficiaires.length) {
    throw invalidError('Beneficiaire not found')
  }

  for (const existingBeneficiaire of existingBeneficiaires) {
    if (existingBeneficiaire.mediateurId !== mediateurId) {
      throw invalidError('Beneficiaire not created by current mediateur')
    }
  }

  // Beneficiaire anonyme returned from cra individuel / demarche should not be included
  // as we delete/recreate them from anonymous data given in the form
  return existingBeneficiaires.filter(({ anonyme }) => !anonyme)
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
  vaPoursuivreParcoursAccompagnement,
  genre,
  trancheAge,
  statutSocial,
  notes,
  mediateurId,
}: BeneficiaireCraData): Prisma.BeneficiaireCreateInput => ({
  mediateur: {
    connect: { id: mediateurId },
  },
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
  vaPoursuivreParcoursAccompagnement: yesNoToOptionalBoolean(
    vaPoursuivreParcoursAccompagnement ?? undefined,
  ),
  commune: communeResidence?.nom ?? undefined,
  communeCodePostal: communeResidence?.codePostal ?? undefined,
  communeCodeInsee: communeResidence?.codeInsee ?? undefined,
})

type CreateOrUpdateActiviteInput =
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

// TODO integration test on this one
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
    ('typeLieuAtelier' in data && data.typeLieuAtelier === 'LieuActivite') ||
    ('typeLieu' in data && data.typeLieu === 'LieuActivite')
      ? await getExistingStructure({
          structureId,
          mediateurId,
        })
      : null

  const orienteVersStructure = yesNoToOptionalBoolean(
    'orienteVersStructure' in data ? data.orienteVersStructure : undefined,
  )

  const { lieuCommune, lieuCodePostal, lieuCodeInsee } =
    'typeLieuAtelier' in data && data.typeLieuAtelier === 'Autre'
      ? {
          lieuCommune: data.lieuAtelierAutreCommune?.commune,
          lieuCodePostal: data.lieuAtelierAutreCommune?.codePostal,
          lieuCodeInsee: data.lieuAtelierAutreCommune?.codeInsee,
        }
      : 'typeLieu' in data && data.typeLieu === 'Domicile'
        ? {
            lieuCommune: data.lieuAccompagnementDomicileCommune?.commune,
            lieuCodePostal: data.lieuAccompagnementDomicileCommune?.codePostal,
            lieuCodeInsee: data.lieuAccompagnementDomicileCommune?.codeInsee,
          }
        : {
            lieuCommune: undefined,
            lieuCodePostal: undefined,
            lieuCodeInsee: undefined,
          }

  const prismaData = {
    autonomie: 'autonomie' in data ? data.autonomie : undefined,
    date: new Date(date),
    mediateur: {
      connect: { id: mediateurId },
    },
    duree: Number.parseInt(duree, 10),
    typeLieu: 'typeLieu' in data ? data.typeLieu : undefined,
    typeLieuAtelier:
      'typeLieuAtelier' in data ? data.typeLieuAtelier : undefined,
    niveau: 'niveau' in data ? data.niveau : undefined,
    materiel: 'materiel' in data ? data.materiel : undefined,
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

    thematiques: input.type === 'Demarche' ? undefined : input.data.thematiques,
    thematiquesDemarche:
      input.type === 'Demarche' ? input.data.thematiques : undefined,
    structure:
      // Only set structure if it is the correct type of lieuAccompagnement
      structure
        ? { connect: { id: structure.id } }
        : id
          ? // disconnect if this is an update
            {
              disconnect: true,
            }
          : // no data if creation
            undefined,
  } satisfies Prisma.ActiviteUpdateInput

  if (id) {
    // This is an Update operation
    await prismaClient.$transaction(
      [
        // If collectif, delete all beneficiaires anonymes as we will recreate them from counters
        // or data if not selected in form
        input.type === 'Collectif'
          ? prismaClient.beneficiaire.deleteMany({
              where: {
                anonyme: true,
                accompagnements: {
                  every: {
                    activiteId: id,
                  },
                },
              },
            })
          : null,
        // Delete all accompagnements as we recreate them after
        prismaClient.accompagnement.deleteMany({
          where: {
            activiteId: id,
          },
        }),
        // (re)Create beneficiaire anonyme for one-to-one cra
        beneficiaireAnonymeToCreate
          ? prismaClient.beneficiaire.create({
              data: beneficiaireAnonymeToCreate,
              select: { id: true },
            })
          : null,
        // Create beneficiairesAnonymesCollectif
        beneficiairesAnonymesCollectif.length > 0
          ? prismaClient.beneficiaire.createMany({
              data: beneficiairesAnonymesCollectif,
            })
          : null,
        // Create accompagnements
        prismaClient.accompagnement.createMany({
          data: [
            ...existingBeneficiairesSuivis.map((beneficiaire) => ({
              id: v4(),
              beneficiaireId: beneficiaire.id,
              activiteId: id,
            })),
            ...beneficiairesAnonymesCollectif.map((beneficiaire) => ({
              id: v4(),
              beneficiaireId: beneficiaire.id,
              activiteId: id,
            })),
          ],
        }),
        // Update the activite
        prismaClient.activite.update({
          where: { id },
          data: {
            ...prismaData,
          },
        }),
      ].filter(isDefinedAndNotNull),
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
      // Create beneficiaires anonymes
      beneficiairesAnonymesCollectif.length > 0
        ? prismaClient.beneficiaire.createMany({
            data: beneficiairesAnonymesCollectif,
          })
        : null,
      // Create beneficiaire anonyme for one to one cras,
      beneficiaireAnonymeToCreate
        ? prismaClient.beneficiaire.create({
            data: beneficiaireAnonymeToCreate,
            select: { id: true },
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
          })),
          ...beneficiairesAnonymesCollectif.map((beneficiaire) => ({
            id: v4(),
            beneficiaireId: beneficiaire.id,
            activiteId: creationId,
          })),
        ],
      }),
    ].filter(isDefinedAndNotNull),
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
