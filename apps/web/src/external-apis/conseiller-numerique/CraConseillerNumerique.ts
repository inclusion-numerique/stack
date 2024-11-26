import type { DBRef, ObjectId } from 'mongodb'

export type CraConseillerNumeriqueTheme =
  | 'autre'
  | 'equipement informatique'
  | 'demarche en ligne'
  | 'smartphone'
  | 'courriel'
  | 'internet'
  | 'vocabulaire'
  | 'echanger'
  | 'contenus numeriques'
  | 'traitement texte'
  | 'accompagner enfant'
  | 'trouver emploi'
  | 'tpe/pme'
  | 'sante'
  | 'diagnostic'
  | 'fraude et harcelement'
  | 'securite'
  | 'budget'
  | 'scolaire'

export type CraConseillerNumerique = {
  dateAccompagnement: Date
  canal: 'rattachement' | 'distance' | 'domicile' | 'autre lieu'
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
  themes: CraConseillerNumeriqueTheme[]
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
  duree: string | number | null //  '0-30', '30-60', '60', '90', numbers or null
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
  updatedAt?: Date
  structure: DBRef
}
