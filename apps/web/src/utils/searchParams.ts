export const searchParamAsArray = <T extends string = string>(
  param?: string | string[],
): T[] => {
  if (!param) {
    return []
  }
  if (typeof param === 'string') {
    return [param] as T[]
  }
  return param as T[]
}
