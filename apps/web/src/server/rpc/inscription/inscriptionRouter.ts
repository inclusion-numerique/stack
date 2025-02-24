import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { importCoordinateurMediationDataFromV1 } from '@app/web/app/inscription/(steps)/identification/importCoordinateurMediationDataFromV1'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { SessionUser } from '@app/web/auth/sessionUser'
import { createBrevoContact } from '@app/web/external-apis/brevo/api'
import { toBrevoContact } from '@app/web/external-apis/brevo/contact'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import { isConseillerNumeriqueV1DataWithActiveMiseEnRelation } from '@app/web/external-apis/conseiller-numerique/isConseillerNumeriqueV1WithActiveMiseEnRelation'
import { ChoisirProfilEtAccepterCguValidation } from '@app/web/inscription/ChoisirProfilEtAccepterCguValidation'
import { LieuxActiviteValidation } from '@app/web/inscription/LieuxActivite'
import { RenseignerStructureEmployeuseValidation } from '@app/web/inscription/RenseignerStructureEmployeuse'
import { StructureEmployeuseLieuActiviteValidation } from '@app/web/inscription/StructureEmployeuseLieuActivite'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { getOrCreateStructureEmployeuse } from '@app/web/server/rpc/inscription/getOrCreateStructureEmployeuse'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import { toStructureFromCartoStructure } from '@app/web/structure/toStructureFromCartoStructure'
import { addMutationLog } from '@app/web/utils/addMutationLog'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { ProfilInscription } from '@prisma/client'
import { v4 } from 'uuid'
import z from 'zod'

const inscriptionGuard = (
  targetUserId: string,
  grantee: Pick<SessionUser, 'role' | 'id'>,
) => {
  if (grantee.role !== 'Admin' && grantee.id !== targetUserId) {
    throw forbiddenError()
  }
}

const onlyLieuxActiviteToCreate =
  (existingActiviteIds: Set<string>) =>
  ({
    id,
    structureCartographieNationaleId,
  }: {
    id?: string | null
    structureCartographieNationaleId?: string | null
  }) =>
    (id != null && !existingActiviteIds.has(id)) ||
    (id == null && structureCartographieNationaleId != null)

const toStructureId = ({ structure }: { structure: { id: string } }) =>
  structure.id

const existingActiviteFor = (userId: string) => ({
  where: {
    mediateur: { userId },
    suppression: null,
  },
  select: {
    id: true,
    structure: {
      select: {
        id: true,
        structureCartographieNationaleId: true,
      },
    },
  },
})

const isMediateur = (
  user: { email: string; mediateur: { id: string } | null } | null,
): user is { email: string; mediateur: { id: string } } =>
  user?.mediateur?.id != null

