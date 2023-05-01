import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@app/web/server/rpc/appRouter'
import { createContext } from '@app/web/server/rpc/createContext'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
