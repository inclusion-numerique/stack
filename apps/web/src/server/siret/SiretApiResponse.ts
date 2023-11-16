// Represents the main response from the API endpoint
export type SiretApiResponse = {
  data: EtablissementData
  links: {
    unite_legale: string // URL to the 'Donnée Sirene d'une unité légale' resource
  }
  meta: {
    date_derniere_mise_a_jour: number // Timestamp of the last update at Insee
    redirect_from_siret?: string // Original SIRET if the request was redirected
  }
}

// Represents detailed data about an establishment
type EtablissementData = {
  siret: string // SIRET number of the establishment
  siege_social: boolean // Indicates if the establishment is the head office
  etat_administratif: 'A' | 'F' // Administrative status of the establishment ('A' for active, 'F' for closed)
  date_fermeture?: number // Closure date of the establishment in timestamp format, nullable
  activite_principale: ActivitePrincipale // Main activity attributes of the establishment
  tranche_effectif_salarie: TrancheEffectifSalarie // Employee size range of the establishment
  status_diffusion: 'diffusible' | 'partiellement_diffusible' | 'non_diffusible' // Diffusion status of the establishment
  diffusable_commercialement: boolean // Indicates if the establishment is commercially diffusable
  enseigne?: string // Brand name of the establishment, nullable
  unite_legale: UniteLegale // Legal unit associated with the establishment
  adresse: Adresse // Address of the establishment
  date_creation?: number // Creation date of the legal unit in timestamp format, nullable
}

// Represents main activity attributes of an establishment
type ActivitePrincipale = {
  code?: string // Main activity code (APE), nullable
  libelle: string // Label associated with the APE code
  nomenclature?: string // Nomenclature associated with the APE code, nullable
}

// Represents employee size range of an establishment
type TrancheEffectifSalarie = {
  code:
    | 'NN'
    | '00'
    | '01'
    | '02'
    | '03'
    | '11'
    | '12'
    | '21'
    | '22'
    | '31'
    | '32'
    | '41'
    | '42'
    | '51'
    | '52'
    | '53'
  intitule?: string // Title associated with the employee size code, nullable
  date_reference?: string // Reference date for the employee size, nullable
  de?: number // Lower threshold of the employee size range, nullable
  a?: number // Upper threshold of the employee size range, nullable
}
// Represents the legal unit associated with the establishment
type UniteLegale = {
  siren: string // SIREN number of the legal unit
  rna?: string // RNA number of the legal unit, nullable
  siret_siege_social: string // SIRET number of the head office
  type: 'personne_physique' | 'personne_morale' // Type of legal person (individual or corporate)
  personne_morale_attributs?: PersonneMoraleAttributs // Attributes for corporate legal person, nullable
  personne_physique_attributs?: PersonnePhysiqueAttributs // Attributes for individual legal person, nullable
  categorie_entreprise?: 'GE' | 'ETI' | 'PME' // Category of the enterprise, nullable
  status_diffusion: 'diffusible' | 'partiellement_diffusible' | 'non_diffusible' // Diffusion status of the legal unit
  diffusable_commercialement: boolean // Indicates if the legal unit is commercially diffusable
  forme_juridique: FormeJuridique // Legal form attributes of the legal unit
  activite_principale: ActivitePrincipale // Main activity attributes of the legal unit
  tranche_effectif_salarie: TrancheEffectifSalarie // Employee size range of the legal unit
  etat_administratif: 'A' | 'C' // Administrative status of the legal unit ('A' for active, 'C' for ceased)
  economie_sociale_et_solidaire?: boolean // Indicates if the legal unit is part of the social and solidarity economy, nullable
  date_creation?: number // Creation date of the legal unit in timestamp format, nullable
}

// Represents attributes for corporate legal person
type PersonneMoraleAttributs = {
  raison_sociale?: string // Corporate name of the legal unit, nullable
  sigle?: string // Acronym of the legal unit, nullable
}

// Represents attributes for individual legal person
type PersonnePhysiqueAttributs = {
  pseudonyme?: string // Pseudonym used in professional activity, nullable
  prenom_usuel?: string // Usual first name used in daily life, nullable
  prenom_1?: string // First declared first name, nullable
  prenom_2?: string // Second declared first name, nullable
  prenom_3?: string // Third declared first name, nullable
  prenom_4?: string // Fourth declared first name, nullable
  nom_usage?: string // Name chosen for use, nullable
  nom_naissance?: string // Birth name, nullable
  sexe?: 'M' | 'F' // Gender of the individual, nullable
}

// Represents legal form attributes of a legal unit
type FormeJuridique = {
  code: string // Code of the legal form
  libelle: string // Label associated with the legal form code
}

// Represents the address of the establishment
type Adresse = {
  // Fields representing various components of the address
  numero_voie: string // Number in the street
  indice_repetition_voie?: 'bis' | 'ter' | 'quarter' | 'quinquies' // Repetition index in the street, nullable
  type_voie?: string // Type of street, nullable
  libelle_voie: string // Street name
  complement_adresse?: string // Additional address information, nullable
  code_commune?: string // Code of the commune, nullable
  code_postal: string // Postal code
  distribution_speciale?: string // Special distribution information, nullable
  code_cedex?: string // CEDEX code, nullable
  libelle_cedex?: string // CEDEX label, nullable
  libelle_commune?: string // Name of the commune for addresses in France, nullable
  libelle_commune_etranger?: string // Name of the commune for addresses abroad, nullable
  code_pays_etranger?: string // Code of the country for addresses abroad, nullable
  libelle_pays_etranger?: string // Name of the country for addresses abroad, nullable
  status_diffusion: 'diffusible' | 'partiellement_diffusible' | 'non_diffusible' // Diffusion status of the address
  acheminement_postal: AcheminementPostal // Components for postal delivery
}
// Represents components for postal delivery of an address
type AcheminementPostal = {
  l1?: string // Line 1 of the postal address, nullable
  l2?: string // Line 2 of the postal address, nullable
  l3?: string // Line 3 of the postal address, nullable
  l4?: string // Line 4 of the postal address, nullable
  l5?: string // Line 5 of the postal address, nullable
  l6?: string // Line 6 of the postal address, nullable
  l7?: string // Line 7 of the postal address, nullable
}

// Represents error structure in the API response
export type ApiError = {
  errors: ApiErrorDetail[]
}

// Detailed information about an individual API error
type ApiErrorDetail = {
  code: string // Error code
  title: string // Brief title of the error
  detail: string // Detailed description of the error
  source?: {
    parameter?: string // The parameter in the request that caused the error, nullable
  }
  meta?: Record<string, unknown> // Additional metadata about the error, nullable
}
