import type { Prisma } from '@prisma/client'
import { v4 } from 'uuid'
import {
  GouvernanceForForm,
  gouvernanceSelect,
} from '@app/web/app/(private-with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  ComiteData,
  FeuilleDeRouteData,
  MembreData,
  SiretInfoData,
} from '@app/web/gouvernance/Gouvernance'
import {
  getActorFromCode,
  getMembreModelDataFromActorCode,
  membreToFormMembre,
} from '@app/web/gouvernance/GouvernanceActor'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { notFoundError } from '@app/web/server/rpc/trpcErrors'
import { checkSecurityForGouvernanceMutation } from '@app/web/server/rpc/gouvernance/gouvernanceSecurity'

export const getGouvernanceMutationContext = async ({
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
        const formData = membreToFormMembre(membre)

        return [formData.code, { membre, formData }]
      }),
    ),
  }
}

type GouvernanceMutationContext = Awaited<
  ReturnType<typeof getGouvernanceMutationContext>
>

// Function to upsert SIRET informations
export const upsertSiretInformations = async (
  siretInformations: SiretInfoData[],
  transaction: Prisma.TransactionClient,
): Promise<void> => {
  for (const siretInformation of siretInformations) {
    // eslint-disable-next-line no-await-in-loop
    await transaction.informationsSiret.upsert({
      where: { siret: siretInformation.siret },
      update: { nom: siretInformation.nom },
      create: { siret: siretInformation.siret, nom: siretInformation.nom },
    })
  }
}

// Function to create membres
export const createMembres = async (
  membresToCreate: MembreData[],
  gouvernanceId: string,
  transaction: Prisma.TransactionClient,
): Promise<Map<string, string>> => {
  const membreIdForCode = new Map<string, string>()
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
  return membreIdForCode
}

