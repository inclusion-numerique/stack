export const isDefinedAndNotNull = <T>(
  value: T | null | undefined,
): value is T => value !== null
