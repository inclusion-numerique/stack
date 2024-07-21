import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CraIndividuelValidation } from '@app/web/cra/CraIndividuelValidation'
import { enforceIsMediateur } from '@app/web/server/rpc/enforceIsMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { BeneficiaireCraData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { yesNoToOptionalBoolean } from '@app/web/utils/yesNoBooleanOptions'
import { CraDemarcheAdministrativeValidation } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import { CraCollectifValidation } from '@app/web/cra/CraCollectifValidation'

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

const getExistingStructure = async ({
  structureId,
}: {
  structureId: string | null | undefined
}) => {
  if (!structureId) {
    return null
  }
  const existingStructure = await prismaClient.structure.findUnique({
    where: {
      id: structureId,
    },
  })

  if (!existingStructure) {
    throw invalidError('Structure not found')
  }

  return existingStructure
}

const beneficiaireUpdateInputFromForm = ({
  prenom,
  nom,
  telephone,
  email,
  dateNaissance,
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
  telephone: telephone ?? undefined,
  email: email ?? undefined,
  dateNaissance: dateNaissance ?? undefined,
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

export const craRouter = router({
  individuel: protectedProcedure
    .input(CraIndividuelValidation)
    .mutation(
      async ({
        input: {
          id,
          beneficiaire,
          mediateurId,
          autonomie,
          date,
          duree,
          lieuAccompagnement,
          lieuActiviteId,
          materiel,
          notes,
          thematiques,
          lieuAccompagnementDomicileCommune,
          orienteVersStructure: orienteVersStructureYesNo,
          structureDeRedirection,
        },
        ctx: { user },
      }) => {
        enforceIsMediateur(user)

        // Enforce user can create CRA for given mediateurId (for now only self)
        if (mediateurId !== user.mediateur.id) {
          throw forbiddenError('Cannot create CRA for another mediateur')
        }

        // Enforce beneficiaire data is coherent with mediateurId
        if (
          beneficiaire?.mediateurId &&
          beneficiaire.mediateurId !== mediateurId
        ) {
          throw invalidError('Beneficiaire data does not match mediateurId')
        }

        const existingBeneficiaire = await getExistingBeneficiaire({
          beneficiaireId: beneficiaire?.id,
          mediateurId,
        })

        const existingLieuActivite = await getExistingStructure({
          structureId: lieuActiviteId,
        })

        const orienteVersStructure = yesNoToOptionalBoolean(
          orienteVersStructureYesNo ?? undefined,
        )

        const data = {
          autonomie,
          date: new Date(date),
          creeParMediateur: {
            connect: { id: mediateurId },
          },
          // TODO ok for edition of anonymous ?
          beneficiaire: existingBeneficiaire
            ? { connect: { id: existingBeneficiaire.id } }
            : {
                create: {
                  id: v4(),
                  ...beneficiaireUpdateInputFromForm(beneficiaire),
                  mediateur: {
                    connect: { id: mediateurId },
                  },
                },
              },
          duree: Number.parseInt(duree, 10),
          lieuAccompagnement,
          materiel,
          // Only set domicile commune if it is the correct type of lieuAccompagnement
          lieuAccompagnementDomicileCommune:
            lieuAccompagnement === 'Domicile'
              ? lieuAccompagnementDomicileCommune?.commune
              : null,
          lieuAccompagnementDomicileCodePostal:
            lieuAccompagnement === 'Domicile'
              ? lieuAccompagnementDomicileCommune?.codePostal
              : null,
          lieuAccompagnementDomicileCodeInsee:
            lieuAccompagnement === 'Domicile'
              ? lieuAccompagnementDomicileCommune?.codeInsee
              : null,
          notes,
          orienteVersStructure,
          structureDeRedirection: orienteVersStructure
            ? structureDeRedirection ?? null
            : null,
          thematiques,
          lieuActivite:
            // Only set lieuActivité if it is the correct type of lieuAccompagnement
            lieuAccompagnement === 'LieuActivite' && existingLieuActivite
              ? { connect: { id: existingLieuActivite.id } }
              : {
                  disconnect: true,
                },
        } satisfies Prisma.CraIndividuelUpdateInput

        if (id) {
          const updated = await prismaClient.craIndividuel.update({
            where: { id },
            data,
          })

          return updated
        }

        const newId = v4()
        const created = await prismaClient.craIndividuel.create({
          data: {
            id: newId,
            activite: {
              create: {
                id: v4(),
                mediateurId,
              },
            },
            ...data,
          },
        })

        return created
      },
    ),
  demarcheAdministrative: protectedProcedure
    .input(CraDemarcheAdministrativeValidation)
    .mutation(
      async ({
        input: {
          id,
          beneficiaire,
          mediateurId,
          autonomie,
          date,
          duree,
          lieuAccompagnement,
          lieuActiviteId,
          degreDeFinalisation,
          precisionsDemarche,
          notes,
          thematiques,
          lieuAccompagnementDomicileCommune,
          structureDeRedirection,
        },
        ctx: { user },
      }) => {
        enforceIsMediateur(user)

        // Enforce user can create CRA for given mediateurId (for now only self)
        if (mediateurId !== user.mediateur.id) {
          throw forbiddenError('Cannot create CRA for another mediateur')
        }

        // Enforce beneficiaire data is coherent with mediateurId
        if (
          beneficiaire?.mediateurId &&
          beneficiaire.mediateurId !== mediateurId
        ) {
          throw invalidError('Beneficiaire data does not match mediateurId')
        }

        const existingBeneficiaire = await getExistingBeneficiaire({
          beneficiaireId: beneficiaire?.id,
          mediateurId,
        })

        const existingLieuActivite = await getExistingStructure({
          structureId: lieuActiviteId,
        })

        const data = {
          date: new Date(date),
          creeParMediateur: {
            connect: { id: mediateurId },
          },
          // TODO ok for edition of anonymous ?
          beneficiaire: existingBeneficiaire
            ? { connect: { id: existingBeneficiaire.id } }
            : {
                create: {
                  id: v4(),
                  ...beneficiaireUpdateInputFromForm(beneficiaire),
                  mediateur: {
                    connect: { id: mediateurId },
                  },
                },
              },
          duree: Number.parseInt(duree, 10),
          lieuAccompagnement,
          // Only set domicile commune if it is the correct type of lieuAccompagnement
          lieuAccompagnementDomicileCommune:
            lieuAccompagnement === 'Domicile'
              ? lieuAccompagnementDomicileCommune?.commune
              : null,
          lieuAccompagnementDomicileCodePostal:
            lieuAccompagnement === 'Domicile'
              ? lieuAccompagnementDomicileCommune?.codePostal
              : null,
          lieuAccompagnementDomicileCodeInsee:
            lieuAccompagnement === 'Domicile'
              ? lieuAccompagnementDomicileCommune?.codeInsee
              : null,
          notes,
          degreDeFinalisation,
          autonomie,
          precisionsDemarche,
          structureDeRedirection:
            degreDeFinalisation === 'OrienteVersStructure'
              ? structureDeRedirection ?? null
              : null,
          thematiques,
          lieuActivite:
            // Only set lieuActivité if it is the correct type of lieuAccompagnement
            lieuAccompagnement === 'LieuActivite' && existingLieuActivite
              ? { connect: { id: existingLieuActivite.id } }
              : undefined,
        } satisfies Prisma.CraDemarcheAdministrativeUpdateInput

        if (id) {
          const updated = await prismaClient.craDemarcheAdministrative.update({
            where: { id },
            data,
          })

          return updated
        }

        const newId = v4()
        const created = await prismaClient.craDemarcheAdministrative.create({
          data: {
            id: newId,
            activite: {
              create: {
                id: v4(),
                mediateurId,
              },
            },
            ...data,
          },
        })

        return created
      },
    ),
  collectif: protectedProcedure
    .input(CraCollectifValidation)
    .mutation(
      async ({
        input: {
          id,
          mediateurId,
          date,
          duree,
          lieuActiviteId,
          materiel,
          notes,
          thematiques,
          lieuAtelier,
          lieuAtelierAutreCommune,
          niveau,
          participants,
          participantsAnonymes,
          titreAtelier,
        },
        ctx: { user },
      }) => {
        enforceIsMediateur(user)

        // Enforce user can create CRA for given mediateurId (for now only self)
        if (mediateurId !== user.mediateur.id) {
          throw forbiddenError('Cannot create CRA for another mediateur')
        }

        // Enforce beneficiaire data is coherent with mediateurId
        for (const participant of participants) {
          if (
            participant?.mediateurId &&
            participant.mediateurId !== mediateurId
          ) {
            throw invalidError('Beneficiaire data does not match mediateurId')
          }
        }

        const existingBeneficiaire = await getExistingBeneficiaire({
          beneficiaireId: beneficiaire?.id,
          mediateurId,
        })

        const existingLieuActivite = await getExistingStructure({
          structureId: lieuActiviteId,
        })

        const orienteVersStructure = yesNoToOptionalBoolean(
          orienteVersStructureYesNo ?? undefined,
        )

        const data = {
          autonomie,
          date: new Date(date),
          creeParMediateur: {
            connect: { id: mediateurId },
          },
          // TODO ok for edition of anonymous ?
          beneficiaire: existingBeneficiaire
            ? { connect: { id: existingBeneficiaire.id } }
            : {
                create: {
                  id: v4(),
                  ...beneficiaireUpdateInputFromForm(beneficiaire),
                  mediateur: {
                    connect: { id: mediateurId },
                  },
                },
              },
          duree: Number.parseInt(duree, 10),
          lieuAccompagnement,
          materiel,
          // Only set domicile commune if it is the correct type of lieuAccompagnement
          lieuAccompagnementDomicileCommune:
            lieuAccompagnement === 'Domicile'
              ? lieuAccompagnementDomicileCommune?.commune
              : null,
          lieuAccompagnementDomicileCodePostal:
            lieuAccompagnement === 'Domicile'
              ? lieuAccompagnementDomicileCommune?.codePostal
              : null,
          lieuAccompagnementDomicileCodeInsee:
            lieuAccompagnement === 'Domicile'
              ? lieuAccompagnementDomicileCommune?.codeInsee
              : null,
          notes,
          orienteVersStructure,
          structureDeRedirection: orienteVersStructure
            ? structureDeRedirection ?? null
            : null,
          thematiques,
          lieuActivite:
            // Only set lieuActivité if it is the correct type of lieuAccompagnement
            lieuAccompagnement === 'LieuActivite' && existingLieuActivite
              ? { connect: { id: existingLieuActivite.id } }
              : {
                  disconnect: true,
                },
        } satisfies Prisma.CraIndividuelUpdateInput

        if (id) {
          const updated = await prismaClient.craIndividuel.update({
            where: { id },
            data,
          })

          return updated
        }

        const newId = v4()
        const created = await prismaClient.craIndividuel.create({
          data: {
            id: newId,
            activite: {
              create: {
                id: v4(),
                mediateurId,
              },
            },
            ...data,
          },
        })

        return created
      },
    ),
})