// Function to update membres
export const updateMembres = async (
  membresToUpdate: (MembreData & { id: string })[],
  membresFormData: GouvernanceMutationContext['membresFormData'],
  gouvernanceId: string,
  transaction: Prisma.TransactionClient,
): Promise<Map<string, string>> => {
  const membreIdForCode = new Map<string, string>()
  for (const membreToUpdate of membresToUpdate) {
    const id = membresFormData.get(membreToUpdate.code)?.membre.id
    if (!id) continue
    membreIdForCode.set(membreToUpdate.code, id)
    const { type } = getActorFromCode(membreToUpdate.code)
    // eslint-disable-next-line no-await-in-loop
    await transaction.membreGouvernance.update({
      where: { id },
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
  return membreIdForCode
}

// Function to delete entities

export const deleteEntities = async (
  entitiesToDelete: string[],
  entityModel:
    | 'comiteGouvernance'
    | 'membreGouvernance'
    | 'organisationRecruteuseCoordinateurs'
    | 'feuilleDeRoute',
  transaction: Prisma.TransactionClient,
): Promise<void> => {
  if (entitiesToDelete.length > 0) {
    await (
      transaction[entityModel]
        .deleteMany as Prisma.TransactionClient['feuilleDeRoute']['deleteMany']
    )({
      where: { id: { in: entitiesToDelete } },
    })
  }
}
// Function to create organisationsRecruteusesCoordinateurs
export const createOrganisationsRecruteusesCoordinateurs = async (
  recruteursToCreate: SiretInfoData[],
  gouvernanceId: string,
  transaction: Prisma.TransactionClient,
): Promise<void> => {
  for (const recruteur of recruteursToCreate) {
    // eslint-disable-next-line no-await-in-loop
    await transaction.organisationRecruteuseCoordinateurs.create({
      data: {
        gouvernanceId,
        siret: recruteur.siret,
        // Add other necessary fields here
      },
    })
  }
}

// Function to delete organisationsRecruteusesCoordinateurs
export const deleteOrganisationsRecruteusesCoordinateurs = async (
  recruteursToDelete: string[],
  transaction: Prisma.TransactionClient,
): Promise<void> => {
  if (recruteursToDelete.length > 0) {
    await transaction.organisationRecruteuseCoordinateurs.deleteMany({
      where: { id: { in: recruteursToDelete } },
    })
  }
}

// Function to create comites
export const createComites = async (
  comitesToCreate: ComiteData[],
  gouvernanceId: string,
  transaction: Prisma.TransactionClient,
): Promise<void> => {
  if (comitesToCreate.length > 0) {
    await transaction.comiteGouvernance.createMany({
      data: comitesToCreate.map((comite) => ({
        ...comite,
        id: v4(),
        gouvernanceId,
      })),
    })
  }
}

// Function to update comites
export const updateComites = async (
  comitesToUpdate: (ComiteData & { id: string })[],
  transaction: Prisma.TransactionClient,
): Promise<void> => {
  for (const comiteToUpdate of comitesToUpdate) {
    if (!comiteToUpdate.id) continue
    // eslint-disable-next-line no-await-in-loop
    await transaction.comiteGouvernance.update({
      where: { id: comiteToUpdate.id },
      data: comiteToUpdate,
    })
  }
}

// Function to create feuilles de route
export const createFeuillesDeRoute = async (
  feuillesDeRouteToCreate: FeuilleDeRouteData[],
  gouvernanceId: string,
  membreIdForCode: Map<string, string>,
  gouvernance: GouvernanceForForm,
  transaction: Prisma.TransactionClient,
): Promise<void> => {
  for (const feuilleToCreate of feuillesDeRouteToCreate) {
    const porteurMembreId = feuilleToCreate.porteur
      ? membreIdForCode.get(feuilleToCreate.porteur.code)
      : undefined

    // eslint-disable-next-line no-await-in-loop
    await transaction.feuilleDeRoute.create({
      data: {
        id: v4(),
        gouvernanceId,
        nom: feuilleToCreate.nom,
        contratPreexistant: feuilleToCreate.contratPreexistant === 'oui',
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
          feuilleToCreate.perimetreScope === 'epci' &&
          feuilleToCreate.perimetreEpciCodes.length > 0
            ? {
                createMany: {
                  data: feuilleToCreate.perimetreEpciCodes.map((epciCode) => ({
                    epciCode,
                  })),
                },
              }
            : undefined,
        membres: porteurMembreId
          ? {
              create: {
                id: v4(),
                role: 'Porteur',
                membreId: porteurMembreId,
              },
            }
          : undefined,
      },
    })
  }
}

// Function to update feuilles de route
export const updateFeuillesDeRoute = async (
  feuillesDeRouteToUpdate: (FeuilleDeRouteData & { id: string })[],
  membreIdForCode: Map<string, string>,
  gouvernance: GouvernanceForForm,
  transaction: Prisma.TransactionClient,
): Promise<void> => {
  for (const feuilleToUpdate of feuillesDeRouteToUpdate) {
    const porteurMembreId = feuilleToUpdate.porteur
      ? membreIdForCode.get(feuilleToUpdate.porteur.code)
      : undefined

    // Delete and recreate perimetreEpcis
    // eslint-disable-next-line no-await-in-loop
    await transaction.perimetreEpciFeuilleDeRoute.deleteMany({
      where: { feuilleDeRouteId: feuilleToUpdate.id },
    })

    // Delete and recreate membres
    // eslint-disable-next-line no-await-in-loop
    await transaction.membreFeuilleDeRoute.deleteMany({
      where: { feuilleDeRouteId: feuilleToUpdate.id },
    })

    // eslint-disable-next-line no-await-in-loop
    await transaction.feuilleDeRoute.update({
      where: { id: feuilleToUpdate.id },
      data: {
        nom: feuilleToUpdate.nom,
        contratPreexistant: feuilleToUpdate.contratPreexistant === 'oui',
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
          feuilleToUpdate.perimetreScope === 'epci' &&
          feuilleToUpdate.perimetreEpciCodes.length > 0
            ? {
                createMany: {
                  data: feuilleToUpdate.perimetreEpciCodes.map((epciCode) => ({
                    epciCode,
                  })),
                },
              }
            : {
                deleteMany: {},
              },
        membres: porteurMembreId
          ? {
              create: {
                id: v4(),
                role: 'Porteur',
                membreId: porteurMembreId,
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
  }
}
