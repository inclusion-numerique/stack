import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CraIndividuelValidation } from '@app/web/cra/CraIndividuelValidation'
import { enforceIsMediateur } from '@app/web/server/rpc/enforceIsMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { BeneficiaireData } from '@app/web/beneficiaire/BeneficiaireValidation'

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
  if (existingBeneficiaire.creeParMediateurId !== mediateurId) {
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
  codeCommune,
  genre,
  trancheAge,
  statutSocial,
  notes,
  mediateurId,
}: BeneficiaireData): Prisma.BeneficiaireCreateInput => ({
  creeParMediateur: {
    connect: { id: mediateurId },
  },
  prenom: prenom ?? undefined,
  nom: nom ?? undefined,
  telephone: telephone ?? undefined,
  email: email ?? undefined,
  dateNaissance: dateNaissance ?? undefined,
  anneeNaissance: anneeNaissance ?? undefined,
  adresse: adresse ?? undefined,
  codeCommune: codeCommune ?? undefined,
  genre: genre ?? undefined,
  trancheAge: trancheAge ?? undefined,
  statutSocial: statutSocial ?? undefined,
  notes: notes ?? undefined,
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
          codeCommuneDomicile,
          date,
          duree,
          lieuAccompagnement,
          lieuActiviteId,
          materiel,
          notes,
          poursuiteAccompagnement,
          poursuiteAccompagnementStructureId,
          thematiques,
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

        // Same logic for structureAccompagnementId
        const existingStructurePoursuiteAccompagnement =
          await getExistingStructure({
            structureId: poursuiteAccompagnementStructureId,
          })

        const existingLieuActivite = await getExistingStructure({
          structureId: lieuActiviteId,
        })
        // TODO enable constraint when form allow selection of lieu activite
        // if  (!existingLieuActivite) {
        //   throw invalidError('Lieu activité not found')
        // }

        const data = {
          autonomie,
          date: new Date(date),
          creeParMediateur: {
            connect: { id: mediateurId },
          },
          beneficiaire: existingBeneficiaire
            ? // TODO need to update beneficiaire directly ?
              { connect: { id: existingBeneficiaire.id } }
            : {
                create: {
                  id: v4(),
                  ...beneficiaireUpdateInputFromForm(beneficiaire),
                },
              },
          duree: Number.parseInt(duree, 10),
          lieuAccompagnement,
          materiel,
          codeCommuneDomicile,
          notes,
          poursuiteAccompagnement,
          thematiques,
          lieuActivite: existingLieuActivite
            ? { connect: { id: existingLieuActivite.id } }
            : undefined,
          poursuiteAccompagnementStructure:
            existingStructurePoursuiteAccompagnement
              ? { connect: { id: existingStructurePoursuiteAccompagnement.id } }
              : undefined,
        } satisfies Prisma.CraIndividuelUpdateInput

        if (id) {
          const updated = await prismaClient.craIndividuel.update({
            where: { id },
            data,
          })

          return updated
        }

        const created = await prismaClient.craIndividuel.create({
          data: {
            id: v4(),
            ...data,
          },
        })

        return created
      },
    ),
})
