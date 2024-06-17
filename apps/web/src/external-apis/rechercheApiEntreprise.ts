/* eslint @typescript-eslint/no-redundant-type-constituents: 0 */

import { UniteLegale } from '@app/web/external-apis/apiEntrepriseApiModels'

const rechercheApiEntrepriseEndpoint =
  'https://recherche-entreprises.api.gouv.fr/search'

// See https://recherche-entreprises.api.gouv.fr/docs/#tag/Recherche-textuelle/paths/~1search/get

export type RechercheApiEntrepriseQueryParams = {
  q: string // Recherche textuelle
  activite_principale?: string
  categorie_entreprise?: 'PME' | 'ETI' | string
  code_collectivite_territoriale?: string
  convention_collective_renseignee?: boolean
  code_postal?: string
  code_commune?: string
  departement?: string
  region?: string
  epci?: string
  egapro_renseignee?: boolean
  est_association?: boolean
  est_bio?: boolean
  est_collectivite_territoriale?: boolean
  est_entrepreneur_individuel?: boolean
  est_entrepreneur_spectacle?: boolean
  est_ess?: boolean
  est_finess?: boolean
  est_organisme_formation?: boolean
  est_qualiopi?: boolean
  est_rge?: boolean
  est_siae?: boolean
  est_service_public?: boolean
  est_societe_mission?: boolean
  est_uai?: boolean
  etat_administratif?: 'A' | 'C'
  id_convention_collective?: string
  id_finess?: string
  id_rge?: string
  id_uai?: string
  nature_juridique?: string
  section_activite_principale?: string
  tranche_effectif_salarie?: string
  nom_personne?: string
  prenoms_personne?: string
  date_naissance_personne_min?: string // format YYYY-MM-DD
  date_naissance_personne_max?: string // format YYYY-MM-DD
  type_personne?: 'dirigeant' | 'elu'
  ca_min?: number
  ca_max?: number
  resultat_net_min?: number
  resultat_net_max?: number
  limite_matching_etablissements?: number
  minimal?: boolean
  include?:
    | 'complements'
    | 'dirigeants'
    | 'finances'
    | 'matching_etablissements'
    | 'siege'
    | 'score'
    | string
  page?: number
  per_page?: number
}

export type RechercheApiResponse = {
  results: UniteLegale[] // Array contenant les unités légales
  total_results: number // Nombre total de résultats
  page: number // Numéro de la page actuelle (par défaut : 1)
  per_page: number // Nombre de résultats par page (limité à 25)
  total_pages: number // Nombre total de pages
}

// TODO convert query params to url search params (booleans must be "false" or "true")

const convertQueryParams = (queryParams: RechercheApiEntrepriseQueryParams) => {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined) {
      continue
    }

    if (typeof value === 'boolean') {
      searchParams.append(key, value ? 'true' : 'false')
    } else if (typeof value === 'number') {
      searchParams.append(key, value.toString())
    } else {
      searchParams.append(key, value)
    }
  }

  return searchParams
}

export const rechercheApiEntreprise = async (
  queryParams: RechercheApiEntrepriseQueryParams,
): Promise<RechercheApiResponse> => {
  const queryUrl = `${rechercheApiEntrepriseEndpoint}?${convertQueryParams(queryParams).toString()}`

  const response = await fetch(queryUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch API: ${response.statusText}`)
  }

  return response.json() as Promise<RechercheApiResponse>
}

export const openEtablissementsFromUniteLegale = ({
  siren,
  nom_raison_sociale,
  matching_etablissements,
  complements,
}: UniteLegale) =>
  matching_etablissements
    .filter((etablissement) => etablissement.etat_administratif === 'A')
    .map((etablissement) => ({
      ...etablissement,
      siren,
      nom_raison_sociale,
      complements,
    }))
