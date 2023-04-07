import axios from 'axios'

export type SirenCommunitySearchResponse = {
  count: number
  next: null
  previous: null
  results: Etablissement[]
}

export type Etablissement = {
  id: string
  text: string
  name: string
  scale: string
  zipcodes: string[]
}

export const searchCommunity = async (searchQuery: string) => {
  const basequery = `https://aides-territoires.beta.gouv.fr/api/perimeters/?q=${encodeURIComponent(
    `"${searchQuery.trim()}"`,
  )}&is_visible_to_users=true&is_non_obsolete=true`

  const result = await axios.get<SirenCommunitySearchResponse>(basequery, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (result.status !== 200) {
    // TODO Sentry
    throw new Error(
      `Impossible de se connecter au registre SIRENE. Merci de réessayer ultérieurement.`,
    )
  }

  return result.data
}
