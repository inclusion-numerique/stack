import { v4 } from 'uuid'
import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { RenseignerStructureEmployeuseValidation } from '@app/web/inscription/RenseignerStructureEmployeuse'
import { SessionUser } from '@app/web/auth/sessionUser'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import { StructureEmployeuseLieuActiviteValidation } from '@app/web/inscription/StructureEmployeuseLieuActivite'
import { LieuxActiviteValidation } from '@app/web/inscription/LieuxActivite'

const inscriptionGuard = (
  targetUserId: string,
  grantee: Pick<SessionUser, 'role' | 'id'>,
) => {
  if (grantee.role !== 'Admin' && grantee.id !== targetUserId) {
    throw forbiddenError()
  }
}

export const inscriptionRouter = router({
  renseignerStructureEmployeuse: protectedProcedure
    .input(RenseignerStructureEmployeuseValidation)
    .mutation(
      async ({
        input: { profil, structureEmployeuse, userId },
        ctx: { user: sessionUser },
      }) => {
        inscriptionGuard(userId, sessionUser)

        // TODO Find existing Structure based on SIRET, if not found, create a new one
        // TODO Remove link between user and structureEmployeuse if it already exists and is different SIRET
        // TODO Link user to structureEmployeuse

        const transactionResult = await prismaClient.$transaction(
          async (transaction) => {
            const existingStructure = await transaction.structure.findFirst({
              where: {
                siretOuRna: structureEmployeuse.siret,
                codeInsee: structureEmployeuse.codeInsee,
                nom: {
                  equals: structureEmployeuse.nom,
                  mode: 'insensitive',
                },
              },
            })

            const structure =
              existingStructure ??
              (await transaction.structure.create({
                data: {
                  id: v4(),
                  siretOuRna: structureEmployeuse.siret,
                  codeInsee: structureEmployeuse.codeInsee,
                  nom: structureEmployeuse.nom,
                  adresse: structureEmployeuse.adresse,
                  commune: structureEmployeuse.commune,
                  // TODO Use table for codePostal
                  // TODO Use api adresse here before transaction
                  codePostal: structureEmployeuse.codeInsee,
                },
              }))

            // Remove link between user and structureEmployeuse if it already exists and is different SIRET
            await transaction.employeStructure.deleteMany({
              where: {
                userId,
                structure: {
                  id: { not: structure.id },
                },
              },
            })

            const updatedUser = await transaction.user.update({
              where: {
                id: userId,
              },
              data: {
                structureEmployeuseRenseignee: new Date(),
                profilInscription: profil,
                emplois: {
                  create: {
                    id: v4(),
                    structureId: structure.id,
                  },
                },
                mediateur: sessionUser.mediateur
                  ? undefined
                  : {
                      create: {
                        // TODO Conum
                        id: v4(),
                      },
                    },
              },
              select: {
                id: true,
                structureEmployeuseRenseignee: true,
                emplois: true,
              },
            })

            return updatedUser
          },
        )

        return transactionResult
      },
    ),
  ajouterStructureEmployeuseEnLieuActivite: protectedProcedure
    .input(StructureEmployeuseLieuActiviteValidation)
    .mutation(
      ({
        input: { userId, estLieuActivite, structureEmployeuseId },
        ctx: { user: sessionUser },
      }) => {
        inscriptionGuard(userId, sessionUser)

        console.log('structure en lieu d’activité', {
          userId,
          estLieuActivite,
          structureEmployeuseId,
        })
        // TODO implement this
        console.log('SKIPPING this mutation logic for now')
      },
    ),
  renseignerLieuxActivite: protectedProcedure
    .input(LieuxActiviteValidation)
    .mutation(
      ({ input: { userId, lieuxActivite }, ctx: { user: sessionUser } }) => {
        inscriptionGuard(userId, sessionUser)

        console.log('lieux activité', {
          userId,
          lieuxActivite,
        })
        // TODO implement this
        console.log('SKIPPING this mutation logic for now')
      },
    ),
  validerInscription: protectedProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ input: { userId }, ctx: { user: sessionUser } }) => {
      inscriptionGuard(userId, sessionUser)

      await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          inscriptionValidee: new Date(),
        },
      })
    }),
})
