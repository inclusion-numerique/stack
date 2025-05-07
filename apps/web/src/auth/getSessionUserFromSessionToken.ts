import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'

export const sessionUserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  name: true,
  role: true,
  emailVerified: true,
  image: true,
  title: true,
  location: true,
  description: true,
  created: true,
  updated: true,
} satisfies Prisma.UserSelect

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
    },
    include: {
      user: {
        select: sessionUserSelect,
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
  }
}
