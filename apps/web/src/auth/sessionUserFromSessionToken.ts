import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { serialize } from '@app/web/utils/serialization'

export const sessionUserFromSessionToken = async (
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
    include: { user: true },
  })

  if (!res?.user) {
    return null
  }
  return serialize(res.user)
}
