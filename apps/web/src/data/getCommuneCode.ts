// Lowercase name

import { createSlug } from '@app/web/utils/createSlug'

export const createCodePostalIndex = () => {
  const index = new Map<string, { nom: string; code: string }[]>()

  const add = (codePostal: string, commune: { nom: string; code: string }) => {
    const existing = index.get(codePostal)

    const nom = createSlug(commune.nom)
    const { code } = commune

    if (!existing) {
      index.set(codePostal, [{ nom, code }])
      return
    }
    existing.push({ nom, code })
  }

  return {
    get: index.get.bind(index),
    has: index.has.bind(index),
    add,
  }
}
export type CodePostalIndex = ReturnType<typeof createCodePostalIndex>

/**
 * From manually getting errors and searching
 * Errored postal code to real postal code
 */
const manuallyCleanedPostalCodes = {
  '43102': {
    Brioude: '43100',
  },
  '57250': {
    Dabo: '57850',
  },
} as Record<string, Record<string, string>>

/**
 * From manually getting errors and searching
 * Errored commune name to real name
 */
const manuallyCleanedNames = {
  '62340': {
    ARDRES: 'andres',
  },
  '14260': {
    'AUNAY-SUR-ODON': "Les monts d'Aunay",
  },
} as Record<string, Record<string, string>>

export const getCommuneCode = (
  commune: {
    nom: string
    codePostal: string
  },
  index: CodePostalIndex,
  throwIfNotFound = true,
) => {
  const cleanedCodePostal =
    commune.codePostal in manuallyCleanedPostalCodes &&
    commune.nom in manuallyCleanedPostalCodes[commune.codePostal]
      ? manuallyCleanedPostalCodes[commune.codePostal][commune.nom]
      : commune.codePostal

  const cleanedName =
    cleanedCodePostal in manuallyCleanedNames &&
    commune.nom in manuallyCleanedNames[cleanedCodePostal]
      ? manuallyCleanedNames[cleanedCodePostal][commune.nom]
      : commune.nom

  const candidates = index.get(cleanedCodePostal)
  if (!candidates) {
    if (throwIfNotFound) {
      console.error(
        'No candidates for code postal',
        commune.nom,
        commune.codePostal,
        cleanedCodePostal,
      )
      throw new Error('Missing code postal')
    }
    return null
  }

  // If there is only one postal code, we return the insee code
  if (candidates.length === 1) {
    return candidates[0].code
  }

  const searchName = createSlug(cleanedName)
  const alternativeSearchName = searchName.startsWith('saint-')
    ? searchName.replace('saint-', 'st-')
    : searchName.startsWith('st-')
    ? searchName.replace('st-', 'saint-')
    : null

  // We try to find matching name for the list of communes with same postal code
  const found = candidates.find(({ nom }) => nom === searchName)
  if (found) {
    return found.code
  }

  if (alternativeSearchName) {
    const alternativeFound = candidates.find(
      ({ nom }) => nom === alternativeSearchName,
    )
    if (alternativeFound) {
      return alternativeFound.code
    }
  }

  if (throwIfNotFound) {
    console.error('Could not match commune with postal code index', {
      commune,
      candidates,
      searchName,
      alternative: alternativeSearchName,
    })
    throw new Error('Could not match commune with postal code index')
  }
  return null
}
