import { useEffect, useState } from 'react'
import { SessionUser } from '@app/web/auth/sessionUser'
import { trpc } from '@app/web/trpc'

/**
 *  This hook checks if the user has an OAuth token for RDV
 *  It can only be used in a component using withTrpc()
 */
export const useRdvOauthStatus = ({
  user,
}: {
  user: Pick<SessionUser, 'rdvAccount'> | null
}) => {
  const oauthApiCallMutation = trpc.rdvServicePublic.oAuthApiMe.useMutation()
  const hasOauthTokens = user?.rdvAccount?.hasOauthTokens ?? false

  const [status, setStatus] = useState<
    'loading' | 'success' | 'empty' | 'error'
  >(hasOauthTokens ? 'loading' : 'empty')

  useEffect(() => {
    if (!hasOauthTokens || oauthApiCallMutation.isPending) return
    // eslint-disable-next-line promise/catch-or-return
    oauthApiCallMutation
      .mutateAsync({
        endpoint: '/agents/me',
        data: undefined,
      })
      .then((result) => {
        if (result?.agent?.id) {
          return 'success' as const
        }
        return 'empty' as const
      })
      .catch(() => 'error' as const)
      // eslint-disable-next-line promise/always-return
      .then((result) => {
        setStatus(result)
      })

    return () => {
      oauthApiCallMutation.reset()
    }
  }, [hasOauthTokens])

  return {
    status,
    isLoading: status === 'loading',
    isError: status === 'error',
    isEmpty: status === 'empty',
    isSuccess: status === 'success',
  }
}
