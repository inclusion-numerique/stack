import { CraConseillerNumeriqueParDepartement } from '@prisma/client'

export const aggregateConumCras = (
  conumCras: CraConseillerNumeriqueParDepartement[],
): CraConseillerNumeriqueParDepartement => {
  const summed: CraConseillerNumeriqueParDepartement = {
    codeDepartement: '',
    usagers: 0,
    accompagnements: 0,
    ageMoins12ans: 0,
    age12a18ans: 0,
    age18a35ans: 0,
    age35a60ans: 0,
    agePlus60ans: 0,
    statutEtudiant: 0,
    statutSansEmploi: 0,
    statutEnEmploi: 0,
    statutRetraite: 0,
    statutHeterogene: 0,
    accompagnementAtelier: 0,
    accompagnementIndividuel: 0,
    accompagnementRedirection: 0,
    activiteCollectif: 0,
    activiteIndividuel: 0,
    activitePonctuel: 0,
    themeAutre: 0,
    themeEquipementInformatique: 0,
    themeDemarcheEnLigne: 0,
    themeSmartphone: 0,
    themeCourriel: 0,
    themeInternet: 0,
    themeVocabulaire: 0,
    themeTraitementTexte: 0,
    themeContenusNumeriques: 0,
    themeTrouverEmploi: 0,
    themeEchanger: 0,
    themeTpePme: 0,
    themeAccompagnerEnfant: 0,
    themeSecurite: 0,
    themeFraudeEtHarcelement: 0,
    themeSante: 0,
    themeDiagnostic: 0,
    themeBudget: 0,
    themeScolaire: 0,
  }
  const keys = Object.keys(
    summed,
  ) as (keyof CraConseillerNumeriqueParDepartement)[]

  for (const cra of conumCras) {
    for (const key of keys) {
      const value = cra[key]

      if (typeof value !== 'number') {
        continue
      }
      ;(summed[key] as number) += value
    }
  }
  return summed
}
