import type { ObjectId } from 'mongodb'

export type StructureConseillerNumerique = {
  _id: ObjectId
  idPG: number
  type: string // 'DEPARTEMENT' | 'REGION' | 'COMMUNE' - assuming other values
  statut: string // 'VALIDATION_COSELEC' | other possible statuses
  nom: string
  siret: string
  aIdentifieCandidat: boolean
  dateDebutMission: Date
  nombreConseillersSouhaites: number | null
  estLabelliseFranceServices: 'OUI' | 'NON' // assuming possible values
  codePostal: string
  location: {
    type: 'Point'
    coordinates: number[]
  }
  nomCommune: string
  codeCommune: string
  codeDepartement: string
  codeRegion: string
  emailConfirmedAt: Date
  emailConfirmationKey: string
  unsubscribedAt: Date | null
  unsubscribeExtras: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
  validatedAt: Date | null
  importedAt: Date
  deleted_at: Date | null
  userCreated: boolean
  coselecAt: Date
  insee: {
    siret: string
    siege_social: boolean
    etat_administratif: string // 'A' | other possible states
    date_fermeture: Date | null
    enseigne: string | null
    activite_principale: Record<string, unknown>
    tranche_effectif_salarie: Record<string, unknown>
    diffusable_commercialement: boolean
    status_diffusion: string // 'diffusible' | other possible statuses
    date_creation: number // timestamp
    unite_legale: Record<string, unknown>
    adresse: {
      status_diffusion: 'diffusible'
      complement_adresse: null | string
      numero_voie: null | string
      indice_repetition_voie: null | string
      type_voie: null | string
      libelle_voie: null | string
      code_postal: string
      libelle_commune: string
      libelle_commune_etranger: null
      distribution_speciale: null
      code_commune: string
      code_cedex: null
      libelle_cedex: null
      code_pays_etranger: null
      libelle_pays_etranger: null
      acheminement_postal: {
        l1: string
        l2: string
        l3: string
        l4: string
        l5: string
        l6: string
        l7: string
      }
    }
  }
  coordonneesInsee: {
    type: 'Point'
    coordinates: number[]
  }
  coselec: Array<Record<string, unknown>>
  estZRR: boolean
  prefet: Array<Record<string, unknown>>
  contact: {
    prenom: string
    nom: string
    fonction: string
    email: string
    telephone: string
  }
  qpvListe: Array<unknown>
  qpvStatut: string // 'Sans objet' | other possible statuses
  codeCom: string | null
  conventionnement: {
    dossierConventionnement: {
      statut: string // 'accepte' | other possible statuts
      numero: number
      dateDeCreation: Date
      dateDerniereModification: Date
      dateDeValidation: Date
    }
    dossierReconventionnement: {
      statut: string // 'accepte' | other possible statuts
      numero: number
      dateDeCreation: Date
      dateFinProchainContrat: Date
      dateDerniereModification: Date
      nbPostesAttribuees?: number | null
    }
    statut: string // 'CONVENTIONNEMENT_VALIDÉ' | other possible statuses
  }
  adresseInsee2Ban: {
    label: string
    score: number
    housenumber: string
    id: string
    name: string
    postcode: string
    citycode: string
    x: number
    y: number
    city: string
    context: string
    type: string // 'housenumber' | other possible types
    importance: number
    street: string
  }
  coordinateurCandidature: boolean
  coordinateurTypeContrat: string | null
}
