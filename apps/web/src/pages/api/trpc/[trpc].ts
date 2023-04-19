import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@lb/web/server/rpc/rpcRouter'
import { createContext } from '@lb/web/server/rpc/rpcContext'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
