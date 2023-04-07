// TODO this is temporary, for serialization of objects with date to client components
// Later this will be handled by middleware with superjson, like in old next js serverSideProps
// This should also handle partial, and automate this with generic function would be better

type Serialized<T> = {
  [P in keyof T]: T[P] extends Date
    ? string
    : T[P] extends Date | null
    ? string | null
    : Serialized<T[P]>
}
// TODO handle nested arrays
export const serialize = <T extends { [k: string]: unknown }>(
  object: T,
): Serialized<T> =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (value instanceof Date) {
        return [key, value.toISOString()]
      }
      if (
        value !== null &&
        !Array.isArray(value) &&
        typeof value === 'object'
      ) {
        return [key, serialize(value as { [k: string]: unknown })]
      }

      return [key, value]
    }),
  ) as Serialized<T>
