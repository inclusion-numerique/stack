import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { enforceIsMediateur } from '@app/web/server/rpc/enforceIsMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import {
  BeneficiaireData,
  BeneficiaireValidation,
} from '@app/web/beneficiaire/BeneficiaireValidation'
import { searchBeneficiaire } from '@app/web/beneficiaire/searchBeneficiaire'

const checkExistingBeneficiaire = async ({
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
      suppression: null,
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

const beneficiaireCreateInputFromForm = ({
  mediateurId,
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
}: BeneficiaireData): Prisma.BeneficiaireCreateInput => ({
  mediateur: {
    connect: { id: mediateurId },
  },
  prenom,
  nom,
  telephone: telephone ?? undefined,
  email: email ?? undefined,
  anneeNaissance: anneeNaissance ?? undefined,
  adresse: adresse ?? undefined,
  genre: genre ?? undefined,
  trancheAge: trancheAge ?? undefined,
  statutSocial: statutSocial ?? undefined,
  notes: notes ?? undefined,
  commune: communeResidence?.nom ?? undefined,
  communeCodePostal: communeResidence?.codePostal ?? undefined,
  communeCodeInsee: communeResidence?.codeInsee ?? undefined,
})

export const beneficiairesRouter = router({
  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input: { query }, ctx: { user } }) => {
      if (!user.mediateur && user.role !== 'Admin') {
        throw forbiddenError('User is not a mediateur')
      }
      return searchBeneficiaire({
        mediateurId: user.mediateur?.id,
        searchParams: {
          recherche: query,
        },
      })
    }),
  createOrUpdate: protectedProcedure
    .input(BeneficiaireValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      enforceIsMediateur(user)

      const { id, mediateurId } = input

      // Enforce user can create CRA for given mediateurId (for now only self)
      if (mediateurId !== user.mediateur.id) {
        throw forbiddenError('Cannot beneficiary for another mediateur')
      }

      await checkExistingBeneficiaire({
        beneficiaireId: id,
        mediateurId,
      })

      const data = beneficiaireCreateInputFromForm(input)

      if (id) {
        const updated = await prismaClient.beneficiaire.update({
          where: { id },
          data,
        })

        return updated
      }

      const newId = v4()
      const created = await prismaClient.beneficiaire.create({
        data: {
          ...data,
          id: newId,
          mediateur: {
            connect: { id: mediateurId },
          },
        },
      })

      return created
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { user } }) => {
      enforceIsMediateur(user)

      const { id } = input

      const beneficiaire = await checkExistingBeneficiaire({
        beneficiaireId: id,
        mediateurId: user.mediateur.id,
      })

      if (!beneficiaire) {
        throw invalidError('Beneficiaire not found')
      }

      /**
       * Cas spécifique si je supprime un bénéficiaire qui est lié à des activités :
       *
       * - Bénéficiaire dans un atelier collectif → retiré des beneficiaires suivis et ajouté en compteur benef anonymes
       * - Beneficiaire dans un accompagnement individuel / demarche → retiré du bénéficiaire sélectionné, et on affiche la partie beneficiaire anonyme
       *   -- Cela fonctionne car un beneficiaire est toujours associé, il sera "anonyme" a partir du moment ou prenom et nom sont null
       */

      const { genre, trancheAge, statutSocial } = beneficiaire

      const incrementParticipantsAnonymesData = {
        total: {
          increment: 1,
        },
        [genre ? `genre${genre}` : 'genreNonCommunique']: {
          increment: 1,
        },
        [trancheAge ? `trancheAge${trancheAge}` : 'trancheAgeNonCommunique']: {
          increment: 1,
        },
        [statutSocial
          ? `statutSocial${statutSocial}`
          : 'statutSocialNonCommunique']: {
          increment: 1,
        },
      } satisfies Prisma.ParticipantsAnonymesCraCollectifUncheckedUpdateManyInput

      await prismaClient.$transaction([
        prismaClient.participantAtelierCollectif.deleteMany({
          where: {
            beneficiaireId: id,
          },
        }),
        prismaClient.participantsAnonymesCraCollectif.updateMany({
          where: {
            craCollectif: {
              participants: {
                some: {
                  beneficiaireId: id,
                },
              },
            },
          },
          data: incrementParticipantsAnonymesData,
        }),
        prismaClient.beneficiaire.update({
          where: { id },
          data: {
            anonyme: true,
            suppression: new Date(),
            modification: new Date(),
            // Anonymize the beneficiaire but keep anonymous data for stats
            prenom: null,
            nom: null,
            telephone: null,
            email: null,
            notes: null,
            adresse: null,
            pasDeTelephone: null,
          },
        }),
      ])
    }),
})
