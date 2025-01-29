// @app/web/app/api/v1/serializeApiRequestParams.ts

export const serializeApiRequestParams = (
  input: Record<string, unknown>,
): string => {
  const buildQueryParams = (value: unknown, keyPrefix = ''): string[] => {
    if (Array.isArray(value)) {
      // handle array
      return value.flatMap((item) => {
        // if the item is an object (not an array), recurse with currentKey + "[]"
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          return buildQueryParams(item, `${keyPrefix}[]`)
        }
        // otherwise, append scalar or sub-array items directly
        return `${keyPrefix}[]=${encodeURIComponent(String(item))}`
      })
    }
    if (value && typeof value === 'object') {
      // handle nested object
      return Object.entries(value).flatMap(([subKey, subValue]) => {
        const newPrefix = keyPrefix ? `${keyPrefix}[${subKey}]` : subKey
        return buildQueryParams(subValue, newPrefix)
      })
    }
    if (value === undefined || value === null) {
      // skip undefined or null
      return []
    }
    // handle scalar
    return [`${keyPrefix}=${encodeURIComponent(String(value))}`]
  }

  // flatten the object into an array of query strings
  const result: string[] = []
  for (const [key, value] of Object.entries(input)) {
    result.push(...buildQueryParams(value, key))
  }

  // join them with '&'
  return result.join('&')
}
