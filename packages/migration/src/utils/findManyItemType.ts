export type FindManyItemType<V extends () => Promise<unknown[]>> = Awaited<
  ReturnType<V>
>[0]
