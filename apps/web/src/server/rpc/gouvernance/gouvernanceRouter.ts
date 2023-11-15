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
import {
  CreateGouvernanceValidation,
  GouvernanceValidation,
  SiretInfoData,
} from '@app/web/gouvernance/Gouvernance'
import { gouvernanceSelect } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  getActorFromCode,
  getMembreModelDataFromActorCode,
  membreToFormMembre,
} from '@app/web/gouvernance/GouvernanceActor'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { hasADefinedKey, hasANullishKey } from '@app/web/utils/hasADefinedKey'

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

const getGouvernanceMutationContext = async ({
  user,
  gouvernanceId,
}: {
  gouvernanceId: string
  user: SessionUser
}) => {
  const gouvernance = await prismaClient.gouvernance.findUnique({
    where: {
      id: gouvernanceId,
    },
    select: gouvernanceSelect,
  })
  if (!gouvernance) {
    throw notFoundError()
  }

  await checkSecurityForGouvernanceMutation(user, gouvernance.departement.code)

  return {
    gouvernance,
    membresFormData: new Map(
      gouvernance.membres.map((membre) => {
        const formData = membreToFormMembre(gouvernance.id, membre)

        return [formData.code, { membre, formData }]
      }),
    ),
  }
}

export const gouvernanceRouter = router({
  createGouvernance: protectedProcedure
    .input(CreateGouvernanceValidation)
    .mutation(async ({ input: { departementCode }, ctx: { user } }) => {
      await checkSecurityForGouvernanceMutation(user, departementCode)

      const gouvernance = await prismaClient.gouvernance.create({
        data: {
          departementCode,
          createurId: user.id,
          derniereModificationParId: user.id,
          noteDeContexte: '',
        },
        select: {
          id: true,
          departementCode: true,
        },
      })

      return gouvernance
    }),
  updateGouvernanceV2: protectedProcedure
    .input(GouvernanceValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      console.log('gouvernanceMutation', JSON.stringify(input, null, 2))
      const {
        gouvernanceId,
        recruteursCoordinateurs,
        membres,
        noteDeContexte,
        pasDeCoporteurs,
        feuillesDeRoute,
        comites,
        sousPrefetReferentEmail,
        sousPrefetReferentPrenom,
        sousPrefetReferentNom,
      } = input

      const { gouvernance, membresFormData } =
        await getGouvernanceMutationContext({
          user,
          gouvernanceId,
        })

      const membresToCreate = membres.filter(
        (membre) => !membresFormData.has(membre.code),
      )

      const siretInformationsToUpsert = [
        ...recruteursCoordinateurs.map(({ siret, nom }) => ({
          siret,
          nom,
        })),
        ...membres
          .map(({ code, nom }) => ({ nom, actor: getActorFromCode(code) }))
          .filter(({ actor: { type } }) => type === 'structure')
          .map(({ nom, actor: { code } }) => ({
            siret: code || `__sans-siret__${nom}`,
            nom,
          })),
      ]
        // Dedupe by siret
        .reduce((accumulator, siretInformation) => {
          if (
            !accumulator.some(({ siret }) => siret === siretInformation.siret)
          ) {
            accumulator.push(siretInformation)
          }
          return accumulator
        }, [] as SiretInfoData[])

      console.log('SIRET INFO TO UPSER', siretInformationsToUpsert)

      const membresToDelete = [...membresFormData.keys()]
        .filter((code) => !membres.some((membre) => membre.code === code))
        .map((code) => membresFormData.get(code)?.membre.id)
        .filter(isDefinedAndNotNull)

      const membresToUpdate = membres.filter((membre) =>
        membresFormData.has(membre.code),
      )

      const recruteursToDelete =
        gouvernance.organisationsRecruteusesCoordinateurs
          .filter(({ siretInformations }) =>
            recruteursCoordinateurs.every(
              ({ siret }) => siret !== siretInformations.siret,
            ),
          )
          .map(({ id }) => id)

      // Recruteurs that are on input but not in gouvernance
      const recruteursToCreate = recruteursCoordinateurs.filter(
        ({ siret }) =>
          !gouvernance.organisationsRecruteusesCoordinateurs.some(
            ({ siretInformations }) => siretInformations.siret === siret,
          ),
      )

      console.log('RECUREURS TO CREATE', recruteursToCreate)

      const feuillesDeRouteToDelete = gouvernance.feuillesDeRoute
        .filter(
          ({ id }) => !feuillesDeRoute.some((feuille) => feuille.id === id),
        )
        .map(({ id }) => id)

      const feuillesDeRouteToCreate = feuillesDeRoute.filter(
        hasANullishKey('id'),
      )
      const feuillesDeRouteToUpdate = feuillesDeRoute.filter(
        hasADefinedKey('id'),
      )

      const comitesToDelete = gouvernance.comites
        .filter(({ id }) => !comites.some((comite) => comite.id === id))
        .map(({ id }) => id)

      const comitesToCreate = comites.filter(hasANullishKey('id'))
      const comitesToUpdate = comites.filter(hasADefinedKey('id'))

      const mutatedGouvernance = await prismaClient.$transaction(
        async (transaction) => {
          for (const siretInformation of siretInformationsToUpsert) {
            // eslint-disable-next-line no-await-in-loop
            await transaction.informationsSiret.upsert({
              where: {
                siret: siretInformation.siret,
              },
              update: {
                nom: siretInformation.nom,
              },
              create: {
                siret: siretInformation.siret,
                nom: siretInformation.nom,
              },
            })
          }

          // Delete removed membres
          if (membresToDelete.length > 0) {
            await transaction.membreGouvernance.deleteMany({
              where: {
                id: {
                  in: membresToDelete,
                },
              },
            })
          }

          const membreIdForCode = new Map<string, string>()

          // Add membres
          if (membresToCreate.length > 0) {
            await transaction.membreGouvernance.createMany({
              data: membresToCreate.map((membre) => {
                const { type } = getActorFromCode(membre.code)
                const id = v4()

                membreIdForCode.set(membre.code, id)
                return {
                  id,
                  gouvernanceId,
                  coporteur: membre.coporteur ?? false,
                  ...getMembreModelDataFromActorCode(membre.code, membre.nom),
                  nomStructure: type === 'structure' ? membre.nom : null,
                }
              }),
            })
          }

          // Update membres
          for (const membreToUpdate of membresToUpdate) {
            const id = membresFormData.get(membreToUpdate.code)?.membre.id
            if (!id) {
              continue
            }
            membreIdForCode.set(membreToUpdate.code, id)
            const { type } = getActorFromCode(membreToUpdate.code)

            // eslint-disable-next-line no-await-in-loop
            await transaction.membreGouvernance.update({
              where: {
                id,
              },
              data: {
                gouvernanceId,
                coporteur: membreToUpdate.coporteur ?? false,
                ...getMembreModelDataFromActorCode(
                  membreToUpdate.code,
                  membreToUpdate.nom,
                ),
                nomStructure: type === 'structure' ? membreToUpdate.nom : null,
              },
            })
          }

          // Delete removed recruteurs
          if (recruteursToDelete.length > 0) {
            await transaction.organisationRecruteuseCoordinateurs.deleteMany({
              where: {
                id: {
                  in: recruteursToDelete,
                },
              },
            })
          }

          if (recruteursToCreate.length > 0) {
            await transaction.organisationRecruteuseCoordinateurs.createMany({
              data: recruteursToCreate.map(({ siret }) => ({
                gouvernanceId,
                siret,
              })),
            })
          }

          if (feuillesDeRouteToDelete.length > 0) {
            await transaction.feuilleDeRoute.deleteMany({
              where: {
                id: {
                  in: feuillesDeRouteToDelete,
                },
              },
            })
          }

          // Create feuilles de routes
          for (const feuilleToCreate of feuillesDeRouteToCreate) {
            const porteurMembreId = membreIdForCode.get(
              feuilleToCreate.porteur.code,
            )
            if (!porteurMembreId) {
              return
            }
            // eslint-disable-next-line no-await-in-loop
            await transaction.feuilleDeRoute.create({
              data: {
                id: v4(),
                gouvernanceId,
                nom: feuilleToCreate.nom,
                contratPreexistant:
                  feuilleToCreate.contratPreexistant === 'oui',
                typeContrat: feuilleToCreate.typeContrat,
                typeContratAutreDescription:
                  feuilleToCreate.typeContrat === 'Autre'
                    ? feuilleToCreate.typeContratAutreDescription ?? null
                    : null,
                perimetreDepartementCode:
                  feuilleToCreate.perimetreScope === 'departement'
                    ? gouvernance.departement.code
                    : null,
                perimetreRegionCode:
                  feuilleToCreate.perimetreScope === 'region'
                    ? gouvernance.departement.codeRegion ?? null
                    : null,
                perimetreEpcis:
                  feuilleToCreate.perimetreEpciCodes.length > 0
                    ? {
                        createMany: {
                          data: feuilleToCreate.perimetreEpciCodes.map(
                            (epciCode) => ({
                              epciCode,
                            }),
                          ),
                        },
                      }
                    : undefined,
                membres: {
                  create: {
                    id: v4(),
                    role: 'Porteur',
                    membreId: porteurMembreId,
                  },
                },
              },
            })
          }

          for (const feuilleToUpdate of feuillesDeRouteToUpdate) {
            // Easier to delete and recreate than to merge
            // eslint-disable-next-line no-await-in-loop
            await transaction.perimetreEpciFeuilleDeRoute.deleteMany({
              where: {
                feuilleDeRouteId: feuilleToUpdate.id,
              },
            })

            const updatedFeuilleDeRoute =
              // eslint-disable-next-line no-await-in-loop
              await transaction.feuilleDeRoute.update({
                where: {
                  id: feuilleToUpdate.id,
                },
                data: {
                  nom: feuilleToUpdate.nom,
                  contratPreexistant:
                    feuilleToUpdate.contratPreexistant === 'oui',
                  typeContrat: feuilleToUpdate.typeContrat,
                  typeContratAutreDescription:
                    feuilleToUpdate.typeContrat === 'Autre'
                      ? feuilleToUpdate.typeContratAutreDescription ?? null
                      : null,
                  perimetreDepartementCode:
                    feuilleToUpdate.perimetreScope === 'departement'
                      ? gouvernance.departement.code
                      : null,
                  perimetreRegionCode:
                    feuilleToUpdate.perimetreScope === 'region'
                      ? gouvernance.departement.codeRegion ?? null
                      : null,
                  perimetreEpcis:
                    feuilleToUpdate.perimetreEpciCodes.length > 0
                      ? {
                          createMany: {
                            data: feuilleToUpdate.perimetreEpciCodes.map(
                              (epciCode) => ({
                                epciCode,
                              }),
                            ),
                          },
                        }
                      : undefined,
                },
                select: {
                  membres: {
                    select: {
                      id: true,
                      role: true,
                    },
                  },
                },
              })

            // Update membre porteur
            const membrePorteur = updatedFeuilleDeRoute.membres.find(
              ({ role }) => role === 'Porteur',
            )

            const membrePorteurId = membreIdForCode.get(
              feuilleToUpdate.porteur.code,
            )
            if (!membrePorteur) {
              continue
            }

            // eslint-disable-next-line no-await-in-loop
            await transaction.membreFeuilleDeRoute.update({
              where: {
                id: membrePorteur.id,
              },
              data: {
                membreId: membrePorteurId,
              },
            })
          }

          // Delete recruteurs
          if (recruteursToDelete.length > 0) {
            await transaction.organisationRecruteuseCoordinateurs.deleteMany({
              where: {
                id: {
                  in: recruteursToDelete,
                },
              },
            })
          }

          // Create recruteurs
          if (recruteursToCreate.length > 0) {
            await transaction.organisationRecruteuseCoordinateurs.createMany({
              data: recruteursToCreate.map(({ siret }) => ({
                id: v4(),
                gouvernanceId,
                siret,
              })),
            })
          }

          // Delete removed comites
          if (comitesToDelete.length > 0) {
            await transaction.comiteGouvernance.deleteMany({
              where: {
                id: {
                  in: comitesToDelete,
                },
              },
            })
          }

          // Add comites
          if (comitesToCreate.length > 0) {
            await transaction.comiteGouvernance.createMany({
              data: comitesToCreate.map((comite) => ({
                ...comite,
                id: v4(),
                gouvernanceId,
              })),
            })
          }

          // Update comites
          for (const comiteToUpdate of comitesToUpdate) {
            if (!comiteToUpdate.id) {
              continue
            }
            // eslint-disable-next-line no-await-in-loop
            await transaction.comiteGouvernance.update({
              where: {
                id: comiteToUpdate.id,
              },
              data: comiteToUpdate,
            })
          }

          const updatedGouvernance = await transaction.gouvernance.update({
            where: {
              id: gouvernanceId,
            },
            data: {
              v2Enregistree: gouvernance.v2Enregistree ? undefined : new Date(),
              derniereModificationParId: user.id,
              pasDeCoporteurs,
              sousPrefetReferentPrenom,
              sousPrefetReferentNom,
              sousPrefetReferentEmail,
              noteDeContexte,
            },
            select: gouvernanceSelect,
          })

          return updatedGouvernance
        },
      )

      return mutatedGouvernance
    }),

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
