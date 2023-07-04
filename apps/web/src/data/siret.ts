export const isValidSiret = (value: string | null | undefined) => {
  if (!value) {
    return false
  }

  return value.length === 14 && value !== '00000000000000'
}

export const isValidSiren = (value: string | null | undefined) => {
  if (!value) {
    return false
  }

  return value.length === 9 && value !== '000000000'
}

export const getSirenFromSiret = (value: string | null | undefined) => {
  if (!value) {
    return null
  }
  if (isValidSiren(value)) {
    return value
  }
  if (isValidSiret(value)) {
    return value.slice(0, 9)
  }

  return null
}

export const mapStructuresBySiret = <T>(structures: T[], siretKey: keyof T) => {
  const bySiret = new Map<string, T>()
  const missingSiret: T[] = []
  const duplicatedSirets = new Map<string, T[]>()

  for (const structure of structures) {
    const siret = structure[siretKey]

    if (typeof siret !== 'string' || !isValidSiret(siret)) {
      missingSiret.push(structure)
      continue
    }

    const existing = bySiret.get(siret)
    if (existing) {
      const duplicated = duplicatedSirets.get(siret) ?? [existing]
      duplicated.push(structure)
      duplicatedSirets.set(siret, duplicated)
      continue
    }
    bySiret.set(siret, structure)
  }

  return { bySiret, missingSiret, duplicatedSirets }
}
