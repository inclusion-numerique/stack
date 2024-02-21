import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@app/web/server/rpc/appRouter'
import { createContext } from '@app/web/server/rpc/createContext'

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext,
  })
export { handler as GET, handler as POST }
