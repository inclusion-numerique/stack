import 'client-only'
import { AppRouter } from '@lb/web/server/rpc/rpcRouter'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()
