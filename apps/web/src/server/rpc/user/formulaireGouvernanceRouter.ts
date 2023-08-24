import * as Sentry from '@sentry/nextjs'
import { v4 } from 'uuid'
import type { Prisma, UserRole } from '@prisma/client'
import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { sendGouvernanceWelcomeEmail } from '@app/web/gouvernance/sendGouvernanceWelcomeEmail'
import {
  canUpdateFormulaireGouvernance,
  hasAccessToGouvernanceFormDevelopmentPreview,
} from '@app/web/security/securityRules'
import { forbiddenError, notFoundError } from '@app/web/server/rpc/trpcErrors'
import { ParticiperValidation } from '@app/web/gouvernance/Participer'
import { ChoixDuFormulaireValidation } from '@app/web/gouvernance/ChoixDuFormulaire'
import { getFormulaireGouvernanceForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import {
  getEtapeFormulaire,
  getInfoEtapeFormulaire,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import { PorterOuParticiperValidation } from '@app/web/gouvernance/PorterOuParticiper'
import { AnnulerValidation } from '@app/web/gouvernance/Annuler'
import { participerPersistenceFromData } from '@app/web/gouvernance/participerHelpers.server'
import { InformationsParticipantValidation } from '@app/web/gouvernance/InformationsParticipant'
import { informationsParticipantsPersistenceFromData } from '@app/web/gouvernance/informationsParticipantHelpers.server'
import { PerimetreFeuilleDeRouteValidation } from '@app/web/gouvernance/PerimetreFeuilleDeRoute'

const FormulaireGouvernanceIdValidation = z.object({
  formulaireGouvernanceId: z.string().uuid().nonempty(),
})

const getUpdatedFormulaireState = async ({
  formulaireGouvernance,
  user,
}: {
  formulaireGouvernance: { id: string }
  user: { id: string; role: UserRole; gouvernancePersona: string | null }
}) => {
  const updatedFormulaireGouvernance =
    await prismaClient.formulaireGouvernance.findUnique({
      where: {
        id: formulaireGouvernance.id,
      },
      select: {
        id: true,
        gouvernancePersona: true,
        intention: true,
        etapeContacts: true,
        etapeStructures: true,
        etapeInformationsParticipant: true,
        etapePerimetre: true,
        confirmeEtEnvoye: true,
      },
    })

  if (!updatedFormulaireGouvernance) {
    throw new Error('Formulaire not found')
  }

  const developmentPreview = hasAccessToGouvernanceFormDevelopmentPreview(user)
  const etapeCourante = getEtapeFormulaire({
    formulaireGouvernance: updatedFormulaireGouvernance,
    developmentPreview,
    user,
  })
  const etapeInfo = getInfoEtapeFormulaire({
    formulaireGouvernance: updatedFormulaireGouvernance,
    developmentPreview,
    user,
  })

  return { updatedFormulaireGouvernance, etapeCourante, etapeInfo }
}

export const formulaireGouvernanceRouter = router({
  // Une mutation par étape du formulaire (cf etapeFormuliareGouvernance)
  choixDuFormulaire: protectedProcedure
    .input(ChoixDuFormulaireValidation)
    .mutation(async ({ input: { gouvernancePersonaId }, ctx: { user } }) => {
      const formulaireGouvernanceId = v4()

      // Ensure no-op on same persona chosen
      const existingFormulaire = await getFormulaireGouvernanceForForm({
        userId: user.id,
      })

      if (existingFormulaire) {
        await prismaClient.formulaireGouvernance.update({
          where: { id: existingFormulaire.id },
          data: {
            annulation: new Date(),
          },
        })
      }

      if (existingFormulaire?.gouvernancePersona === gouvernancePersonaId) {
        if (gouvernancePersonaId !== user.gouvernancePersona) {
          // Only update user if needed, not the formulaire
          await prismaClient.user.update({
            where: { id: user.id },
            data: {
              gouvernancePersona: gouvernancePersonaId,
            },
            select: sessionUserSelect,
          })
        }

        // Reuse the existing formulaire for same persona
        return getUpdatedFormulaireState({
          formulaireGouvernance: existingFormulaire,
          user,
        })
      }
      const updatedUser = await prismaClient.user.update({
        where: { id: user.id },
        data: {
          gouvernancePersona: gouvernancePersonaId,
          formulaireGouvernance: {
            create: {
              id: formulaireGouvernanceId,
              gouvernancePersona: gouvernancePersonaId,
              createurId: user.id,
              demonstration: ['Administrator', 'Demo'].includes(user.role),
            },
          },
        },
        select: sessionUserSelect,
      })

      if (user.gouvernancePersona === gouvernancePersonaId) {
        // Do not send same email to user
        return getUpdatedFormulaireState({
          formulaireGouvernance: { id: formulaireGouvernanceId },
          user,
        })
      }

      // Send welcome email with new persona
      sendGouvernanceWelcomeEmail({
        user: {
          ...updatedUser,
          gouvernancePersona: gouvernancePersonaId,
        },
      }).catch((error) => {
        Sentry.captureException(error)
      })

      return getUpdatedFormulaireState({
        formulaireGouvernance: { id: formulaireGouvernanceId },
        user,
      })
    }),
  porterOuParticiper: protectedProcedure
    .input(PorterOuParticiperValidation)
    .mutation(
      async ({
        input: { intention, formulaireGouvernanceId },
        ctx: { user },
      }) => {
        if (!canUpdateFormulaireGouvernance(user, formulaireGouvernanceId)) {
          throw forbiddenError()
        }

        const updatedFormulaireGouvernance =
          await prismaClient.formulaireGouvernance.update({
            where: { id: formulaireGouvernanceId },
            data: {
              intention,
            },
            select: {
              id: true,
            },
          })

        return getUpdatedFormulaireState({
          formulaireGouvernance: updatedFormulaireGouvernance,
          user,
        })
      },
    ),
  participer: protectedProcedure
    .input(ParticiperValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      if (
        !canUpdateFormulaireGouvernance(user, input.formulaireGouvernanceId)
      ) {
        throw forbiddenError()
      }

      const formulaireGouvernance = await getFormulaireGouvernanceForForm({
        formulaireGouvernanceId: input.formulaireGouvernanceId,
      })
      if (!formulaireGouvernance) {
        throw notFoundError()
      }

      const data = participerPersistenceFromData(input, formulaireGouvernance)
      const formulaireGouvernanceId = formulaireGouvernance.id

      // Remove participants contact for cleaning up data (safety as the state of the form is out of this function scope)
      const deleteOperations: Prisma.PrismaPromise<unknown>[] = []
      if (
        formulaireGouvernance.structuresParticipantes.some(
          (participant) => participant.contactId,
        )
      ) {
        deleteOperations.push(
          prismaClient.contactFormulaireGouvernance.deleteMany({
            where: {
              AND: [
                {
                  formulaireGouvernanceId,
                },
                {
                  contactStructureParticipante: {
                    isNot: null,
                  },
                },
              ],
            },
          }),
        )
      }
      if (
        formulaireGouvernance.communesParticipantes.some(
          (participant) => participant.contactId,
        )
      ) {
        deleteOperations.push(
          prismaClient.contactFormulaireGouvernance.deleteMany({
            where: {
              AND: [
                {
                  formulaireGouvernanceId,
                },
                {
                  contactCommuneParticipante: {
                    isNot: null,
                  },
                },
              ],
            },
          }),
        )
      }
      if (
        formulaireGouvernance.epcisParticipantes.some(
          (participant) => participant.contactId,
        )
      ) {
        deleteOperations.push(
          prismaClient.contactFormulaireGouvernance.deleteMany({
            where: {
              AND: [
                {
                  formulaireGouvernanceId,
                },
                {
                  contactEpciParticipant: {
                    isNot: null,
                  },
                },
              ],
            },
          }),
        )
      }
      if (
        formulaireGouvernance.departementsParticipants.some(
          (participant) => participant.contactId,
        )
      ) {
        deleteOperations.push(
          prismaClient.contactFormulaireGouvernance.deleteMany({
            where: {
              AND: [
                {
                  formulaireGouvernanceId,
                },
                {
                  contactDepartementParticipant: {
                    isNot: null,
                  },
                },
              ],
            },
          }),
        )
      }

      const result = await prismaClient.$transaction([
        ...deleteOperations,
        prismaClient.formulaireGouvernance.update({
          where: { id: input.formulaireGouvernanceId },
          data: {
            intention: 'Participer',
            confirmeEtEnvoye: new Date(),
            ...data,
          },
          select: {
            id: true,
          },
        }),
      ])

      return getUpdatedFormulaireState({
        formulaireGouvernance: result.at(-1) as { id: string },
        user,
      })
    }),
  informationsParticipant: protectedProcedure
    .input(InformationsParticipantValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      if (
        !canUpdateFormulaireGouvernance(user, input.formulaireGouvernanceId)
      ) {
        throw forbiddenError()
      }

      const formulaireGouvernance = await getFormulaireGouvernanceForForm({
        formulaireGouvernanceId: input.formulaireGouvernanceId,
      })
      if (!formulaireGouvernance) {
        throw notFoundError()
      }

      const data = informationsParticipantsPersistenceFromData(
        input,
        formulaireGouvernance,
      )

      const result = await prismaClient.formulaireGouvernance.update({
        where: { id: input.formulaireGouvernanceId },
        data: {
          ...data,
        },
        select: {
          id: true,
        },
      })

      return getUpdatedFormulaireState({
        formulaireGouvernance: result,
        user,
      })
    }),
  annuler: protectedProcedure
    .input(AnnulerValidation)
    .mutation(async ({ input: { formulaireGouvernanceId }, ctx: { user } }) => {
      if (!canUpdateFormulaireGouvernance(user, formulaireGouvernanceId)) {
        throw forbiddenError()
      }
      await prismaClient.$transaction([
        prismaClient.formulaireGouvernance.update({
          where: {
            id: formulaireGouvernanceId,
          },
          data: {
            annulation: new Date(),
          },
        }),
        prismaClient.user.updateMany({
          where: { formulaireGouvernanceId },
          data: {
            formulaireGouvernanceId: null,
          },
        }),
      ])
    }),
  perimetreFeuilleDeRoute: protectedProcedure
    .input(PerimetreFeuilleDeRouteValidation)
    .mutation(
      async ({
        input: { formulaireGouvernanceId, add, remove },
        ctx: { user },
      }) => {
        if (!canUpdateFormulaireGouvernance(user, formulaireGouvernanceId)) {
          throw forbiddenError()
        }

        await prismaClient.$transaction(async (transaction) => {
          const existingParticipants =
            await transaction.formulaireGouvernance.findFirstOrThrow({
              where: {
                id: formulaireGouvernanceId,
              },
              select: {
                epcisParticipantes: {
                  select: {
                    epciCode: true,
                    horsTerritoire: true,
                  },
                },
                communesParticipantes: {
                  select: {
                    communeCode: true,
                    horsTerritoire: true,
                  },
                },
                departementsParticipants: {
                  select: {
                    departementCode: true,
                    horsTerritoire: true,
                  },
                },
              },
            })
          const existingParticipantsCodes = new Set([
            ...existingParticipants.departementsParticipants.map(
              ({ departementCode }) => departementCode,
            ),
            ...existingParticipants.epcisParticipantes.map(
              ({ epciCode }) => epciCode,
            ),
            ...existingParticipants.communesParticipantes.map(
              ({ communeCode }) => communeCode,
            ),
          ])

          const epcisToAdd = add
            .filter(({ type }) => type === 'epci')
            .filter(({ code }) => !existingParticipantsCodes.has(code))
          const epcisToRemove = remove
            .filter(({ type }) => type === 'epci')
            .filter(({ code }) => existingParticipantsCodes.has(code))
            .map(({ code }) => code)

          const departementsToAdd = add
            .filter(({ type }) => type === 'departement')
            .filter(({ code }) => !existingParticipantsCodes.has(code))

          const departementsToRemove = remove
            .filter(({ type }) => type === 'departement')
            .filter(({ code }) => existingParticipantsCodes.has(code))

            .map(({ code }) => code)

          const communesToAdd = add
            .filter(({ type }) => type === 'commune')
            .filter(({ code }) => !existingParticipantsCodes.has(code))

          const communesToRemove = remove
            .filter(({ type }) => type === 'commune')
            .filter(({ code }) => existingParticipantsCodes.has(code))

            .map(({ code }) => code)

          if (epcisToRemove.length > 0) {
            await transaction.epciParticipantFormulaireGouvernance.deleteMany({
              where: {
                formulaireGouvernanceId,
                epciCode: {
                  in: epcisToRemove,
                },
              },
            })
          }
          if (communesToRemove.length > 0) {
            await transaction.communeParticipanteFormulaireGouvernance.deleteMany(
              {
                where: {
                  formulaireGouvernanceId,
                  communeCode: {
                    in: communesToRemove,
                  },
                },
              },
            )
          }
          if (departementsToRemove.length > 0) {
            await transaction.departementParticipantFormulaireGouvernance.deleteMany(
              {
                where: {
                  formulaireGouvernanceId,
                  departementCode: {
                    in: departementsToRemove,
                  },
                },
              },
            )
          }
          if (epcisToAdd.length > 0) {
            await transaction.epciParticipantFormulaireGouvernance.createMany({
              data: epcisToAdd.map((toAdd) => ({
                formulaireGouvernanceId,
                epciCode: toAdd.code,
                horsTerritoire: toAdd.horsTerritoire,
              })),
            })
          }
          if (communesToAdd.length > 0) {
            await transaction.communeParticipanteFormulaireGouvernance.createMany(
              {
                data: communesToAdd.map((toAdd) => ({
                  formulaireGouvernanceId,
                  communeCode: toAdd.code,
                  horsTerritoire: toAdd.horsTerritoire,
                })),
              },
            )
          }
          if (departementsToAdd.length > 0) {
            await transaction.departementParticipantFormulaireGouvernance.createMany(
              {
                data: departementsToAdd.map((toAdd) => ({
                  formulaireGouvernanceId,
                  departementCode: toAdd.code,
                  horsTerritoire: toAdd.horsTerritoire,
                })),
              },
            )
          }
        })
      },
    ),

  // L'étape est terminée, on passe à l'étape suivante
  etapePerimetreFeuilleDeRoute: protectedProcedure
    .input(FormulaireGouvernanceIdValidation)
    .mutation(async ({ input: { formulaireGouvernanceId }, ctx: { user } }) => {
      if (!canUpdateFormulaireGouvernance(user, formulaireGouvernanceId)) {
        throw forbiddenError()
      }
      const result = await prismaClient.formulaireGouvernance.update({
        where: {
          id: formulaireGouvernanceId,
        },
        data: {
          etapePerimetre: new Date(),
        },
        select: {
          id: true,
        },
      })
      return getUpdatedFormulaireState({
        formulaireGouvernance: result,
        user,
      })
    }),
})
