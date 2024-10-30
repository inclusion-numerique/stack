import type { DBRef, ObjectId } from 'mongodb'

export type CraConseillerNumerique = {
  dateAccompagnement: Date
  canal: 'rattachement' | 'distance' | null
  activite: 'individuel' | 'ponctuel' | 'collectif' | null
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
  // E.g: [ { CCAS: 1 }, {'Assistante sociale': 1} ]
  organismes: { [index: string]: number }[] | null
  themes: string[]
  // Prendre en main du materiel
  // - Ordinateur
  // - Tablette
  // - Téléphone
  // Accompagner un aidant (accompagner)
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
  duree: string | null // 30mn, 30-60, ou champ libre par 15mn e.g. 2h15
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
