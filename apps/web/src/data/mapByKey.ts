export const mapStructuresByKey = <T>(structures: T[], key: keyof T) => {
  const byKey = new Map<string, T>()
  const missingKey: T[] = []
  const duplicatedKeys = new Map<string, T[]>()

  for (const structure of structures) {
    const value = structure[key]

    if (typeof value !== 'string') {
      missingKey.push(structure)
      continue
    }

    const existing = byKey.get(value)
    if (existing) {
      const duplicated = duplicatedKeys.get(value) ?? [existing]
      duplicated.push(structure)
      duplicatedKeys.set(value, duplicated)
      continue
    }
    byKey.set(value, structure)
  }

  return { byKey, missingKey, duplicatedKeys }
}
