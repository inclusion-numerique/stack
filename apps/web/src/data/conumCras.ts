import { readFile } from 'node:fs/promises'
import { getDataFilePath } from '@app/web/data/dataFiles'

const themes = [
  'autre',
  'equipement informatique',
  'demarche en ligne',
  'smartphone',
  'courriel',
  'internet',
  'vocabulaire',
  'traitement texte',
  'contenus numeriques',
  'trouver emploi',
  'echanger',
  'tpe/pme',
  'accompagner enfant',
  'securite',
  'fraude et harcelement',
  'sante',
  'diagnostic',
  'budget',
  'scolaire',
] as const
export type Theme = (typeof themes)[number]

// Cra keys to storable model keys
export const themeKeys = {
  autre: 'autre',
  'equipement informatique': 'equipementInformatique',
  'demarche en ligne': 'demarcheEnLigne',
  smartphone: 'smartphone',
  courriel: 'courriel',
  internet: 'internet',
  vocabulaire: 'vocabulaire',
  'traitement texte': 'traitementTexte',
  'contenus numeriques': 'contenusNumeriques',
  'trouver emploi': 'trouverEmploi',
  echanger: 'echanger',
  'tpe/pme': 'tpePme',
  'accompagner enfant': 'accompagnerEnfant',
  securite: 'securite',
  'fraude et harcelement': 'fraudeEtHarcelement',
  sante: 'sante',
  diagnostic: 'diagnostic',
  budget: 'budget',
  scolaire: 'scolaire',
} as const satisfies { [key in Theme]: string }

export type ThemeKey = (typeof themeKeys)[Theme]

export const themesSet = new Set<Theme>(themes)

export type ReducedConumCras = {
  departement: string
  participants: number
  themes: { [key in ThemeKey]?: number }
  statut: {
    etudiant: number
    sansEmploi: number
    enEmploi: number
    retraite: number
    heterogene: number
  }
  accompagnement: {
    individuel: number
    atelier: number
    redirection: number
  }
  activite: {
    collectif: number
    ponctuel: number
    individuel: number
  }
  moins12ans: number
  de12a18ans: number
  de18a35ans: number
  de35a60ans: number
  plus60ans: number
}

export const ConumCras = {
  url: 'Metabase conum',
  dataFile: 'conum - departement-cras.json',
}

export const getConumCrasByDepartement = async () => {
  const data = await readFile(getDataFilePath(ConumCras.dataFile), 'utf8')

  return JSON.parse(data) as ReducedConumCras[]
}
