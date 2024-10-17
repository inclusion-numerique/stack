import type { DBRef, ObjectId } from 'mongodb'

// TODO this is sketchy, do stats on the cras and fields and zod ?
export type CraConseillerNumerique = {
  dateAccompagnement: Date
  canal: 'rattachement' | 'distance' | null
  activite: 'individuel' | 'ponctuel' | null
  nbParticipants: number
  nbParticipantsRecurrents?: number
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
  // E.g: [ { CCAS: 1 }
  // TODO our model for organismes (json field?)
  organismes: Record<string, number>[] | null
  themes: string[]
  // Prendre en main du materiel
  // - Ordinateur
  // - Tablette
  // - Téléphone
  // Accompagner un aidant
  // - Parent, proche
  // - Travailleur social
  // - Enseignant
  // Bureautique
  // - Fourniture (impression, scanner)
  // Santé
  // - Mon espace santé
  // TODO Trouver le précisier autre (annoter)
  // TODO dans l'éxport tout est dans un champ "annotations"
  sousThemes?: Record<string, string[]>[]
  duree: string // 30mn, 30-60, ou champ libre par 15mn e.g. 2h15
  // Poursuite
  // - En accompagnement individuel (int)
  // - En atelier (int)
  // - Redirection
  // -- Liste (genre gendarmerie, avec un int) ou autre
  codeCommune: string | null
  codePostal: string | null
  nomCommune: string | null
}

export type CraConseillerNumeriqueCollectionItem = {
  _id: ObjectId
  cra: CraConseillerNumerique
  conseiller: DBRef
  createdAt: Date
  // TODO dernière modification ? est-ce qu'ils changent le created At
  structure: DBRef
}
