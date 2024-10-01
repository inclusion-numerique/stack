import type { DBRef, ObjectId } from 'mongodb'


// TODO this is sketchy, do stats on the cras and fields and zod ?
export type CraConseillerNumerique = {
  dateAccompagnement: Date
  nbParticipantsRecurrents: number
  age: {
    moins12ans: number
    de12a18ans: number
    de18a35ans: number
    de35a60ans: number
    plus60ans: number
  }
  statut: {
    etudiant: number
    sansEmploi: number
    enEmploi: number
    retraite: number
    heterogene: number
  }
  accompagnement: {
    atelier: number
    individuel: number
    redirection: number
  }
  organismes: string | null
  canal: 'rattachement' | null
  activite: 'individuel' | null
  nbParticipants: number
  themes: string[]
  sousThemes: unknown[]
  duree: number
  codeCommune: string | null
  codePostal: string | null
  nomCommune: string | null
}

export type CraConseillerNumeriqueCollectionItem = {
  _id: ObjectId
  cra: CraConseillerNumerique
  conseiller: DBRef
  createdAt: Date
  structure: DBRef
}
