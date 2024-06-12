export type ConseillerNumeriqueProjection = {
  _id: string
  codeCommune: string
  codeDepartement: string
  codePostal: string
  nomCommune: string
  codeRegion: string
  coordinateurs?: {
    id: string
    nom: string
    prenom: string
    nonAffichageCarto?: boolean
  }[]
  createdAt: Date
  deletedAt: Date | null
  nom: string
  prenom: string
  email: string
  emailCN: {
    address: string
  }
  emailConfirmedAt: Date | null
  emailPro?: string | null
  estCoordinateur: boolean
  estEnEmploi: boolean
  estEnFormation: boolean
  estRecrute: boolean
  hasPermanence: boolean
  idPG: string
  importedAt: Date | null
  listeSubordonnes: {
    type: 'conseillers' | 'codeDepartement'
    liste: string[]
  }[]
  mattermost: string
  structureId: string
  updatedAt: Date | null
  userCreated: boolean
}

export const mongoQueryConseillerProjection = {
  _id: 1,
  codeCommune: 1,
  codeDepartement: 1,
  codePostal: 1,
  nomCommune: 1,
  codeRegion: 1,
  coordinateurs: 1,
  createdAt: 1,
  deletedAt: 1,
  nom: 1,
  prenom: 1,
  email: 1,
  emailCN: 1,
  emailConfirmedAt: 1,
  emailPro: 1,
  estCoordinateur: 1,
  estEnEmploi: 1,
  estEnFormation: 1,
  estRecrute: 1,
  hasPermanence: 1,
  idPG: 1,
  importedAt: 1,
  listSubordonnes: 1,
  mattermost: 1,
  structureId: 1,
  updatedAt: 1,
  userCreated: 1,
}

export const cleanConseillerProjection = ({
  _id,
  emailCN,
  ...rest
}: ConseillerNumeriqueProjection) => ({
  id: _id,
  emailConseillerNumerique: emailCN?.address ?? null,
  ...rest,
})

export type Conseiller = ReturnType<typeof cleanConseillerProjection>
