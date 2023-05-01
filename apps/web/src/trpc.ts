import 'client-only'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@app/web/server/rpc/appRouter'

export const trpc = createTRPCReact<AppRouter>()
