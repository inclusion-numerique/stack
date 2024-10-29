import type { ObjectId } from 'mongodb'

export type PremanenceConseillerNumerique = {
  _id: ObjectId
  nomEnseigne: string
  siteWeb: string | null
  siret: string
  location: {
    type: 'Point'
    coordinates: number[]
  }
  adresse: {
    numeroRue: string
    rue: string
    codePostal: string
    codeCommune: string
    ville: string
  }
}
