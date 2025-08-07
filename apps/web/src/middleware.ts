import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import {
  jobTriggerInfoFromRequest,
  rewriteTriggerToJobEndpoint,
} from '@app/web/jobs/jobTriggerMiddleware'
import {
  isLegacyRequest,
  redirectLegacyPathToCurrentUrl,
} from '@app/web/legacyRedirection/legacyRedirection'
import { output } from '@app/web/utils/output'
import { logRequestEnd, logRequestStart } from '@app/web/utils/requestLogger'
import { type NextRequest, NextResponse } from 'next/server'

const nodeEnvironment = process.env.NODE_ENV
const isProduction = nodeEnvironment === 'production'

const contentSecurityPolicy = `
  default-src 'self' https://matomo.incubateur.anct.gouv.fr https://sentry.incubateur.net;
  script-src 'self' https://matomo.incubateur.anct.gouv.fr 'unsafe-inline' 'unsafe-eval';
  script-src-attr 'none';
  style-src 'self' https: 'unsafe-inline';
  img-src 'self' https://storage.lesbases.anct.gouv.fr data: blob:;
  frame-src https://www.youtube-nocookie.com/;
  object-src 'none';
  connect-src 'self' blob: https://${ServerWebAppConfig.S3.uploadsBucket}.${
    ServerWebAppConfig.S3.host
  } https://${PublicWebAppConfig.ProConnect.hostname} https://matomo.incubateur.anct.gouv.fr https://sentry.incubateur.net https://openmaptiles.geo.data.gouv.fr https://openmaptiles.github.io https://aides-territoires.beta.gouv.fr https://recherche-entreprises.api.gouv.fr https://api-adresse.data.gouv.fr;
  worker-src 'self' blob:;
  font-src 'self' https: data:;
  frame-ancestors 'self' https://matomo.incubateur.anct.gouv.fr;
  form-action 'self';
  base-uri 'self';
  ${isProduction ? 'upgrade-insecure-requests true;' : ''}
`
  .replaceAll(/\s{2,}/g, ' ')
  .trim()

const shouldRedirectToBaseDomain = ({
  baseUrl,
  requestHost,
}: {
  requestHost: string | null
  baseUrl: string | undefined
}) => !!baseUrl && requestHost !== baseUrl

const redirectToBaseDomain = ({
  httpsBase,
  requestUrl,
  requestHost,
}: {
  httpsBase: string
  requestUrl: URL
  requestHost: string | null
}) => {
  const path = `${requestUrl.pathname}${requestUrl.search}`
  const redirectTo = `${httpsBase}${path}`

  output.info(
    `Secondary domain request ${requestHost} - Redirecting to base domain ${redirectTo}`,
  )

  return NextResponse.redirect(redirectTo, { status: 308 })
}

const middleware = async (request: NextRequest) => {
  const startTime = Date.now()
  const requestHost = request.headers.get('host')
  const baseUrl = process.env.BASE_URL ?? ''
  logRequestStart(request)

  const jobTriggerInfo = jobTriggerInfoFromRequest({
    request,
    requestHost,
  })
  if (jobTriggerInfo) {
    const response = rewriteTriggerToJobEndpoint({ baseUrl, request })
    const responseTime = Date.now() - startTime
    logRequestEnd(request, responseTime, response.status)
    return response
  }

  /**
   * Old domain requests redirect to new paths
   */
  if (isLegacyRequest({ requestHost })) {
    const httpsBase = `https://${baseUrl ?? ''}`
    const requestUrl = new URL(request.url)

    const response = await redirectLegacyPathToCurrentUrl({
      httpsBase,
      requestUrl,
    })
    const responseTime = Date.now() - startTime
    logRequestEnd(request, responseTime, response.status)
    return response
  }

  /**
   * If we have different domain pointed to our service, redirect to the base domain by default
   */
  if (shouldRedirectToBaseDomain({ baseUrl, requestHost })) {
    const httpsBase = `https://${baseUrl ?? ''}`
    const requestUrl = new URL(request.url)

    const response = redirectToBaseDomain({
      httpsBase,
      requestUrl,
      requestHost,
    })
    const responseTime = Date.now() - startTime
    logRequestEnd(request, responseTime, response.status)
    return response
  }

  const response = NextResponse.next()

  if (nodeEnvironment === 'development') {
    response.headers.append('Access-Control-Allow-Headers', '*')
    response.headers.append('Access-Control-Allow-Origin', '*')
  }

  response.headers.append('X-Frame-Options', 'DENY')
  response.headers.append('X-Content-Type-Options', 'nosniff')
  response.headers.append('X-XSS-Protection', '1; mode=block')
  response.headers.delete('X-Powered-By')
  response.headers.append('Strict-Transport-Security', 'max-age=63072000')

  response.headers.append('Content-Security-Policy', contentSecurityPolicy)

  const responseTime = Date.now() - startTime
  logRequestEnd(request, responseTime, response.status)

  return response
}

export default middleware
