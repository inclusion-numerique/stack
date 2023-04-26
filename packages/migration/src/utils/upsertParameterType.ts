export type UpsertParameterType<T extends (params: T) => Promise<unknown>> =
  Parameters<T>[0]
