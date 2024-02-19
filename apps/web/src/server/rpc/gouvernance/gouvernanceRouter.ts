import type { Prisma } from '@prisma/client'
import { v4 } from 'uuid'
import sanitizeHtml from 'sanitize-html'
import { gouvernanceSelect } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  getInfoFromPorteurCode,
  GouvernancePressentieValidation,
} from '@app/web/gouvernance/GouvernancePressentie'
import { prismaClient } from '@app/web/prismaClient'
import { invalidError, notFoundError } from '@app/web/server/rpc/trpcErrors'
import { GouvernanceIdValidation } from '@app/web/gouvernance/GouvernanceIdValidation'
import {
  CreateGouvernanceValidation,
  GouvernanceValidation,
  SiretInfoData,
} from '@app/web/gouvernance/Gouvernance'
import { getActorFromCode } from '@app/web/gouvernance/GouvernanceActor'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { hasADefinedKey, hasANullishKey } from '@app/web/utils/hasADefinedKey'
import {
  createComites,
  createFeuillesDeRoute,
  createMembres,
  createOrganisationsRecruteusesCoordinateurs,
  deleteEntities,
  deleteOrganisationsRecruteusesCoordinateurs,
  getGouvernanceMutationContext,
  updateComites,
  updateFeuillesDeRoute,
  updateMembres,
  upsertSiretInformations,
} from '@app/web/server/rpc/gouvernance/updateGouvernanceV2'
import { checkSecurityForGouvernanceMutation } from '@app/web/server/rpc/gouvernance/gouvernanceSecurity'

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

      // Logic to construct siretInformationsToUpsert
      const siretInformationsToUpsert: SiretInfoData[] = [
        ...recruteursCoordinateurs.map(({ siret, nom }) => ({
          siret,
          nom,
        })),
        ...membres
          .map(({ code, nom }) => ({ nom, actor: getActorFromCode(code) }))
          .filter(({ actor }) => actor.type === 'structure')
          .map(({ nom, actor }) => ({
            siret: actor.code || `__sans-siret__${nom}`,
            nom,
          })),
      ].reduce<SiretInfoData[]>((accumulator, siretInformation) => {
        if (
          !accumulator.some(({ siret }) => siret === siretInformation.siret)
        ) {
          accumulator.push(siretInformation)
        }
        return accumulator
      }, [])

      const membresToDelete = [...membresFormData.keys()]
        .filter((code) => !membres.some((membre) => membre.code === code))
        .map((code) => membresFormData.get(code)?.membre.id)
        .filter(isDefinedAndNotNull)

      const membresToUpdate = membres.filter(
        (membre): membre is typeof membre & { id: string } =>
          membresFormData.has(membre.code),
      )

      // Logic to construct recruteursToDelete
      const recruteursToDelete =
        gouvernance.organisationsRecruteusesCoordinateurs
          .filter(
            ({ siretInformations }) =>
              !recruteursCoordinateurs.some(
                ({ siret }) => siret === siretInformations.siret,
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

      // Logic to construct feuillesDeRouteToDelete
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

      // Logic to construct comitesToDelete
      const comitesToDelete = gouvernance.comites
        .filter(({ id }) => !comites.some((comite) => comite.id === id))
        .map(({ id }) => id)

      const comitesToCreate = comites.filter(hasANullishKey('id'))
      const comitesToUpdate = comites.filter(hasADefinedKey('id'))

      const mutatedGouvernance = await prismaClient.$transaction(
        async (transaction) => {
          // Upsert Siret Informations
          await upsertSiretInformations(siretInformationsToUpsert, transaction)

          // Create and Update Membres
          const createdMembreIdsForCode = await createMembres(
            membresToCreate,
            gouvernanceId,
            transaction,
          )
          const membreIdForCode = new Map<string, string>([
            ...[...membresFormData.entries()].map(
              ([code, { membre }]): [string, string] => [code, membre.id],
            ),
            ...createdMembreIdsForCode.entries(),
          ])
          await updateMembres(
            membresToUpdate,
            membresFormData,
            gouvernanceId,
            transaction,
          )

          // Delete Entities
          await deleteEntities(
            membresToDelete,
            'membreGouvernance',
            transaction,
          )
          await deleteEntities(
            recruteursToDelete,
            'organisationRecruteuseCoordinateurs',
            transaction,
          )
          await deleteEntities(
            feuillesDeRouteToDelete,
            'feuilleDeRoute',
            transaction,
          )
          await deleteEntities(
            comitesToDelete,
            'comiteGouvernance',
            transaction,
          )

          // Create and Update Comites
          await createComites(comitesToCreate, gouvernanceId, transaction)
          await updateComites(comitesToUpdate, transaction)

          await createOrganisationsRecruteusesCoordinateurs(
            recruteursToCreate,
            gouvernanceId,
            transaction,
          )
          await deleteOrganisationsRecruteusesCoordinateurs(
            recruteursToDelete,
            transaction,
          )

          // Create and Update Feuilles de Route
          await createFeuillesDeRoute(
            feuillesDeRouteToCreate,
            gouvernanceId,
            membreIdForCode,
            gouvernance,
            transaction,
          )
          await updateFeuillesDeRoute(
            feuillesDeRouteToUpdate,
            membreIdForCode,
            gouvernance,
            transaction,
          )

          // Update gouvernance details
          const updatedGouvernance = await transaction.gouvernance.update({
            where: { id: gouvernanceId },
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