export const inscriptionRouter = router({
  choisirProfilEtAccepterCgu: protectedProcedure
    .input(ChoisirProfilEtAccepterCguValidation)
    .mutation(
      async ({ input: { userId, profil }, ctx: { user: sessionUser } }) => {
        inscriptionGuard(userId, sessionUser)

        return prismaClient.user.update({
          where: { id: userId },
          data: {
            profilInscription: profil,
            acceptationCgu: new Date(),
            mediateur:
              sessionUser.mediateur ||
              profil === ProfilInscription.Coordinateur ||
              profil === ProfilInscription.CoordinateurConseillerNumerique
                ? undefined
                : { create: { id: v4() } },
            coordinateur:
              sessionUser.coordinateur ||
              profil === ProfilInscription.ConseillerNumerique ||
              profil === ProfilInscription.Mediateur ||
              profil === ProfilInscription.CoordinateurConseillerNumerique
                ? undefined
                : { create: { id: v4() } },
          },
          select: sessionUserSelect,
        })
      },
    ),
  renseignerStructureEmployeuse: protectedProcedure
    .input(RenseignerStructureEmployeuseValidation)
    .mutation(
      async ({
        input: { structureEmployeuse, userId },
        ctx: { user: sessionUser },
      }) => {
        inscriptionGuard(userId, sessionUser)

        const stopwatch = createStopwatch()
        const structure = await getOrCreateStructureEmployeuse(
          structureEmployeuse,
          sessionUser,
        )

        const transactionResult = await prismaClient.$transaction(
          async (transaction) => {
            // Remove link between user and structureEmployeuse if it already exists
            await transaction.employeStructure.updateMany({
              where: {
                userId,
                structure: {
                  id: { not: structure.id },
                },
                suppression: null,
              },
              data: {
                suppression: new Date(),
              },
            })

            return transaction.user.update({
              where: {
                id: userId,
              },
              data: {
                structureEmployeuseRenseignee: new Date(),
                emplois: {
                  create: {
                    id: v4(),
                    structureId: structure.id,
                  },
                },
              },
              select: {
                id: true,
                structureEmployeuseRenseignee: true,
                emplois: true,
              },
            })
          },
        )

        addMutationLog({
          userId,
          nom: 'CreerEmployeStructure',
          duration: stopwatch.stop().duration,
          data: {
            userId,
            emplois: transactionResult.emplois.at(0),
          },
        })

        return transactionResult
      },
    ),
  ajouterStructureEmployeuseEnLieuActivite: protectedProcedure
    .input(StructureEmployeuseLieuActiviteValidation)
    .mutation(
      async ({
        input: { userId, estLieuActivite, structureEmployeuseId },
        ctx: { user: sessionUser },
      }) => {
        inscriptionGuard(userId, sessionUser)

        if (estLieuActivite) {
          // Add a lieu d'activité for the structure if not exists
          const existing = await prismaClient.mediateurEnActivite.findFirst({
            where: {
              mediateur: {
                userId,
              },
              structureId: structureEmployeuseId,
              suppression: null,
            },
            select: {
              id: true,
            },
          })

          if (existing) {
            return existing
          }

          addMutationLog({
            userId,
            nom: 'CreerMediateurEnActivite',
            duration: 0,
            data: {
              userId,
              structureId: structureEmployeuseId,
            },
          })

          return prismaClient.mediateurEnActivite.create({
            data: {
              id: v4(),
              mediateur: {
                connect: {
                  userId,
                },
              },
              structure: {
                connect: {
                  id: structureEmployeuseId,
                },
              },
            },
            select: {
              id: true,
            },
          })
        }

        addMutationLog({
          userId,
          nom: 'SupprimerMediateurEnActivite',
          duration: 0,
          data: {
            userId,
            structureId: structureEmployeuseId,
          },
        })

        // Remove the link between the user and the structure if it exists
        await prismaClient.mediateurEnActivite.updateMany({
          where: {
            mediateur: {
              userId,
            },
            structureId: structureEmployeuseId,
            suppression: null,
          },
          data: {
            suppression: new Date(),
          },
        })

        return null
      },
    ),
  renseignerLieuxActivite: protectedProcedure
    .input(LieuxActiviteValidation)
    .mutation(
      async ({
        input: { userId, lieuxActivite },
        ctx: { user: sessionUser },
      }) => {
        inscriptionGuard(userId, sessionUser)

        const existingActivite =
          await prismaClient.mediateurEnActivite.findMany(
            existingActiviteFor(userId),
          )

        const lieuxActiviteCartoIds = new Set<string>(
          lieuxActivite
            .map(
              ({ structureCartographieNationaleId }) =>
                structureCartographieNationaleId,
            )
            .filter(onlyDefinedAndNotNull),
        )

        const lieuxActiviteIds = new Set<string>(
          lieuxActivite.map(({ id }) => id).filter(onlyDefinedAndNotNull),
        )

        // Delete all existing activite that are not in the new list of carto ids
        // AND that is not in the new list of internal ids
        // For now if removed and readed, it will be deleted here and recreated after
        const toDelete = existingActivite.filter(
          ({ structure: existing }) =>
            // e.g. if the structure was removed, re-added and has the same carto id
            (existing.structureCartographieNationaleId &&
              !lieuxActiviteCartoIds.has(
                existing.structureCartographieNationaleId,
              )) ||
            // If the structure already has an internal id and did not come from carto nationale
            (!existing.structureCartographieNationaleId &&
              !lieuxActiviteIds.has(existing.id)),
        )

        const existingStructuresForCartoIds =
          await prismaClient.structure.findMany({
            where: {
              structureCartographieNationaleId: {
                in: [...lieuxActiviteCartoIds.values()],
              },
            },
          })

        const existingStructuresByCartoId = new Map(
          existingStructuresForCartoIds.map((s) => [
            s.structureCartographieNationaleId as string,
            s,
          ]),
        )

        return prismaClient.$transaction(async (transaction) => {
          const deleted = await transaction.mediateurEnActivite.updateMany({
            where: {
              id: { in: toDelete.map(({ id }) => id) },
            },
            data: {
              suppression: new Date(),
            },
          })

          const existingActiviteStructuresIds = new Set(
            existingActivite.map(toStructureId),
          )

          const newActivites = await Promise.all(
            lieuxActivite
              .filter(onlyLieuxActiviteToCreate(existingActiviteStructuresIds))
              .map(async (lieu) => {
                if (!lieu.structureCartographieNationaleId) {
                  // This is not an exisint carto structure, we just create the lieu

                  if (!lieu.id) {
                    throw new Error('Invalid structure for lieu activité')
                  }

                  return transaction.mediateurEnActivite.create({
                    data: {
                      id: v4(),
                      mediateur: {
                        connect: {
                          userId,
                        },
                      },
                      structure: {
                        connect: {
                          id: lieu.id,
                        },
                      },
                    },
                  })
                }

                const structure = existingStructuresByCartoId.get(
                  lieu.structureCartographieNationaleId,
                )

                if (structure) {
                  const existingStructure =
                    await transaction.structure.findFirst({
                      where: {
                        structureCartographieNationaleId:
                          lieu.structureCartographieNationaleId,
                      },
                    })

                  if (!existingStructure) {
                    throw new Error('Structure not found')
                  }

                  // Structure already exists, we just create the lieu, linking with carto id
                  return transaction.mediateurEnActivite.create({
                    data: {
                      id: v4(),
                      mediateur: {
                        connect: {
                          userId,
                        },
                      },
                      structure: {
                        connect: {
                          id: existingStructure.id,
                        },
                      },
                    },
                  })
                }

                // Structure does not exist, we create it with the lieu
                const cartoStructure =
                  await transaction.structureCartographieNationale.findFirst({
                    where: {
                      id: lieu.structureCartographieNationaleId,
                    },
                  })

                if (!cartoStructure) {
                  throw new Error('Structure carto not found')
                }

                return transaction.mediateurEnActivite.create({
                  data: {
                    id: v4(),
                    mediateur: {
                      connect: {
                        userId,
                      },
                    },
                    structure: {
                      create: toStructureFromCartoStructure(cartoStructure),
                    },
                  },
                })
              }),
          )

          return { deleted, newActivites }
        })
      },
    ),
  ajouterLieuxActivite: protectedProcedure
    .input(LieuxActiviteValidation)
    .mutation(
      async ({
        input: { userId, lieuxActivite },
        ctx: { user: sessionUser },
      }) => {
        inscriptionGuard(userId, sessionUser)

        const existingActivite =
          await prismaClient.mediateurEnActivite.findMany(
            existingActiviteFor(userId),
          )

        const lieuxActiviteCartoIds = new Set<string>(
          lieuxActivite
            .map(
              ({ structureCartographieNationaleId }) =>
                structureCartographieNationaleId,
            )
            .filter(onlyDefinedAndNotNull),
        )

        const existingStructuresForCartoIds =
          await prismaClient.structure.findMany({
            where: {
              structureCartographieNationaleId: {
                in: [...lieuxActiviteCartoIds.values()],
              },
            },
          })

        const existingStructuresByCartoId = new Map(
          existingStructuresForCartoIds.map((s) => [
            s.structureCartographieNationaleId as string,
            s,
          ]),
        )

        return prismaClient.$transaction(async (transaction) => {
          const existingActiviteStructuresIds = new Set(
            existingActivite.map(toStructureId),
          )

          const newActivites = await Promise.all(
            lieuxActivite
              .filter(onlyLieuxActiviteToCreate(existingActiviteStructuresIds))
              .map(async (lieu) => {
                if (!lieu.structureCartographieNationaleId) {
                  // This is not an exisint carto structure, we just create the lieu

                  if (!lieu.id) {
                    throw new Error('Invalid structure for lieu activité')
                  }

                  return transaction.mediateurEnActivite.create({
                    data: {
                      id: v4(),
                      mediateur: {
                        connect: {
                          userId,
                        },
                      },
                      structure: {
                        connect: {
                          id: lieu.id,
                        },
                      },
                    },
                  })
                }

                const structure = existingStructuresByCartoId.get(
                  lieu.structureCartographieNationaleId,
                )

                if (structure) {
                  const existingStructure =
                    await transaction.structure.findFirst({
                      where: {
                        structureCartographieNationaleId:
                          lieu.structureCartographieNationaleId,
                      },
                    })

                  if (!existingStructure) {
                    throw new Error('Structure not found')
                  }

                  // Structure already exists, we just create the lieu, linking with carto id

                  return transaction.mediateurEnActivite.create({
                    data: {
                      id: v4(),
                      mediateur: {
                        connect: {
                          userId,
                        },
                      },
                      structure: {
                        connect: {
                          id: existingStructure.id,
                        },
                      },
                    },
                  })
                }

                // Structure does not exist, we create it with the lieu
                const cartoStructure =
                  await transaction.structureCartographieNationale.findFirst({
                    where: {
                      id: lieu.structureCartographieNationaleId,
                    },
                  })

                if (!cartoStructure) {
                  throw new Error('Structure carto not found')
                }

                const createdStructure = await transaction.structure.create({
                  data: toStructureFromCartoStructure(cartoStructure),
                })

                return transaction.mediateurEnActivite.create({
                  data: {
                    id: v4(),
                    mediateur: {
                      connect: {
                        userId,
                      },
                    },
                    structure: {
                      connect: {
                        id: createdStructure.id,
                      },
                    },
                  },
                })
              }),
          )

          return { newActivites }
        })
      },
    ),
  validerInscription: protectedProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ input: { userId }, ctx: { user: sessionUser } }) => {
      inscriptionGuard(userId, sessionUser)

      const stopwatch = createStopwatch()

      await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          inscriptionValidee: new Date(),
        },
      })

      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          coordinateur: true,
          mediateur: { select: { id: true, conseillerNumerique: true } },
        },
      })

      if (user != null && PublicWebAppConfig.isMain) {
        await createBrevoContact(ServerWebAppConfig.Brevo.usersListId)(
          toBrevoContact(user),
        )
      }

      if (!isMediateur(user)) return

      const invitations = await prismaClient.invitationEquipe.findMany({
        where: {
          email: user.email,
          acceptee: { not: null },
        },
      })

      await prismaClient.mediateurCoordonne.createMany({
        data: invitations.map((invitation) => ({
          coordinateurId: invitation.coordinateurId,
          mediateurId: user.mediateur.id,
        })),
      })

      addMutationLog({
        userId,
        nom: 'ValiderInscription',
        duration: stopwatch.stop().duration,
        data: {
          id: userId,
        },
      })
    }),
  addMediationNumeriqueToCoordinateur: protectedProcedure.mutation(
    async ({ ctx: { user: sessionUser } }) => {
      inscriptionGuard(sessionUser.id, sessionUser)

      if (!sessionUser.coordinateur) {
        throw forbiddenError()
      }

      const stopwatch = createStopwatch()

      const upsertedMediateur = await prismaClient.mediateur.upsert({
        where: { userId: sessionUser.id },
        create: { userId: sessionUser.id },
        update: {},
      })

      if (sessionUser.inscriptionValidee != null && PublicWebAppConfig.isMain) {
        await createBrevoContact(ServerWebAppConfig.Brevo.usersListId)(
          toBrevoContact({
            ...sessionUser,
            mediateur: { ...upsertedMediateur, conseillerNumerique: null },
          }),
        )
      }

      if (sessionUser.coordinateur.conseillerNumeriqueId != null) {
        const v1Conseiller = await fetchConseillerNumeriqueV1Data({
          v1ConseillerId: sessionUser.coordinateur.conseillerNumeriqueId,
        })

        if (
          v1Conseiller &&
          isConseillerNumeriqueV1DataWithActiveMiseEnRelation(v1Conseiller)
        ) {
          await importCoordinateurMediationDataFromV1({
            user: sessionUser,
            upsertedMediateur,
            v1Conseiller,
          })
        }
      }

      addMutationLog({
        userId: sessionUser.id,
        nom: 'CreerMediateur',
        duration: stopwatch.stop().duration,
        data: {
          coordinateurId: sessionUser.coordinateur.id,
        },
      })
    },
  ),
  removeMediationNumeriqueFromCoordinateur: protectedProcedure.mutation(
    async ({ ctx: { user: sessionUser } }) => {
      inscriptionGuard(sessionUser.id, sessionUser)

      if (!sessionUser.coordinateur) {
        throw forbiddenError()
      }

      const stopwatch = createStopwatch()

      const mediateur = await prismaClient.mediateur.findUnique({
        where: { userId: sessionUser.id },
      })

      if (!mediateur) return

      await prismaClient.mediateurEnActivite.deleteMany({
        where: { mediateurId: mediateur.id },
      })

      await prismaClient.conseillerNumerique.deleteMany({
        where: { mediateurId: mediateur.id },
      })

      await prismaClient.mediateur.delete({
        where: { id: mediateur.id },
      })

      addMutationLog({
        userId: sessionUser.id,
        nom: 'SupprimerMediateur',
        duration: stopwatch.stop().duration,
        data: {
          coordinateurId: sessionUser.coordinateur.id,
        },
      })
    },
  ),
})
