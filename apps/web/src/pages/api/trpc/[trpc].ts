import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@app/web/server/rpc/rpcRouter'
import { createContext } from '@app/web/server/rpc/rpcContext'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
