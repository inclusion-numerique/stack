import { v4 } from 'uuid'
import type { Prisma, UserRole } from '@prisma/client'
import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { canUpdateFormulaireGouvernance } from '@app/web/security/securityRules'
import { forbiddenError, notFoundError } from '@app/web/server/rpc/trpcErrors'
import { ParticiperValidation } from '@app/web/gouvernance/Participer'
import { ChoixDuFormulaireValidation } from '@app/web/gouvernance/ChoixDuFormulaire'
import {
  getCurrentFormulaireGouvernanceForFormByUser,
  getFormulaireGouvernanceForFormById,
} from '@app/web/app/(public)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
import {
  getEtapeEnCours,
  getEtapeInfo,
} from '@app/web/app/(public)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import { PorterOuParticiperValidation } from '@app/web/gouvernance/PorterOuParticiper'
import { AnnulerValidation } from '@app/web/gouvernance/Annuler'
import { participerPersistenceFromData } from '@app/web/gouvernance/participerHelpers.server'
import { InformationsParticipantValidation } from '@app/web/gouvernance/InformationsParticipant'
import { informationsParticipantsPersistenceFromData } from '@app/web/gouvernance/informationsParticipantHelpers.server'
import { PerimetreFeuilleDeRouteValidation } from '@app/web/gouvernance/PerimetreFeuilleDeRoute'
import { ContactCollectiviteValidation } from '@app/web/gouvernance/ContactCollectivite'
import { AutreStructureValidation } from '@app/web/gouvernance/AutreStructure'
import { GouvernancePersonaId } from '@app/web/app/(public)/gouvernance/gouvernancePersona'

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

  const etapeCourante = getEtapeEnCours({
    formulaireGouvernance: updatedFormulaireGouvernance,
    user,
  })
  const etapeInfo = getEtapeInfo({
    etape: etapeCourante,
    gouvernancePersonaId:
      updatedFormulaireGouvernance.gouvernancePersona as GouvernancePersonaId | null,
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
      const existingFormulaire =
        await getCurrentFormulaireGouvernanceForFormByUser(user.id)

      // We make sure to reset the users gouvernancePersona with the new choice
      const updatedUser =
        gouvernancePersonaId === user.gouvernancePersona
          ? // Only update user if needed, not the formulaire
            user
          : await prismaClient.user.update({
              where: { id: user.id },
              data: {
                gouvernancePersona: gouvernancePersonaId,
              },
              select: sessionUserSelect,
            })

      // User already had a form
      if (
        existingFormulaire && // User selected same persona as existing form
        existingFormulaire.gouvernancePersona === gouvernancePersonaId
      ) {
        // Reuse the existing formulaire for same persona and do not mutate anything else

        return getUpdatedFormulaireState({
          formulaireGouvernance: existingFormulaire,
          user: updatedUser,
        })
      }

      // Create a new formulaireGouvernance with the new persona
      // It is more recent than existingFormulaire so it will be selected by default from now on
      await prismaClient.user.update({
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

      return getUpdatedFormulaireState({
        formulaireGouvernance: { id: formulaireGouvernanceId },
        user: updatedUser,
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

      const formulaireGouvernance = await getFormulaireGouvernanceForFormById(
        input.formulaireGouvernanceId,
      )
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

      const formulaireGouvernance = await getFormulaireGouvernanceForFormById(
        input.formulaireGouvernanceId,
      )
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
  contactCollectivite: protectedProcedure
    .input(ContactCollectiviteValidation)
    .mutation(
      async ({
        input: {
          formulaireGouvernanceId,
          type,
          nom,
          fonction,
          prenom,
          participantId,
          email,
        },
        ctx: { user },
      }) => {
        if (!canUpdateFormulaireGouvernance(user, formulaireGouvernanceId)) {
          throw forbiddenError()
        }

        const participantSearchParams = {
          where: {
            id: participantId,
          },
          select: {
            id: true,
            contactId: true,
          },
        }

        const participant =
          type === 'departement'
            ? await prismaClient.departementParticipantFormulaireGouvernance.findUnique(
                participantSearchParams,
              )
            : type === 'epci'
              ? await prismaClient.epciParticipantFormulaireGouvernance.findUnique(
                  participantSearchParams,
                )
              : await prismaClient.communeParticipanteFormulaireGouvernance.findUnique(
                  participantSearchParams,
                )

        if (!participant) {
          throw notFoundError()
        }

        await (participant.contactId
          ? prismaClient.contactFormulaireGouvernance.update({
              where: {
                id: participant.contactId,
              },
              data: {
                email,
                fonction,
                nom,
                prenom,
              },
            })
          : prismaClient.contactFormulaireGouvernance.create({
              data: {
                email,
                fonction,
                nom,
                prenom,
                [type === 'departement'
                  ? 'contactDepartementParticipant'
                  : type === 'epci'
                    ? 'contactEpciParticipant'
                    : 'contactCommuneParticipante']: {
                  connect: {
                    id: participant.id,
                  },
                },
                formulaireGouvernance: {
                  connect: {
                    id: formulaireGouvernanceId,
                  },
                },
              },
            }))
      },
    ),
  // L'étape est terminée, on passe à l'étape suivante
  etapeConcactsCollectivites: protectedProcedure
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
          etapeContacts: new Date(),
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
  autreStructure: protectedProcedure
    .input(AutreStructureValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      if (
        !canUpdateFormulaireGouvernance(user, input.formulaireGouvernanceId)
      ) {
        throw forbiddenError()
      }

      const existing = input.participantId
        ? await prismaClient.structureParticipanteFormulaireGouvernance.findUnique(
            {
              where: { id: input.participantId },
              select: {
                id: true,
              },
            },
          )
        : null

      if (input.action === 'supprimer') {
        if (!existing) {
          return null
        }

        await prismaClient.structureParticipanteFormulaireGouvernance.delete({
          where: { id: input.participantId },
        })
        return null
      }
      const { formulaireGouvernanceId, contact, nomStructure, participantId } =
        input

      // If existing, update, else create
      if (participantId && existing) {
        const updated =
          await prismaClient.structureParticipanteFormulaireGouvernance.update({
            where: { id: participantId },
            data: {
              nomStructure,
              contact: {
                upsert: {
                  create: {
                    formulaireGouvernanceId,
                    ...contact,
                  },
                  update: {
                    ...contact,
                  },
                },
              },
            },
            select: {
              id: true,
            },
          })
        return updated
      }

      if (participantId) {
        // Trying to update deleted structure, edge case (multiple browser tabs), ignoring.
        return null
      }

      const contactId = v4()
      const createdParticipantId = v4()

      const result = await prismaClient.$transaction([
        prismaClient.contactFormulaireGouvernance.create({
          data: {
            id: contactId,
            formulaireGouvernanceId,
            ...contact,
          },
          select: {
            id: true,
          },
        }),
        prismaClient.structureParticipanteFormulaireGouvernance.create({
          data: {
            id: createdParticipantId,
            formulaireGouvernanceId,
            nomStructure,
            contactId,
          },
          select: { id: true, contact: true },
        }),
      ])

      return result[1]
    }),
  // L'étape est terminée, on passe à l'étape suivante
  etapeAutresStructures: protectedProcedure
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
          etapeStructures: new Date(),
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
  recapitulatif: protectedProcedure
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
          confirmeEtEnvoye: new Date(),
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
  recommencer: protectedProcedure
    .input(FormulaireGouvernanceIdValidation)
    .mutation(async ({ input: { formulaireGouvernanceId }, ctx: { user } }) => {
      if (!canUpdateFormulaireGouvernance(user, formulaireGouvernanceId)) {
        throw forbiddenError()
      }
      const formulaireGouvernance = await getFormulaireGouvernanceForFormById(
        formulaireGouvernanceId,
      )
      if (!formulaireGouvernance) {
        throw notFoundError()
      }

      // We copy the form metadata and update the user to the new form
      const newFormulaireId = v4()
      const [newFormulaire] = await prismaClient.$transaction([
        prismaClient.formulaireGouvernance.create({
          data: {
            id: newFormulaireId,
            gouvernancePersona: formulaireGouvernance.gouvernancePersona,
            intention: formulaireGouvernance.intention,
            createurId: user.id,
            demonstration: formulaireGouvernance.demonstration,
          },
        }),
        prismaClient.user.update({
          where: { id: user.id },
          data: {
            formulaireGouvernanceId: newFormulaireId,
          },
        }),
      ])

      return getUpdatedFormulaireState({
        formulaireGouvernance: newFormulaire,
        user,
      })
    }),
})
