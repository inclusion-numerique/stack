import type { Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { serializePrismaSessionUser } from '@app/web/auth/serializePrismaSessionUser'

export const sessionUserSelect = {
  id: true,
  email: true,
  phone: true,
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
  checkedProfilInscription: true,
  acceptationCgu: true,
  hasSeenOnboarding: true,
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
          modification: true,
        },
      },
    },
    where: {
      suppression: null,
    },
    orderBy: {
      modification: 'desc',
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
      coordinations: {
        select: {
          coordinateur: {
            select: {
              id: true,
              mediateursCoordonnes: {
                select: {
                  id: true,
                },
              },
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          enActivite: { where: { suppression: null } },
        },
      },
    },
  },
  coordinateur: {
    select: {
      id: true,
      conseillerNumeriqueId: true,
      mediateursCoordonnes: {
        select: {
          mediateurId: true,
        },
      },
    },
  },
} satisfies Prisma.UserSelect

const querySessionUser = async (sessionToken: string) =>
  prismaClient.session.findFirst({
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
        select: sessionUserSelect,
      },
    },
  })

export type PrismaSession = Exclude<
  Awaited<ReturnType<typeof querySessionUser>>,
  null
>

export type PrismaSessionUser = PrismaSession['user']
export type PrismaSessionUsupper = PrismaSession['usurper']

export const getSessionUserFromSessionToken = async (
  sessionToken: string | null,
): Promise<SessionUser | null> => {
  if (!sessionToken) {
    return null
  }

  const res = await querySessionUser(sessionToken)

  if (!res?.user) {
    return null
  }

  return serializePrismaSessionUser(res.user, res.usurper)
}
