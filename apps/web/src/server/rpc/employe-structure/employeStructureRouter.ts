import { CreerEmployeStructureValidation } from '@app/web/app/employe-structure/CreerEmployeStructureValidation'
import { ModifierEmployeStructureValidation } from '@app/web/app/employe-structure/ModifierEmployeStructureValidation'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { enforceIsAdmin } from '@app/web/server/rpc/enforceIsAdmin'
import { getOrCreateStructureEmployeuse } from '@app/web/server/rpc/inscription/getOrCreateStructureEmployeuse'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { v4 } from 'uuid'
import { z } from 'zod'

export const employeStructureRouter = router({
  creer: protectedProcedure
    .input(CreerEmployeStructureValidation)
    .mutation(
      async ({
        input: {
          userId,
          structureEmployeuse,
          creation: creationString,
          suppression: suppressionString,
        },
        ctx: { user: sessionUser },
      }) => {
        enforceIsAdmin(sessionUser)

        const stopwatch = createStopwatch()

        const id = v4()

        const structure = await getOrCreateStructureEmployeuse(
          structureEmployeuse,
          sessionUser,
        )

        const creation = creationString ? new Date(creationString) : undefined
        const suppression = suppressionString
          ? new Date(suppressionString)
          : null

        const created = await prismaClient.employeStructure.create({
          data: {
            id,
            userId,
            structureId: structure.id,
            creation,
            suppression,
          },
        })

        await prismaClient.mutation.create({
          data: {
            nom: 'CreerEmployeStructure',
            userId: sessionUser.id,
            duration: stopwatch.stop().duration,
            data: {
              id,
              userId,
              structureId: structure.id,
              creation,
              suppression,
            },
          },
        })

        return created
      },
    ),
  modifier: protectedProcedure
    .input(ModifierEmployeStructureValidation)
    .mutation(
      async ({
        input: { id, creation: creationString, suppression: suppressionString },
        ctx: { user },
      }) => {
        enforceIsAdmin(user)

        const stopwatch = createStopwatch()

        const creation = creationString ? new Date(creationString) : undefined
        const suppression = suppressionString
          ? new Date(suppressionString)
          : null

        const updated = await prismaClient.employeStructure.update({
          where: {
            id,
          },
          data: {
            creation,
            suppression,
          },
        })

        await prismaClient.mutation.create({
          data: {
            nom: 'ModifierEmployeStructure',
            userId: user.id,
            duration: stopwatch.stop().duration,
            data: {
              id,
              creation,
              suppression,
            },
          },
        })

        return updated
      },
    ),
  supprimer: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      enforceIsAdmin(user)

      const stopwatch = createStopwatch()

      const deleted = await prismaClient.employeStructure.delete({
        where: {
          id,
        },
      })

      await prismaClient.mutation.create({
        data: {
          nom: 'SupprimerEmployeStructure',
          userId: user.id,
          duration: stopwatch.stop().duration,
          data: {
            id,
          },
        },
      })

      return deleted
    }),
})
