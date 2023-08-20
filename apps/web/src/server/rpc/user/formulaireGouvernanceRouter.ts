import * as Sentry from '@sentry/nextjs'
import { v4 } from 'uuid'
import type { Prisma, UserRole } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { sendGouvernanceWelcomeEmail } from '@app/web/gouvernance/sendGouvernanceWelcomeEmail'
import {
  canUpdateFormulaireGouvernance,
  hasAccessToGouvernanceFormDevelopmentPreview,
} from '@app/web/security/securityRules'
import { forbiddenError, notFoundError } from '@app/web/server/rpc/trpcErrors'
import {
  ParticiperData,
  ParticiperValidation,
} from '@app/web/gouvernance/Participer'
import { ContactFormulaireGouvernanceData } from '@app/web/gouvernance/Contact'
import { ChoixDuFormulaireValidation } from '@app/web/gouvernance/ChoixDuFormulaire'
import {
  getFormulaireGouvernanceForForm,
  GouvernanceFormulaireForForm,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import {
  getEtapeFormulaire,
  getInfoEtapeFormulaire,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import { PorterOuParticiperValidation } from '@app/web/gouvernance/PorterOuParticiper'

const upsertDataFromContact = (
  formulaireGouvernanceId: string,
  input: ContactFormulaireGouvernanceData,
) => ({
  formulaireGouvernanceId,
  nom: input.nom.trim(),
  prenom: input.prenom.trim(),
  fonction: input.fonction.trim(),
  email: input.email.trim(),
})

const contactOperation = (
  formulaireGouvernanceId: string,
  input: ContactFormulaireGouvernanceData | null | undefined,
  existing: Record<string, unknown> | null,
) =>
  input
    ? {
        upsert: {
          create: upsertDataFromContact(formulaireGouvernanceId, input),
          update: upsertDataFromContact(formulaireGouvernanceId, input),
        },
      }
    : existing
    ? {
        delete: true,
      }
    : undefined

const dataFromParticiperInput = (
  input: ParticiperData,
  formulaireGouvernance: GouvernanceFormulaireForForm,
): Prisma.FormulaireGouvernanceUpdateInput => {
  // Cleanup unwanted data

  const formulaireGouvernanceId = formulaireGouvernance.id
  const cleanup = {
    structuresParticipantes:
      formulaireGouvernance.structuresParticipantes.length > 0
        ? { deleteMany: { formulaireGouvernanceId } }
        : undefined,
    epcisParticipantes:
      formulaireGouvernance.epcisParticipantes.length > 0
        ? { deleteMany: { formulaireGouvernanceId } }
        : undefined,
    communesParticipantes:
      formulaireGouvernance.communesParticipantes.length > 0
        ? { deleteMany: { formulaireGouvernanceId } }
        : undefined,
  }

  if (input.gouvernancePersona === 'structure') {
    return {
      ...cleanup,
      nomStructure: input.nomStructure.trim(),
      siretStructure: input.siretStructure.trim(),
      departement: { connect: { code: input.codeDepartement } },
      contactStructure: contactOperation(
        input.formulaireGouvernanceId,
        input.contactStructure,
        formulaireGouvernance.contactStructure,
      ),
      contactTechnique: contactOperation(
        input.formulaireGouvernanceId,
        null,
        formulaireGouvernance.contactTechnique,
      ),
      contactPolitique: contactOperation(
        input.formulaireGouvernanceId,
        null,
        formulaireGouvernance.contactPolitique,
      ),
      // Clean unwanted data (safety as the state of the form is out of this function scope)
      etapeInformationsParticipant: null,
      etapePerimetre: null,
      etapeContacts: null,
      etapeStructures: null,
      region: {
        disconnect: true,
      },
      commune: {
        disconnect: true,
      },
      epci: {
        disconnect: true,
      },
      schemaOuGouvernanceLocale: null,
    }
  }

  const commonParticiperCollectiviteData = {
    ...cleanup,
    // Clean unwanted data (safety as the state of the form is out of this function scope)
    etapeInformationsParticipant: null,
    etapePerimetre: null,
    etapeContacts: null,
    etapeStructures: null,
    nomStructure: null,
    siretStructure: null,
    contactStructure: contactOperation(
      formulaireGouvernance.id,
      null,
      formulaireGouvernance.contactStructure,
    ),
    contactTechnique: contactOperation(
      input.formulaireGouvernanceId,
      input.contactTechnique,
      formulaireGouvernance.contactTechnique,
    ),
    contactPolitique: contactOperation(
      input.formulaireGouvernanceId,
      input.contactPolitique,
      formulaireGouvernance.contactPolitique,
    ),
  }

  switch (input.gouvernancePersona) {
    case 'commune': {
      return {
        ...commonParticiperCollectiviteData,
        commune: { connect: { code: input.codeCommune } },
      }
    }
    case 'epci': {
      return {
        ...commonParticiperCollectiviteData,
        epci: { connect: { code: input.codeEpci } },
      }
    }
    case 'conseil-departemental': {
      return {
        ...commonParticiperCollectiviteData,
        departement: { connect: { code: input.codeDepartement } },
      }
    }
    case 'conseil-regional': {
      return {
        ...commonParticiperCollectiviteData,
        region: { connect: { code: input.codeRegion } },
      }
    }

    default: {
      throw new Error('Invalid form persona')
    }
  }
}

const getNewFormulaireState = async ({
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
        return getNewFormulaireState({
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
            },
          },
        },
        select: sessionUserSelect,
      })

      if (user.gouvernancePersona === gouvernancePersonaId) {
        // Do not send same email to user
        return getNewFormulaireState({
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

      return getNewFormulaireState({
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

        return getNewFormulaireState({
          formulaireGouvernance: updatedFormulaireGouvernance,
          user,
        })
      },
    ),
  participer: protectedProcedure
    .input(ParticiperValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      console.log('PARTICIPER INPUT', input)
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

      const data = dataFromParticiperInput(input, formulaireGouvernance)
      const formulaireGouvernanceId = formulaireGouvernance.id

      console.log('PARTICIPER DATA', data)

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

      return getNewFormulaireState({
        formulaireGouvernance: result.at(-1) as { id: string },
        user,
      })
    }),
})
