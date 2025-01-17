import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import {
  rdvServicePublicOAuthConfig,
  rdvServicePublicOAuthTokenEndpoint,
} from '@app/web/rdv-service-public/rdvServicePublicOauth'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { prismaClient } from '@app/web/prismaClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type OAuthTokenResponse = {
  access_token: string // Jeton d'accès pour les requêtes API
  refresh_token?: string // Jeton pour rafraîchir l'accès
  expires_in: number // Durée de validité en secondes
  token_type: string // Type de jeton, généralement "Bearer"
  scope?: string // Scopes accordés
}

/**
 * This is the OAuth callback url route where rdv redirects to after the user has logged in.
 * It is used to get the user's tokens and update his RdvAccount.
 *
 */
export const GET = async (request: NextRequest) => {
  // Fetch the user

  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (!sessionToken || !user) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  // Log all request params
  console.log(
    'Request params',
    Object.fromEntries(request.nextUrl.searchParams.entries()),
  )
  // I should have code and state (for the code workflow)
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')

  if (!code || !state) {
    return NextResponse.json(
      { error: 'Missing code or state parameter' },
      { status: 400 },
    )
  }
  const decodedState = decodeSerializableState(
    state as EncodedState<{ redirectTo?: string }>,
    {},
  )

  // TODO redirect to a specific page telling the result of the connection or error, with another "retour" query parameter
  const redirectTo = decodedState.redirectTo ?? '/coop'

  // Échanger `code` contre access/refresh tokens.
  const tokenResponse = await axios.post<OAuthTokenResponse>(
    rdvServicePublicOAuthTokenEndpoint,
    new URLSearchParams({
      client_id: rdvServicePublicOAuthConfig.clientId,
      client_secret: ServerWebAppConfig.RdvServicePublic.OAuth.clientSecret,
      redirect_uri: rdvServicePublicOAuthConfig.redirectUri,
      code,
      grant_type: 'authorization_code',
    }).toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  )
  const tokens = tokenResponse.data

  // TODO I SHOULD HAVE THE USER ID FROM THE RDV SYSTEM TO CREATE THE RDV ACCOUNT
  const metadata = {}

  // Stocker les tokens pour l'utilisateur en base ou ailleurs.

  const rdvAccount = user.rdvAccount?.id
    ? await prismaClient.rdvAccount.update({
        where: { id: user.rdvAccount.id },
        data: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
          scope: tokens.scope,
          metadata,
        },
        select: {
          id: true,
          accessToken: true,
          refreshToken: true,
          expiresAt: true,
        },
      })
    : await prismaClient.rdvAccount.create({
        data: {
          id: user.id, // TODO USER THE RDV SYSTEM ID OF THE USER (agent)
          userId: user.id,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
          scope: tokens.scope,
          metadata,
        },
        select: {
          id: true,
          accessToken: true,
          refreshToken: true,
          expiresAt: true,
        },
      })

  console.log('Updated rdv account', rdvAccount)

  // Rediriger vers une route de succès ou une page front.

  return NextResponse.redirect(redirectTo)
}
