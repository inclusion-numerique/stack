import { DataInclusionStructure } from '@app/web/data/dataInclusionSchema'

/**
 * Cartographie Nationale
 * https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-conseiller-numerique-1/
 */

export const CartoCnfsStructureInclusionConseillerNumerique = {
  url: 'https://www.data.gouv.fr/fr/datasets/r/20fff08e-2393-4533-8950-b2aa26f7172d',
  dataFile: 'structures-inclusion-20230628-conseiller-numerique.json',
  schema: 'betagouv/data-inclusion-schema',
}
// ⚠️ Pas de SIRET, pas de type de structure
export type CartoCnfsInclusionConseillerNumeriqueStructure =
  DataInclusionStructure

export const CartoCnfsLieuxMediationNumerique = {
  url: 'https://www.data.gouv.fr/fr/datasets/r/048e9e16-b707-48da-85d1-60c9a25ea1d7',
  dataFile:
    '20230628-conseiller-numerique-lieux-de-mediation-numeriques-national.json',
  schema: 'LaMednum/standard-mediation-num',
}
// ⚠️ Pas de SIRET, pas de type de structure
export type CartoCnfsLieuxMediationNumeriqueStructure = {
  id: string
  nom: string
  // Lisible par humain, séparé par ";"
  services: string
  pivot: string
  commune: string
  // ⚠️ Pas code commune INSEE
  code_postal: string
  adresse: string
  latitude: number
  longitude: number
  telephone: string
  courriel: string
  site_web: string
  conditions_acces: string
  // "CNFS"
  labels_nationaux: string
  horaires: string
  // "Conseiller Numerique"
  source: string
  date_maj: string
}

// ⚠️ typologie souvent manquante
export const CartoInclusionLieuxMediation = {
  schema: 'betagouv/data-inclusion-schema',
  url: 'https://www.data.gouv.fr/fr/datasets/r/be3323ec-4662-4b3b-b90e-18cf5c97193d',
  dataFile: 'structures-inclusion-20230628-data-inclusion-sans-doublons.json',
}

export type CartoInclusionLieuxMediationStructure = DataInclusionStructure

/**
 * CNFS
 * https://www.data.gouv.fr/fr/datasets/conseiller-numerique-france-services-nombre-daccompagnements/
 */

// ❌ Uniquement une ligne CSV 17/11/2020	23/06/2023	2264847
export const CnfsAccompagnements = {
  schema: null,
  url: 'https://www.data.gouv.fr/fr/datasets/r/8b5cbe91-07ce-49cd-b974-ae7ac845710c',
  dataFile: null,
}

// https://www.data.gouv.fr/fr/datasets/conseiller-numerique-liste-des-structures-validees-par-le-comite-de-selection/#/resources
export const CnfsValidatedStructures = {
  title:
    'Conseiller numérique - Liste des structures validées par le comité de sélection',
  url: '',
}

/**
 * DORA
 */

// API Dora
// https://data-inclusion-api-staging.osc-secnum-fr1.scalingo.io/api/v0/docs#/Données/list_structures_endpoint_api_v0_structures_get
export const DoraStructuresSource = {}
export type DoraStructure = {
  _di_geocodage_code_insee: null
  _di_geocodage_score: null
  id: '08f6fc15-bb98-4562-850b-507783c53ef0'
  siret: '20005376700014'
  rna: null
  nom: 'REGION AUVERGNE-RHONE-ALPES'
  commune: 'LYON CEDEX 02 CS 20033'
  code_postal: '69269'
  code_insee: '69382'
  adresse: '1 ESP FRANCOIS MITTERRAND'
  complement_adresse: null
  longitude: 4.820_078
  latitude: 45.740_575
  typologie: null
  telephone: null
  courriel: null
  site_web: null
  presentation_resume: null
  presentation_detail: null
  source: 'dora'
  date_maj: '2022-03-13'
  antenne: false
  lien_source: 'https://dora.fabrique.social.gouv.fr/structures/region-auvergne-rhon'
  horaires_ouverture: null
  accessibilite: null
  labels_nationaux: []
  labels_autres: []
  thematiques: []
}
