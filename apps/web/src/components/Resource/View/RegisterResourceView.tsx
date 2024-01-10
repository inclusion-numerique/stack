'use client'

import { useEffect } from 'react'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'

/**
 * Client component that triger registerResourceView
 */
const RegisterResourceView = ({ resourceId }: { resourceId: string }) => {
  const { mutate } = trpc.resource.registerView.useMutation()

  useEffect(() => {
    mutate({ resourceId })
  }, [resourceId, mutate])

  return null
}

export default withTrpc(RegisterResourceView)
