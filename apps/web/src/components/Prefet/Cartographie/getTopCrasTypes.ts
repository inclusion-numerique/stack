import { CraConseillerNumeriqueParDepartement } from '@prisma/client'

const craThemes = {
  themeAutre: 'Autre',
  themeEquipementInformatique: 'Équipement informatique',
  themeDemarcheEnLigne: 'Démarche en ligne',
  themeSmartphone: 'Smartphone',
  themeCourriel: 'Courriel',
  themeInternet: 'Internet',
  themeVocabulaire: 'Vocabulaire',
  themeTraitementTexte: 'Traitement de texte',
  themeContenusNumeriques: 'Contenus numériques',
  themeTrouverEmploi: 'Trouver un emploi',
  themeEchanger: 'Échanger',
  themeTpePme: 'TPE/PME',
  themeAccompagnerEnfant: 'Accompagner un enfant',
  themeSecurite: 'Sécurité',
  themeFraudeEtHarcelement: 'Fraude et harcèlement',
  themeSante: 'Santé',
  themeDiagnostic: 'Diagnostic',
  themeBudget: 'Budget',
  themeScolaire: 'Scolaire',
} as const

export const getTopCrasTypes = (
  cras?: CraConseillerNumeriqueParDepartement | null,
) => {
  if (!cras) {
    return { top3: [], total: 0 }
  }

  const typesArray: { label: string; count: number }[] = []
  let total = 0
  for (const theme of Object.keys(craThemes)) {
    typesArray.push({
      label: craThemes[theme as keyof typeof craThemes],
      count: cras[theme as keyof typeof craThemes],
    })
    total += cras[theme as keyof typeof craThemes]
  }
  typesArray.sort((a, b) => b.count - a.count)
  const top3 = typesArray.slice(0, 3)
  const rest = typesArray.slice(3)
  const totalRest = rest.reduce(
    (accumulator, current) => accumulator + current.count,
    0,
  )
  return {
    top3: [...top3, { label: 'Autres thématiques', count: totalRest }],
    total,
  }
}
