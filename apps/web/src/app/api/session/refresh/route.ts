import { NextRequest } from 'next/server'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { prismaClient } from '@app/web/prismaClient'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { proConnectProviderId } from '@app/web/auth/proConnect'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const POST = async (request: NextRequest) => {
  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (!sessionToken || !user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const proConnectAccount = await prismaClient.account.findFirst({
    where: {
      userId: user.usurper?.id ?? user.id,
      provider: proConnectProviderId,
    },
    select: {
      access_token: true,
      refresh_token: true,
      expires_at: true,
    },
  })

  if (
    proConnectAccount &&
    (proConnectAccount.expires_at ?? 0) * 1000 < Date.now()
  ) {
    // Refresh the proconnect account tokens

    const response = await fetch(
      `https://${PublicWebAppConfig.ProConnect.hostname}/api/v2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': proConnectAccount.access_token ?? '',
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: proConnectAccount.refresh_token,
        }),
      },
    )
  }

  return new Response('OK', { status: 200 })
}
