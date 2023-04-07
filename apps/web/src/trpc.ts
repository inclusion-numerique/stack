import 'client-only'
import { AppRouter } from '@stack/web/server/rpc/rpcRouter'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()
