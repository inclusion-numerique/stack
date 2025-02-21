import { proConnectProviderId } from '@app/web/auth/proConnect'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getProconnectIdToken = ({
  id,
  usurper,
}: Pick<SessionUser, 'id' | 'usurper'>): Promise<string | null> =>
  prismaClient.account
    .findFirst({
      where: {
        userId: usurper?.id ?? id,
        provider: proConnectProviderId,
        id_token: { not: null },
      },
      select: {
        id_token: true,
      },
    })
    .then((result) => result?.id_token ?? null)
