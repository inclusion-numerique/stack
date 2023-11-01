import type { Prisma } from '@prisma/client'
import { v4 } from 'uuid'
import sanitizeHtml from 'sanitize-html'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  getInfoFromPorteurCode,
  GouvernancePressentieValidation,
} from '@app/web/gouvernance/GouvernancePressentie'
import { prismaClient } from '@app/web/prismaClient'
import {
  forbiddenError,
  invalidError,
  notFoundError,
} from '@app/web/server/rpc/trpcErrors'
import { canAddGouvernancePressentie } from '@app/web/security/securityRules'
import { SessionUser } from '@app/web/auth/sessionUser'
import { GouvernanceIdValidation } from '@app/web/gouvernance/GouvernanceIdValidation'
import { GouvernanceValidation } from '@app/web/gouvernance/Gouvernance'

const checkSecurityForGouvernanceMutation = async (
  user: SessionUser,
  departementCode: string,
) => {
  const departementAndRegion = await prismaClient.departement.findUnique({
    where: {
      code: departementCode,
    },
    select: {
      code: true,
      region: {
        select: {
          code: true,
        },
      },
    },
  })

  if (!departementAndRegion) {
    throw invalidError('Département non trouvé')
  }

  if (
    !canAddGouvernancePressentie(user, {
      departementCode,
      regionCode: departementAndRegion.region?.code,
    })
  ) {
    throw forbiddenError(
      'Vous ne pouvez pas ajouter de gouvernance pressentie pour ce département',
    )
  }
}

