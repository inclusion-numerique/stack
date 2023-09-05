// Function to remove accents from a string
const removeAccents = (string_: string): string =>
  string_.normalize('NFD').replaceAll(/[\u0300-\u036F]/g, '')

// Function to remove special characters from a string
const removeSpecialCharacters = (string_: string): string =>
  string_.replaceAll(/[^\dA-Za-z]/g, '')

// Function to transform a string into a searchable string
// E.g : "Château-neuf d'Hières" => "chateauneufdhieres"
export const transformStringToSearchableString = (value: string): string => {
  // Convert to lowercase
  const lowerCaseString = value.toLowerCase()

  // Remove accents
  const noAccentsString = removeAccents(lowerCaseString)

  // Remove special characters
  return removeSpecialCharacters(noAccentsString)
}
