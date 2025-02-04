type NoUndefinedField<T> = {
  [P in keyof T]-?: T[P] extends Record<string, unknown>
    ? NoUndefinedField<T[P]>
    : Exclude<T[P], undefined>
}

export const removeUndefinedValues = <T>(data: T): NoUndefinedField<T> => {
  if (Array.isArray(data)) {
    return data.map((item) =>
      removeUndefinedValues(item),
    ) as unknown as NoUndefinedField<T>
  }
  if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).reduce(
        (accumulator, [key, value]) => {
          if (value !== undefined) {
            accumulator.push([key, removeUndefinedValues(value)])
          }
          return accumulator
        },
        [] as [string, unknown][],
      ),
    ) as NoUndefinedField<T>
  }
  return data as NoUndefinedField<T>
}
