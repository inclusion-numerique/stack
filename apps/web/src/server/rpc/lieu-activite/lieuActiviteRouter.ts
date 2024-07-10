import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { lieuActiviteValidation } from './lieuActiviteValidation'

export const lieuActiviteRouter = router({
  delete: protectedProcedure
    .input(
      z.object({
        structureId: lieuActiviteValidation,
      }),
    )
    .mutation(async ({ input, ctx: { user } }) => {
      if (!user.mediateur) {
        throw forbiddenError("Cet utilisateur n'est pas un médiateur")
      }

      const lieuActivite = await prismaClient.mediateurEnActivite.findMany({
        where: {
          mediateurId: user.mediateur.id,
          structureId: input.structureId,
          suppression: null,
        },
      })

      if (!lieuActivite) {
        throw invalidError("Ce lieu d' activité n'existe pas")
      }

      const timestamp = new Date()
      return prismaClient.mediateurEnActivite.updateMany({
        where: {
          mediateurId: user.mediateur.id,
          structureId: input.structureId,
        },
        data: {
          suppression: timestamp,
          modification: timestamp,
        },
      })
    }),
})
