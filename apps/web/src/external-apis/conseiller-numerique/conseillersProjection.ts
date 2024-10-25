import type { ObjectId } from 'mongodb'

export type ConseillerNumeriqueCollectionItem = {
  _id: ObjectId
  aUneExperienceMedNum?: boolean
  certificationPixFormation?: boolean
  certifie?: boolean
  codeCom?: string
  codeCommune: string
  codeDepartement: string
  codeDepartementStructure?: string
  codePostal: string
  codeRegion: string
  codeRegionStructure?: string
  coordinateurs?: {
    id: string
    nom: string
    prenom: string
    nonAffichageCarto?: boolean
  }[]
  createdAt: Date
  dateDeNaissance?: Date
  dateDisponibilite?: Date
  dateFinFormation?: Date
  datePrisePoste?: Date
  deletedAt?: Date | null
  disponible?: boolean
  distanceMax?: number
  email: string
  emailCN: {
    address: string
    deleteMailboxCNError?: boolean
  }
  emailCNError?: boolean
  emailConfirmationKey?: string
  emailConfirmedAt: Date | null
  emailPro?: string | null
  estDemandeurEmploi?: boolean
  estDiplomeMedNum?: boolean
  estEnEmploi: boolean
  estEnFormation: boolean
  estRecrute: boolean
  groupeCRA?: number
  groupeCRAHistorique?: {
    dateDeChangement?: Date
    dateMailSendConseillerM1?: Date
    dateMailSendConseillerM1_5?: Date
    dateMailSendStructureM1?: Date
    dateMailSendStructureM1_5?: Date
    mailSendConseillerM1?: boolean
    mailSendConseillerM1_5?: boolean
    mailSendStructureM1?: boolean
    mailSendStructureM1_5?: boolean
    nbJourDansGroupe?: number
    numero?: number
  }[]
  hasPermanence: boolean
  idPG: number
  importedAt: Date | null
  location?: {
    coordinates: [number, number]
    type: string
  }
  mailActiviteCRAMois?: string
  mattermost?: null | {
    id: string
    error: boolean
    errorDeleteAccount?: boolean
    errorResetPassword: boolean
    hubJoined: boolean
    login: string
  }
  nom: string
  nomCommune: string
  nomDiplomeMedNum?: string
  pix?: {
    competence1?: boolean
    competence2?: boolean
    competence3?: boolean
    datePartage?: Date
    palier?: number
    partage?: boolean
  }
  prenom: string
  resetPasswordCNError?: boolean
  ruptures?: {
    dateRupture?: Date
    motifRupture?: string
    structureId?: ObjectId
  }[]
  sexe?: string
  sondageSentAt?: Date
  sondageToken?: string
  statut?: string
  structureId: string
  supHierarchique?: {
    email?: string
    fonction?: string
    nom?: string
    numeroTelephone?: string
    prenom?: string
  }
  telephone?: string
  telephonePro?: string
  unsubscribeExtras?: {
    // Add any specific fields if known, otherwise use a general type
    [key: string]: string | number | boolean
  }
  unsubscribedAt?: string
  updatedAt: Date | null
  userCreated: boolean
}

export const cleanConseillerProjection = ({
  _id,
  emailCN,
  ...rest
}: ConseillerNumeriqueCollectionItem) => ({
  id: _id,
  emailConseillerNumerique: emailCN?.address ?? null,
  ...rest,
})

export type Conseiller = ReturnType<typeof cleanConseillerProjection>