export const gouvernanceRouter = router({
  gouvernance: protectedProcedure
    .input(GouvernanceValidation)
    .mutation(
      async ({
        input: {
          id,
          siretsRecruteursCoordinateurs,
          v1PorteurCode,
          departementCode,
          v1PorteurSiret,
          v1Perimetre,
          noteDeContexte: dangerousHtmlFromNoteDeContexte,
        },
        ctx: { user },
      }) => {
        const noteDeContexte = sanitizeHtml(dangerousHtmlFromNoteDeContexte)

        await checkSecurityForGouvernanceMutation(user, departementCode)

        // If updating, check that gouvernance exists
        const existing = id
          ? await prismaClient.gouvernance
              .findUnique({
                where: { id },
                select: {
                  id: true,
                },
              })
              .then((gouvernance) => {
                if (!gouvernance) {
                  throw invalidError('Gouvernance non trouvée')
                }
                return gouvernance
              })
          : null

        const disconnect = { disconnect: true }

        const persistenceId = existing?.id ?? v4()

        const organisationsRecruteusesCoordinateursData =
          siretsRecruteursCoordinateurs.map(({ siret }) => ({
            gouvernance: {
              connect: {
                id: persistenceId,
              },
            },
            siretInformations: {
              connectOrCreate: {
                where: {
                  siret,
                },
                create: {
                  siret,
                },
              },
            },
          })) satisfies Prisma.OrganisationRecruteuseCoordinateursCreateInput[]

        const commonData = {
          derniereModificationPar: {
            connect: {
              id: user.id,
            },
          },
          v1Perimetre,
          modification: new Date(),
          noteDeContexte,
        } satisfies Prisma.GouvernanceUpdateInput

        const v1PorteurSiretInformations =
          v1Perimetre === 'autre' && v1PorteurSiret
            ? {
                connectOrCreate: {
                  where: {
                    siret: v1PorteurSiret,
                  },
                  create: {
                    siret: v1PorteurSiret,
                  },
                },
              }
            : undefined

        const porteurInfo = v1PorteurCode
          ? getInfoFromPorteurCode(v1PorteurCode)
          : null

        const connectPorteurCode = porteurInfo
          ? {
              connect: {
                code: porteurInfo.code,
              },
            }
          : undefined
        const v1PorteurRegion =
          !!v1PorteurCode && porteurInfo?.type === 'region'
            ? connectPorteurCode
            : undefined
        const v1PorteurDepartement =
          !!v1PorteurCode && porteurInfo?.type === 'departement'
            ? connectPorteurCode
            : undefined
        const v1PorteurEpci =
          !!v1PorteurCode && porteurInfo?.type === 'epci'
            ? connectPorteurCode
            : undefined

        if (existing) {
          const data = {
            v1PorteurRegion: v1PorteurRegion ?? disconnect,
            v1PorteurDepartement: v1PorteurDepartement ?? disconnect,
            v1PorteurEpci: v1PorteurEpci ?? disconnect,
            v1PorteurSiretInformations:
              v1PorteurSiretInformations ?? disconnect,
            ...commonData,
          } satisfies Prisma.GouvernanceUpdateInput

          await prismaClient.$transaction([
            // Cleanup before recreating, less complexity in code, drawback is ids will change
            prismaClient.organisationRecruteuseCoordinateurs.deleteMany({
              where: {
                gouvernanceId: existing.id,
              },
            }),
            prismaClient.gouvernance.update({
              where: { id: existing.id },
              data,
            }),
            // Create organisations recruteuses in a second pass
            ...organisationsRecruteusesCoordinateursData.map(
              (organisationData) =>
                prismaClient.organisationRecruteuseCoordinateurs.create({
                  data: organisationData,
                }),
            ),
          ])
        } else {
          const data = {
            ...commonData,
            departement: {
              connect: {
                code: departementCode,
              },
            },
            v1PorteurRegion,
            v1PorteurDepartement,
            v1PorteurEpci,
            v1PorteurSiretInformations,
            createur: {
              connect: {
                id: user.id,
              },
            },
          } satisfies Prisma.GouvernanceCreateInput

          await prismaClient.$transaction([
            prismaClient.gouvernance.create({
              data: { ...data, id: persistenceId },
            }),
            // Create organisations recruteuses in a second pass

            ...organisationsRecruteusesCoordinateursData.map(
              (organisationData) =>
                prismaClient.organisationRecruteuseCoordinateurs.create({
                  data: organisationData,
                }),
            ),
          ])
        }
      },
    ),
  gouvernancePressentie: protectedProcedure
    .input(GouvernancePressentieValidation)
    .mutation(
      async ({
        input: {
          id,
          siretsRecruteursCoordinateurs,
          v1PorteurCode,
          departementCode,
          v1PorteurSiret,
          v1Perimetre,
          noteDeContexte: dangerousHtmlFromNoteDeContexte,
        },
        ctx: { user },
      }) => {
        const noteDeContexte = sanitizeHtml(dangerousHtmlFromNoteDeContexte)

        await checkSecurityForGouvernanceMutation(user, departementCode)

        // If updating, check that gouvernance exists
        const existing = id
          ? await prismaClient.gouvernance
              .findUnique({
                where: { id },
                select: {
                  id: true,
                },
              })
              .then((gouvernance) => {
                if (!gouvernance) {
                  throw invalidError('Gouvernance non trouvée')
                }
                return gouvernance
              })
          : null

        const disconnect = { disconnect: true }

        const persistenceId = existing?.id ?? v4()

        const organisationsRecruteusesCoordinateursData =
          siretsRecruteursCoordinateurs.map(({ siret }) => ({
            gouvernance: {
              connect: {
                id: persistenceId,
              },
            },
            siretInformations: {
              connectOrCreate: {
                where: {
                  siret,
                },
                create: {
                  siret,
                },
              },
            },
          })) satisfies Prisma.OrganisationRecruteuseCoordinateursCreateInput[]

        const commonData = {
          derniereModificationPar: {
            connect: {
              id: user.id,
            },
          },
          v1Perimetre,
          modification: new Date(),
          noteDeContexte,
        } satisfies Prisma.GouvernanceUpdateInput

        const v1PorteurSiretInformations =
          v1Perimetre === 'autre' && v1PorteurSiret
            ? {
                connectOrCreate: {
                  where: {
                    siret: v1PorteurSiret,
                  },
                  create: {
                    siret: v1PorteurSiret,
                  },
                },
              }
            : undefined

        const porteurInfo = v1PorteurCode
          ? getInfoFromPorteurCode(v1PorteurCode)
          : null

        const connectPorteurCode = porteurInfo
          ? {
              connect: {
                code: porteurInfo.code,
              },
            }
          : undefined
        const v1PorteurRegion =
          !!v1PorteurCode && porteurInfo?.type === 'region'
            ? connectPorteurCode
            : undefined
        const v1PorteurDepartement =
          !!v1PorteurCode && porteurInfo?.type === 'departement'
            ? connectPorteurCode
            : undefined
        const v1PorteurEpci =
          !!v1PorteurCode && porteurInfo?.type === 'epci'
            ? connectPorteurCode
            : undefined

        if (existing) {
          const data = {
            v1PorteurRegion: v1PorteurRegion ?? disconnect,
            v1PorteurDepartement: v1PorteurDepartement ?? disconnect,
            v1PorteurEpci: v1PorteurEpci ?? disconnect,
            v1PorteurSiretInformations:
              v1PorteurSiretInformations ?? disconnect,
            ...commonData,
          } satisfies Prisma.GouvernanceUpdateInput

          await prismaClient.$transaction([
            // Cleanup before recreating, less complexity in code, drawback is ids will change
            prismaClient.organisationRecruteuseCoordinateurs.deleteMany({
              where: {
                gouvernanceId: existing.id,
              },
            }),
            prismaClient.gouvernance.update({
              where: { id: existing.id },
              data,
            }),
            // Create organisations recruteuses in a second pass
            ...organisationsRecruteusesCoordinateursData.map(
              (organisationData) =>
                prismaClient.organisationRecruteuseCoordinateurs.create({
                  data: organisationData,
                }),
            ),
          ])
        } else {
          const data = {
            ...commonData,
            departement: {
              connect: {
                code: departementCode,
              },
            },
            v1PorteurRegion,
            v1PorteurDepartement,
            v1PorteurEpci,
            v1PorteurSiretInformations,
            createur: {
              connect: {
                id: user.id,
              },
            },
          } satisfies Prisma.GouvernanceCreateInput

          await prismaClient.$transaction([
            prismaClient.gouvernance.create({
              data: { ...data, id: persistenceId },
            }),
            // Create organisations recruteuses in a second pass

            ...organisationsRecruteusesCoordinateursData.map(
              (organisationData) =>
                prismaClient.organisationRecruteuseCoordinateurs.create({
                  data: organisationData,
                }),
            ),
          ])
        }
      },
    ),
  supprimer: protectedProcedure
    .input(GouvernanceIdValidation)
    .mutation(async ({ input: { gouvernanceId }, ctx: { user } }) => {
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

      await prismaClient.gouvernance.update({
        where: {
          id: gouvernanceId,
        },
        data: {
          supression: new Date(),
          derniereModificationParId: user.id,
          modification: new Date(),
        },
      })
    }),
})
