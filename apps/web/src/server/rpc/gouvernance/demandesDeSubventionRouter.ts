import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import sanitizeHtml from 'sanitize-html'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, notFoundError } from '@app/web/server/rpc/trpcErrors'
import { checkSecurityForGouvernanceMutation } from '@app/web/server/rpc/gouvernance/gouvernanceSecurity'
import {
  BeneficiaireSubventionFormationValidation,
  DemandeDeSubventionActionValidation,
  DemandeDeSubventionValidation,
  NoteDeContexteSubventionsValidation,
} from '@app/web/gouvernance/DemandeDeSubvention'
import { SessionUser } from '@app/web/auth/sessionUser'

const demandeDeSubventionSecurityCheck = async ({
  demandeDeSubventionId,
  user,
}: {
  demandeDeSubventionId: string
  user: SessionUser
}) => {
  const gouvernance = await prismaClient.gouvernance.findFirst({
    where: {
      feuillesDeRoute: {
        some: {
          demandesDeSubvention: {
            some: {
              id: demandeDeSubventionId,
            },
          },
        },
      },
    },
    select: {
      id: true,
      departementCode: true,
      feuillesDeRoute: {
        where: {
          demandesDeSubvention: {
            some: {
              id: demandeDeSubventionId,
            },
          },
        },
        select: {
          id: true,
          demandesDeSubvention: {
            select: {
              id: true,
              valideeEtEnvoyee: true,
            },
            where: {
              id: demandeDeSubventionId,
            },
          },
        },
      },
    },
  })

  const demandeDeSubvention =
    gouvernance?.feuillesDeRoute[0]?.demandesDeSubvention[0]

  if (!demandeDeSubvention) {
    throw notFoundError()
  }
  if (demandeDeSubvention.valideeEtEnvoyee && user.role !== 'Administrator') {
    throw forbiddenError()
  }

  await checkSecurityForGouvernanceMutation(user, gouvernance.departementCode)

  return {
    gouvernance,
    demandeDeSubvention,
  }
}

