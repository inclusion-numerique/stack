export const getSearchTokens = (searchQuery?: string) =>
  searchQuery
    ?.replaceAll(/[\u0300-\u036F]/g, '')
    .normalize('NFD')
    .split(' ')
    .map((token) => token.toLowerCase().trim())
    .filter(Boolean)
