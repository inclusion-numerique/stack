export const apiAdresseEndpoint =
  'https://api-adresse.data.gouv.fr/search/?q=4%20B%20Rue%20Burais%2069100%20Villeurbanne'

export type FeatureCollection = {
  type: 'FeatureCollection' // Type de la collection de fonctionnalités
  version: string // Version de la collection de fonctionnalités
  features: Array<Feature> // Liste des fonctionnalités
  attribution: string // Attribution de la source des données
  licence: string // Licence des données
  query: string // Requête initiale
  limit: number // Limite des résultats
}

export type Feature = {
  type: 'Feature' // Type de la fonctionnalité
  geometry: Geometry // Géométrie de la fonctionnalité
  properties: Properties // Propriétés de la fonctionnalité
}

export type Geometry = {
  type: 'Point' // Type de la géométrie
  coordinates: [number, number] // Coordonnées géographiques (longitude, latitude)
}

export type Properties = {
  label: string // Adresse complète
  score: number // Score de correspondance
  housenumber: string // Numéro de la maison
  id: string // Identifiant unique
  type: string // Type de la fonctionnalité (e.g., "housenumber")
  name: string // Nom de la rue avec le numéro de la maison
  postcode: string // Code postal
  citycode: string // Code INSEE de la ville
  x: number // Coordonnée X (projection)
  y: number // Coordonnée Y (projection)
  city: string // Nom de la ville
  context: string // Contexte géographique (e.g., département, région)
  importance: number // Importance de la correspondance
  street: string // Nom de la rue
}

export const searchAdresse = async (
  adresse: string,
): Promise<Feature | null> => {
  const url = new URL(apiAdresseEndpoint)
  url.searchParams.append('q', adresse)
  url.searchParams.append('limit', '1')
  url.searchParams.append('autocomplete', '0')

  const response = await fetch(url.toString())
  const body = (await response.json()) as FeatureCollection

  return body.features.at(0) ?? null
}