export const demandesDeSubventionRouter = router({
  updateNoteDeContexteSubventions: protectedProcedure
    .input(NoteDeContexteSubventionsValidation)
    .mutation(
      async ({
        input: { gouvernanceId, noteDeContexteSubventions },
        ctx: { user },
      }) => {
        const gouvernance = await prismaClient.gouvernance.findUnique({
          where: {
            id: gouvernanceId,
          },
          select: {
            id: true,
            departementCode: true,
          },
        })

        if (!gouvernance) {
          throw notFoundError()
        }

        await checkSecurityForGouvernanceMutation(
          user,
          gouvernance.departementCode,
        )

        const result = await prismaClient.gouvernance.update({
          where: {
            id: gouvernance.id,
          },
          data: {
            noteDeContexteSubventions: sanitizeHtml(noteDeContexteSubventions),
            noteDeContexteSubventionsEnregistree: new Date(),
            derniereModificationParId: user.id,
            modification: new Date(),
          },
        })

        return result
      },
    ),
  updateBeneficiaireFormation: protectedProcedure
    .input(BeneficiaireSubventionFormationValidation)
    .mutation(
      async ({
        input: { gouvernanceId, membreGouvernanceId },
        ctx: { user },
      }) => {
        const gouvernance = await prismaClient.gouvernance.findUnique({
          where: {
            id: gouvernanceId,
          },
          select: {
            id: true,
            departementCode: true,
          },
        })

        if (!gouvernance) {
          throw notFoundError()
        }

        await checkSecurityForGouvernanceMutation(
          user,
          gouvernance.departementCode,
        )

        const result = await prismaClient.gouvernance.update({
          where: {
            id: gouvernance.id,
          },
          data: {
            beneficiaireDotationFormationId: membreGouvernanceId,
            beneficiaireDotationFormationEnregistre: new Date(),
            derniereModificationParId: user.id,
            modification: new Date(),
          },
        })

        return result
      },
    ),
  createOrUpdate: protectedProcedure
    .input(DemandeDeSubventionValidation)
    .mutation(
      async ({
        input: {
          id: inputId,
          besoins,
          subventionEtpChecked,
          subventionPrestationChecked,
          feuilleDeRouteId,
          nomAction,
          contexte,
          description,
          budgetGlobal,
          pieceJointeBudgetKey,
          subventionDemandee,
          subventionEtp,
          subventionPrestation,
          beneficiaires,
        },
        ctx: { user },
      }) => {
        const gouvernance = await prismaClient.gouvernance.findFirst({
          where: {
            feuillesDeRoute: { some: { id: feuilleDeRouteId } },
          },
          select: {
            id: true,
            departementCode: true,
            besoinsEnIngenierieFinanciereId: true,
          },
        })

        if (!gouvernance) {
          throw notFoundError()
        }

        await (inputId
          ? demandeDeSubventionSecurityCheck({
              demandeDeSubventionId: inputId,
              user,
            })
          : checkSecurityForGouvernanceMutation(
              user,
              gouvernance.departementCode,
            ))

        const id = inputId ?? v4()

        const data = {
          derniereModificationParId: user.id,
          modification: new Date(),
          besoins,
          feuilleDeRouteId,
          nomAction,
          contexte,
          description,
          budgetGlobal,
          pieceJointeBudgetKey,
          subventionDemandee,
          subventionEtp: subventionEtpChecked ? subventionEtp ?? 0 : null,
          subventionPrestation: subventionPrestationChecked
            ? subventionPrestation ?? 0
            : null,
        } satisfies Omit<
          Prisma.DemandeDeSubventionUncheckedCreateInput,
          'id' | 'createurId'
        >

        // We wipe and recreate beneficiaires to avoid complex logic for updating beneficiaires array

        const result = await prismaClient.$transaction(async (transaction) => {
          const demandeDeSubvention =
            await transaction.demandeDeSubvention.upsert({
              where: {
                id,
              },
              create: {
                id,
                createurId: user.id,
                ...data,
              },
              update: {
                ...data,
              },
            })

          await transaction.beneficiaireSubvention.deleteMany({
            where: {
              demandeDeSubventionId: id,
            },
          })

          await transaction.beneficiaireSubvention.createMany({
            data: beneficiaires.map((beneficiaire) => ({
              id: v4(),
              demandeDeSubventionId: id,
              membreGouvernanceId: beneficiaire.membreGouvernanceId,
              subvention: beneficiaire.subvention,
            })),
          })

          return demandeDeSubvention
        })

        return result
      },
    ),

  delete: protectedProcedure
    .input(DemandeDeSubventionActionValidation)
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      await demandeDeSubventionSecurityCheck({
        demandeDeSubventionId: id,
        user,
      })

      const uploadsToDelete = await prismaClient.upload.findMany({
        where: {
          pieceJointeBudgetSubvention: { id },
        },
        select: {
          key: true,
        },
      })

      await prismaClient.$transaction([
        prismaClient.beneficiaireSubvention.deleteMany({
          where: {
            demandeDeSubventionId: id,
          },
        }),
        prismaClient.demandeDeSubvention.delete({
          where: {
            id,
          },
        }),
      ])

      await prismaClient.upload.deleteMany({
        where: {
          key: {
            in: uploadsToDelete.map((upload) => upload.key),
          },
        },
      })

      return { id }
    }),
  validerEtEnvoyer: protectedProcedure
    .input(DemandeDeSubventionActionValidation)
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      await demandeDeSubventionSecurityCheck({
        demandeDeSubventionId: id,
        user,
      })

      await prismaClient.demandeDeSubvention.update({
        where: {
          id,
        },
        data: {
          valideeEtEnvoyee: new Date(),
          derniereModificationParId: user.id,
          modification: new Date(),
        },
      })

      return { id }
    }),
  accepter: protectedProcedure
    .input(DemandeDeSubventionActionValidation)
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      await demandeDeSubventionSecurityCheck({
        demandeDeSubventionId: id,
        user,
      })

      await prismaClient.demandeDeSubvention.update({
        where: {
          id,
        },
        data: {
          acceptee: new Date(),
        },
      })

      return { id }
    }),
  demanderAModifier: protectedProcedure
    .input(DemandeDeSubventionActionValidation)
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      await demandeDeSubventionSecurityCheck({
        demandeDeSubventionId: id,
        user,
      })

      await prismaClient.demandeDeSubvention.update({
        where: {
          id,
        },
        data: {
          acceptee: null,
          valideeEtEnvoyee: null,
          demandeDeModification: new Date(),
        },
      })

      return { id }
    }),
})
