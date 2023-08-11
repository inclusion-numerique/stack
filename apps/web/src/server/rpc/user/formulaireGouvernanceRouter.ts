import * as Sentry from '@sentry/nextjs'
import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { ChooseGouvernancePersonaValidation } from '@app/web/gouvernance/ChooseGouvernancePersona'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { sendGouvernanceWelcomeEmail } from '@app/web/gouvernance/sendGouvernanceWelcomeEmail'
import { ChooseIntentionValidation } from '@app/web/gouvernance/ChooseIntention'
import { canUpdateFormulaireGouvernance } from '@app/web/security/securityRules'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import {
  ParticiperData,
  ParticiperValidation,
} from '@app/web/gouvernance/Participer'
import { ContactFormulaireGouvernanceData } from '@app/web/gouvernance/Contact'

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
  input?: ContactFormulaireGouvernanceData | null,
) =>
  input
    ? {
        upsert: {
          create: upsertDataFromContact(formulaireGouvernanceId, input),
          update: upsertDataFromContact(formulaireGouvernanceId, input),
        },
      }
    : { delete: true }

const dataFromParticiperInput = (
  input: ParticiperData,
): Prisma.FormulaireGouvernanceUpdateInput &
  Prisma.FormulaireGouvernanceUncheckedUpdateInput => {
  if (input.gouvernancePersona === 'structure') {
    return {
      nomStructure: input.nomStructure.trim(),
      siretStructure: input.siretStructure.trim(),
      departementCode: input.codeDepartement,
      contactStructure: contactOperation(
        input.formulaireGouvernanceId,
        input.contactStructure,
      ),
      // Clean unwanted data (safety as the state of the form is out of this function scope)
      etapeInformationsParticipant: null,
      etapePerimetre: null,
      etapeContacts: null,
      etapeStructures: null,
      regionCode: null,
      communeCode: null,
      epciCode: null,
      schemaOuGouvernanceLocale: null,
      contactPolitique: {
        delete: true,
      },
      contactTechnique: {
        delete: true,
      },
      epcisParticipantes: {
        deleteMany: {},
      },
      communesParticipantes: {
        deleteMany: {},
      },
      structuresParticipantes: {
        deleteMany: {},
      },
    }
  }

  const commonParticiperCollectiviteData = {
    // Clean unwanted data (safety as the state of the form is out of this function scope)
    etapeInformationsParticipant: null,
    etapePerimetre: null,
    etapeContacts: null,
    etapeStructures: null,
    nomStructure: null,
    siretStructure: null,
    contactStructure: {
      delete: true,
    },
    contactTechnique: contactOperation(
      input.formulaireGouvernanceId,
      input.contactTechnique,
    ),
    contactPolitique: contactOperation(
      input.formulaireGouvernanceId,
      input.contactPolitique,
    ),
    epcisParticipantes: {
      deleteMany: {},
    },
    communesParticipantes: {
      deleteMany: {},
    },
    structuresParticipantes: {
      deleteMany: {},
    },
  }

  switch (input.gouvernancePersona) {
    case 'commune': {
      return {
        ...commonParticiperCollectiviteData,
        regionCode: null,
        epciCode: null,
        departementCode: null,
        communeCode: input.codeCommune,
      }
    }
    case 'epci': {
      return {
        ...commonParticiperCollectiviteData,
        regionCode: null,
        epciCode: input.codeEpci,
        departementCode: null,
        communeCode: null,
      }
    }
    case 'conseil-departemental': {
      return {
        ...commonParticiperCollectiviteData,
        regionCode: null,
        epciCode: null,
        departementCode: input.codeDepartement,
        communeCode: null,
      }
    }
    case 'conseil-regional': {
      return {
        ...commonParticiperCollectiviteData,
        regionCode: input.codeRegion,
        epciCode: null,
        departementCode: null,
        communeCode: null,
      }
    }

    default: {
      throw new Error('Invalid form persona')
    }
  }
}

export const formulaireGouvernanceRouter = router({
  choosePersona: protectedProcedure
    .input(ChooseGouvernancePersonaValidation)
    .mutation(async ({ input: { gouvernancePersonaId }, ctx: { user } }) => {
      const formulaireGouvernanceId = v4()

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
        return updatedUser
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

      return updatedUser
    }),

  chooseIntention: protectedProcedure
    .input(ChooseIntentionValidation)
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
              intention: true,
              gouvernancePersona: true,
            },
          })

        return updatedFormulaireGouvernance
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
      const updatedFormulaireGouvernance =
        await prismaClient.formulaireGouvernance.update({
          where: { id: input.formulaireGouvernanceId },
          data: {
            intention: 'Participer',
            confirmeEtEnvoye: new Date(),
            ...(dataFromParticiperInput(
              input,
            ) as Prisma.FormulaireGouvernanceUpdateInput),
          },
          select: {
            id: true,
            intention: true,
            gouvernancePersona: true,
          },
        })

      return updatedFormulaireGouvernance
    }),
})
