import { NextRequest } from 'next/server'

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
