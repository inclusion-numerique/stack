import { NextRequest, NextResponse } from 'next/server'
import { executeJobApiTokenHeader } from '@app/web/app/api/jobs/executeJobApiTokenHeader'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

// svc.cluster.local is the default domain for services in a Kubernetes cluster
const triggerHostName = 'svc.cluster.local'

export const jobTriggerInfoFromRequest = ({
  request,
  requestHost,
}: {
  request: NextRequest
  requestHost: string | null
}) => {
  if (request.method !== 'POST') {
    return null
  }
  if (!requestHost || !requestHost.endsWith(triggerHostName)) {
    return null
  }

  return true
}

export const rewriteTriggerToJobEndpoint = ({
  request,
  baseUrl,
}: {
  request: NextRequest
  baseUrl: string
}) => {
  request.headers.set(
    executeJobApiTokenHeader,
    ServerWebAppConfig.internalApiPrivateKey,
  )
  return NextResponse.rewrite(`https://${baseUrl}/api/jobs`, {
    request,
  })
}
