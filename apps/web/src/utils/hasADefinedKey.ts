export const hasADefinedKey =
  <T extends Record<string, unknown>, K extends keyof T>(key: K) =>
  (object: T): object is T & Record<K, Exclude<T[K], null | undefined>> => {
    const value = object[key]
    return value !== undefined && value !== null
  }

export const hasANullishKey =
  <T extends Record<string, unknown>, K extends keyof T>(key: K) =>
  (object: T): object is T & Record<K, Extract<T[K], undefined | null>> => {
    const value = object[key]
    return value === undefined || value === null
  }
