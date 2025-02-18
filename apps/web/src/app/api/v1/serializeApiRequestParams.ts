export const serializeApiRequestParams = (
  input: Record<string, unknown>,
): string => {
  const buildQueryParams = (value: unknown, keyPrefix = ''): string[] => {
    if (Array.isArray(value)) {
      // si le tableau est composé uniquement de valeurs scalaires, on les joint avec des virgules
      const isScalarArray = value.every(
        (item) =>
          item === null || item === undefined || typeof item !== 'object',
      )
      if (isScalarArray) {
        const filtered = value.filter(
          (item) => item !== undefined && item !== null,
        )
        if (filtered.length === 0) return []
        const joined = filtered
          .map((item) => encodeURIComponent(String(item)))
          .join(',')
        return [`${keyPrefix}=${joined}`]
      }
      // sinon, on traite chaque élément individuellement en ajoutant des crochets
      return value.flatMap((item) => buildQueryParams(item, `[${keyPrefix}]`))
    }
    if (value && typeof value === 'object') {
      // gestion des objets imbriqués
      return Object.entries(value).flatMap(([subKey, subValue]) => {
        const newPrefix = keyPrefix ? `${keyPrefix}[${subKey}]` : subKey
        return buildQueryParams(subValue, newPrefix)
      })
    }
    if (value === undefined || value === null) {
      // on ignore les valeurs undefined ou null
      return []
    }
    // gestion des scalaires
    return [`${keyPrefix}=${encodeURIComponent(String(value))}`]
  }

  const result: string[] = []
  for (const [key, value] of Object.entries(input)) {
    result.push(...buildQueryParams(value, key))
  }
  return result.join('&')
}
