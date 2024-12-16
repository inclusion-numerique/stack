import z from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CraIndividuelValidation } from '@app/web/cra/CraIndividuelValidation'
import { enforceIsMediateur } from '@app/web/server/rpc/enforceIsMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { CraDemarcheAdministrativeValidation } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import { CraCollectifValidation } from '@app/web/cra/CraCollectifValidation'
import {
  createOrUpdateActivite,
  getBeneficiairesAnonymesWithOnlyAccompagnementsForThisActivite,
} from '@app/web/cra/createOrUpdateActivite'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { addMutationLog } from '@app/web/utils/addMutationLog'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'

export const craRouter = router({
  individuel: protectedProcedure
    .input(CraIndividuelValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      enforceIsMediateur(user)

      // Enforce user can create CRA for given mediateurId (for now only self)
      if (input.mediateurId !== user.mediateur.id) {
        throw forbiddenError('Cannot create CRA for another mediateur')
      }

      return createOrUpdateActivite({
        input: {
          type: 'Individuel',
          data: input,
        },
        userId: user.id,
      })
    }),
  demarcheAdministrative: protectedProcedure
    .input(CraDemarcheAdministrativeValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      enforceIsMediateur(user)

      // Enforce user can create CRA for given mediateurId (for now only self)
      if (input.mediateurId !== user.mediateur.id) {
        throw forbiddenError('Cannot create CRA for another mediateur')
      }

      return createOrUpdateActivite({
        input: {
          type: 'Demarche',
          data: input,
        },
        userId: user.id,
      })
    }),
  collectif: protectedProcedure
    .input(CraCollectifValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      enforceIsMediateur(user)

      // Enforce user can create CRA for given mediateurId (for now only self)
      if (input.mediateurId !== user.mediateur.id) {
        throw forbiddenError('Cannot create CRA for another mediateur')
      }

      return createOrUpdateActivite({
        input: {
          type: 'Collectif',
          data: input,
        },
        userId: user.id,
      })
    }),
  deleteActivite: protectedProcedure
    .input(
      z.object({
        activiteId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { activiteId }, ctx: { user } }) => {
      enforceIsMediateur(user)

      const stopwatch = createStopwatch()

      const activite = await prismaClient.activite.findUnique({
        where: { id: activiteId, suppression: null },
      })

      if (!activite) {
        throw invalidError('Cra not found')
      }

      if (activite.mediateurId !== user.mediateur.id) {
        throw forbiddenError('Cannot delete CRA for another mediateur')
      }

      const beneficiairesAnonymesIdsToDelete =
        await getBeneficiairesAnonymesWithOnlyAccompagnementsForThisActivite({
          activiteId,
        })

      await prismaClient.$transaction(
        [
          // Delete accompagnements
          prismaClient.accompagnement.deleteMany({
            where: {
              activiteId,
            },
          }),
          // Delete beneficiaires anonymes liés uniquement à cette activité
          beneficiairesAnonymesIdsToDelete.length > 0
            ? prismaClient.beneficiaire.deleteMany({
                where: {
                  anonyme: true,
                  id: {
                    in: beneficiairesAnonymesIdsToDelete,
                  },
                },
              })
            : null,
          // Delete activité
          prismaClient.activite.delete({
            where: { id: activiteId },
          }),
        ].filter(onlyDefinedAndNotNull),
      )

      addMutationLog({
        userId: user.id,
        nom: 'SupprimerActivite',
        duration: stopwatch.stop().duration,
        data: {
          type: activite.type,
          id: activiteId,
        },
      })

      return true
    }),
})
