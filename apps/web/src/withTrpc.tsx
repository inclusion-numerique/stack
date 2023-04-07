import 'client-only'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { getServerUrl } from '@stack/web/utils/baseUrl'
import { trpc } from '@stack/web/trpc'
import { FunctionComponentWithChildren } from '@stack/web/utils/componentHelpers'
import { withProvider } from '@stack/web/utils/withProvider'

export const TrpcProvider: FunctionComponentWithChildren = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getServerUrl('/api/trpc')}`,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

// HOC for using trpc in a subtree of client components
export const withTrpc = withProvider(TrpcProvider)
