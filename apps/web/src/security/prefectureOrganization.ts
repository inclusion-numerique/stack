import axios from 'axios'
import { MonCompteProOrganization } from '@app/web/auth/monCompteProConnect'

type Siege = {
  activite_principale: string
  activite_principale_registre_metier: null | string
  adresse: string
  cedex: null | string
  code_pays_etranger: null | string
  code_postal: string
  commune: string
  complement_adresse: null | string
  coordonnees: string
  date_creation: string
  date_debut_activite: string
  departement: string
  distribution_speciale: null | string
  est_siege: boolean
  etat_administratif: string
  geo_adresse: string
  geo_id: string
  indice_repetition: null | string
  latitude: string
  libelle_cedex: null | string
  libelle_commune: string
  libelle_commune_etranger: null | string
  libelle_pays_etranger: null | string
  libelle_voie: string
  liste_enseignes: null | string
  liste_finess: null | string
  liste_id_bio: null | string
  liste_idcc: null | string
  liste_id_organisme_formation: null | string
  liste_rge: null | string
  liste_uai: null | string
  longitude: string
  nom_commercial: null | string
  numero_voie: string
  siret: string
  tranche_effectif_salarie: string
  type_voie: string
}

interface Complements {
  collectivite_territoriale: null | string
  convention_collective_renseignee: boolean
  egapro_renseignee: boolean
  est_bio: boolean
  est_entrepreneur_individuel: boolean
  est_entrepreneur_spectacle: boolean
  est_ess: boolean
  est_finess: boolean
  est_organisme_formation: boolean
  est_qualiopi: boolean
  liste_id_organisme_formation: null | string
  est_rge: boolean
  est_service_public: boolean
  est_societe_mission: boolean
  est_uai: boolean
  identifiant_association: null | string
  statut_entrepreneur_spectacle: null | string
}

type RechercheEntrepriseResult = {
  siren: string
  nom_complet: string
  nom_raison_sociale: string
  sigle: string
  nombre_etablissements: number
  nombre_etablissements_ouverts: number
  siege: Siege
  activite_principale: string
  categorie_entreprise: string
  annee_categorie_entreprise: string
  date_creation: string
  date_mise_a_jour: string
  dirigeants: any[] // Remplacer 'any' par un type plus précis si possible
  etat_administratif: string
  nature_juridique: string
  section_activite_principale: string
  tranche_effectif_salarie: string
  annee_tranche_effectif_salarie: string
  statut_diffusion: string
  matching_etablissements: any[] // Remplacer 'any' par un type plus précis si possible
  complements: Complements
}
type RechercheEntrepriseResponse = {
  results: RechercheEntrepriseResult[]
  total_results: number
  page: number
  per_page: number
  total_pages: number
}

export const removeAccents = (s: string): string =>
  s.normalize('NFD').replaceAll(/[\u0300-\u036F]/g, '')

export const containsPrefecture = (label: string): boolean => {
  const lowercased = label.toLowerCase()
  const withoutAccents = removeAccents(lowercased)

  return withoutAccents.includes('prefecture')
}

export const qualifyPrefectureOrganization = async (
  organization: MonCompteProOrganization,
) => {
  const { siret, label, is_service_public: isServicePublic } = organization

  const response = await axios.get<RechercheEntrepriseResponse>(
    `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(
      label,
    )}&activite_principale=84.11Z&page=1&per_page=10`,
  )

  const entreprises = response.data.results

  const siren = siret.slice(0, 9)
  const matching = entreprises.find((entreprise) => entreprise.siren === siren)

  // The api also tells us that the organization has the good NAF
  const departement = matching?.siege?.departement

  if (!departement || !containsPrefecture(label) || !isServicePublic) {
    // This is not a prefecture
    return { ...organization, prefectureCheckedAt: new Date() }
  }

  // This is a prefecture
  return {
    ...organization,
    prefectureCheckedAt: new Date(),
    isDepartementPrefecture: departement,
  }
}
