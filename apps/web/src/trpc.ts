import type { AppRouter } from '@app/web/server/rpc/appRouter'
import { createTRPCReact } from '@trpc/react-query'
import 'client-only'

export const trpc = createTRPCReact<AppRouter>()
