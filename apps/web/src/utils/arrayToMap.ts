export const arrayToMap = <T extends object, K extends keyof T>(
  array: T[],
  key: K,
): Map<T[K], T> => {
  const map = new Map<T[K], T>()
  for (const item of array) {
    map.set(item[key], item)
  }
  return map
}
