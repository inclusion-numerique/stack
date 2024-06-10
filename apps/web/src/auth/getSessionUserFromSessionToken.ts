import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getSessionUserFromSessionToken = async (
  sessionToken: string | null,
): Promise<SessionUser | null> => {
  if (!sessionToken) {
    return null
  }

  const res = await prismaClient.session.findFirst({
    where: {
      sessionToken,
      expires: { gt: new Date() },
      user: {
        deleted: null,
      },
    },
    include: {
      usurper: {
        select: {
          id: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          name: true,
          emailVerified: true,
          image: true,
          title: true,
          location: true,
          description: true,
          created: true,
          updated: true,
          role: true,
          isFixture: true,
          profilInscription: true,
          structureEmployeuseRenseignee: true,
          lieuxActiviteRenseignes: true,
          inscriptionValidee: true,
          emplois: {
            select: {
              id: true,
              structure: {
                select: {
                  id: true,
                  nom: true,
                  codePostal: true,
                  commune: true,
                },
              },
            },
            where: {
              suppression: null,
            },
          },
          mediateur: {
            select: {
              id: true,
              conseillerNumerique: {
                select: {
                  id: true,
                },
              },
            },
          },
          coordinateur: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  })

  if (!res?.user) {
    return null
  }

  return {
    ...res.user,
    created: res.user.created.toISOString(),
    updated: res.user.updated.toISOString(),
    emailVerified: res.user.emailVerified?.toISOString() ?? null,
    inscriptionValidee: res.user.inscriptionValidee?.toISOString() ?? null,
    structureEmployeuseRenseignee:
      res.user.structureEmployeuseRenseignee?.toISOString() ?? null,
    lieuxActiviteRenseignes:
      res.user.lieuxActiviteRenseignes?.toISOString() ?? null,
    usurper: res.usurper,
  }
}
