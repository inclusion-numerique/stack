import { create } from 'zustand'
import { QueryClient } from '@tanstack/react-query'
import {
  CreateTRPCClientOptions,
  httpBatchLink,
  loggerLink,
} from '@trpc/client'
import { AppRouter } from '@app/web/server/rpc/appRouter'
import { trpc } from '@app/web/trpc'
import { transformer } from '@app/web/utils/serialization'

const clientOptions: CreateTRPCClientOptions<AppRouter> = {
  links: [
    loggerLink({
      enabled: (options) =>
        process.env.NODE_ENV === 'development' ||
        (options.direction === 'down' && options.result instanceof Error),
    }),
    httpBatchLink({
      transformer,
      url: '/api/trpc',
    }),
  ],
}

export const queryClient = new QueryClient()
export const trpcClient = trpc.createClient(clientOptions)

export const useTrpcClient = create(() => ({
  queryClient,
  trpcClient,
}))
