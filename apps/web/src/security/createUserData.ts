import * as Sentry from '@sentry/nextjs'
import { MonCompteProProfile } from '@app/web/auth/monCompteProConnect'
import { prismaClient } from '@app/web/prismaClient'
import { qualifyPrefectureOrganization } from '@app/web/security/prefectureOrganization'

export const createUserData = async (userInfo: MonCompteProProfile) => {
  // Get existing checked organization
  const existingOrganizations = await Promise.all(
    userInfo.organizations.map(({ id }) =>
      prismaClient.userOrganization.findUnique({
        where: { monCompteProId: id },
      }),
    ),
  )

  const organizations = userInfo.organizations.map(
    (monCompteProOrganization, index) => ({
      monCompteProOrganization,
      existingOrganization: existingOrganizations[index],
    }),
  )

  const checkedOrganizations = await Promise.all(
    organizations.map(
      async ({ existingOrganization, monCompteProOrganization }) => {
        if (
          !existingOrganization ||
          !existingOrganization.prefectureCheckedAt
        ) {
          const { id: monCompteProId, ...qualified } =
            await qualifyPrefectureOrganization(monCompteProOrganization)

          return prismaClient.userOrganization.upsert({
            where: { monCompteProId: monCompteProOrganization.id },
            update: {
              ...qualified,
            },
            create: {
              monCompteProId,
              ...qualified,
            },
          })
        }
        return existingOrganization
      },
    ),
  ).catch((error) => {
    Sentry.captureException(error)
    throw error
  })

  let prefetOfDepartement: string | null = null

  // Find if user is in a prefecture
  for (const organization of checkedOrganizations) {
    if (organization.isDepartementPrefecture) {
      prefetOfDepartement = organization.isDepartementPrefecture
    }
  }

  return {
    ...userInfo,
    role: prefetOfDepartement ? 'PrefectureDepartement' : 'User',
    roleScope: prefetOfDepartement,
    gouvernancePersona: null,
    organizations: {
      connect: checkedOrganizations.map(({ monCompteProId }) => ({
        monCompteProId,
      })),
    },
  }
}
