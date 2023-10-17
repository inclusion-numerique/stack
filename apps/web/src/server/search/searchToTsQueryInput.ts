export const searchToTsQueryInput = (search?: string | null) => {
  const trimmed = search?.trim() || ''
  if (!trimmed) {
    return null
  }

  // Remove all characters that are not letters, digits, or spaces
  // and include accented characters
  const cleanedInput = trimmed.replaceAll(/[^\s\wÀ-ÖØ-öø-ÿ]/g, '')

  // Split the string into words
  const words = cleanedInput.split(/\s+/)

  // Add prefix search for each word
  // Join these words with the '&' operator
  return words.map((word) => `${word}:*`).join(' & ')
}
