import type { Prisma } from '@prisma/client'
import { v4 } from 'uuid'
import sanitizeHtml from 'sanitize-html'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  getInfoFromPorteurCode,
  GouvernancePressentieValidation,
} from '@app/web/gouvernance/GouvernancePressentie'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { canAddGouvernancePressentie } from '@app/web/security/securityRules'
import { SessionUser } from '@app/web/auth/sessionUser'

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
  // Une mutation par étape du formulaire (cf etapeFormuliareGouvernance)
  gouvernancePressentie: protectedProcedure
    .input(GouvernancePressentieValidation)
    .mutation(
      async ({
        input: {
          id,
          siretsRecruteursCoordinateurs,
          porteurCode,
          departementCode,
          porteurSiret,
          perimetre,
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
          perimetre,
          modification: new Date(),
          noteDeContexte,
        } satisfies Prisma.GouvernanceUpdateInput

        const porteurSiretInformations =
          perimetre === 'autre' && porteurSiret
            ? {
                connectOrCreate: {
                  where: {
                    siret: porteurSiret,
                  },
                  create: {
                    siret: porteurSiret,
                  },
                },
              }
            : undefined

        const porteurInfo = porteurCode
          ? getInfoFromPorteurCode(porteurCode)
          : null

        const connectPorteurCode = porteurInfo
          ? {
              connect: {
                code: porteurInfo.code,
              },
            }
          : undefined
        const porteurRegion =
          !!porteurCode && porteurInfo?.type === 'region'
            ? connectPorteurCode
            : undefined
        const porteurDepartement =
          !!porteurCode && porteurInfo?.type === 'departement'
            ? connectPorteurCode
            : undefined
        const porteurEpci =
          !!porteurCode && porteurInfo?.type === 'epci'
            ? connectPorteurCode
            : undefined

        if (existing) {
          const data = {
            porteurRegion: porteurRegion ?? disconnect,
            porteurDepartement: porteurDepartement ?? disconnect,
            porteurEpci: porteurEpci ?? disconnect,
            porteurSiretInformations: porteurSiretInformations ?? disconnect,
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
            porteurRegion,
            porteurDepartement,
            porteurEpci,
            porteurSiretInformations,
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
})
