import * as trpcNext from '@trpc/server/adapters/next'
import * as Sentry from '@sentry/nextjs'
import { appRouter } from '@app/web/server/rpc/appRouter'
import { createContext } from '@app/web/server/rpc/createContext'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError: ({ error }) => {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('TRPC server error:', error)
      Sentry.captureException(error)
    }
  },
})
