import TrpcProvider from '@app/web/components/trpc/TrpcProvider'

// HOC for using trpc in a subtree of client components
export const withTrpc =
  <P, C>(component: (properties: P) => C): ((properties: P) => C) =>
  (properties) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const Component = component as any

    return (
      <TrpcProvider>
        <Component {...properties} />
      </TrpcProvider>
    ) as C
  }
