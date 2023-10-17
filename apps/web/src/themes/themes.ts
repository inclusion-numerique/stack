import { SelectOption } from '@app/ui/components/Form/utils/options'
import { Theme } from '@prisma/client'

/**
 * Resource themes labels and their category mappings
 */

export const categories = [
  'Inclusion & compétences numériques',
  'Numérique & environnement',
  'Culture numérique',
  'Communs & souveraineté',
] as const

export type Category = (typeof categories)[number]

export const themeLabels: { [theme in Theme]: string } = {
  [Theme.Accessibilite]: 'Accessibilité',
  [Theme.ActeursDuNumerique]: 'Acteurs du numérique',
  [Theme.ArtsEtCulture]: 'Arts et culture',
  [Theme.CitoyenneteEtEngagement]: 'Citoyenneté & engagement',
  [Theme.CodeEtProgrammation]: 'Code & programmation',
  [Theme.CommunicationEnLigneEtReseauxSociaux]:
    'Communication en ligne & réseaux sociaux',
  [Theme.CommunsNumeriques]: 'Communs numériques',
  [Theme.DemarchesEtServicesEnLigne]: 'Démarches et services en ligne',
  [Theme.DiagnosticDeCompetencesNumeriques]:
    'Diagnostic de compétences numériques',
  [Theme.Donnees]: 'Données',
  [Theme.EconomieNumerique]: 'Économie numérique',
  [Theme.EducationEtFormation]: 'Education & formation',
  [Theme.EmploiEtEntrepreunariat]: 'Emploi & entrepreunariat',
  [Theme.GouvernancesPartagees]: 'Gouvernances partagées',
  [Theme.InclusionNumerique]: 'Inclusion numérique',
  [Theme.IntelligenceArtificielle]: 'Intelligence artificielle',
  [Theme.JeuxVideos]: 'Jeux vidéos',
  [Theme.MaitriseDesOutilsNumeriques]: 'Maîtrise des outils numériques',
  [Theme.MaterielReconditionne]: 'Matériel reconditionné',
  [Theme.Mobilites]: 'Mobilités',
  [Theme.EcoconceptionDeServicesNumeriques]:
    'Écoconception de services numériques',
  [Theme.UsagesResponsablesDuNumerique]: 'Usages responsables du numérique',
  [Theme.NumeriqueAuServiceDeLEnvironnement]:
    'Numérique au service de l’environnement',
  [Theme.TerritoiresConnectesEtDurables]: 'Territoires connectés et durables',
  [Theme.NavigationSurInternet]: 'Navigation sur Internet',
  [Theme.NumeriqueEnSante]: 'Numérique en santé',
  [Theme.OpenSourceEtLicencesLibres]: 'Open source et licences libres',
  [Theme.Parentalite]: 'Parentalité',
  [Theme.RisquesCyberEtProtection]: 'Risques cyber et protection',
  [Theme.SobrieteNumerique]: 'Sobriété numérique',
  [Theme.SouveraineteNumeriqueEtHebergementDesDonnees]:
    'Souveraineté numérique & hébergement des données',
  [Theme.UsageDuMaterielInformatique]: 'Usage du matériel informatique',
}

export const themeCategories: { [theme in Theme]: Category } = {
  [Theme.DiagnosticDeCompetencesNumeriques]:
    'Inclusion & compétences numériques',
  [Theme.DemarchesEtServicesEnLigne]: 'Inclusion & compétences numériques',
  [Theme.MaitriseDesOutilsNumeriques]: 'Inclusion & compétences numériques',
  [Theme.NavigationSurInternet]: 'Inclusion & compétences numériques',
  [Theme.UsageDuMaterielInformatique]: 'Inclusion & compétences numériques',
  [Theme.Accessibilite]: 'Inclusion & compétences numériques',
  [Theme.InclusionNumerique]: 'Inclusion & compétences numériques',
  [Theme.SobrieteNumerique]: 'Numérique & environnement',
  [Theme.MaterielReconditionne]: 'Numérique & environnement',
  [Theme.Mobilites]: 'Numérique & environnement',
  [Theme.EcoconceptionDeServicesNumeriques]: 'Numérique & environnement',
  [Theme.UsagesResponsablesDuNumerique]: 'Numérique & environnement',
  [Theme.NumeriqueAuServiceDeLEnvironnement]: 'Numérique & environnement',
  [Theme.TerritoiresConnectesEtDurables]: 'Numérique & environnement',
  [Theme.ActeursDuNumerique]: 'Culture numérique',
  [Theme.ArtsEtCulture]: 'Culture numérique',
  [Theme.CitoyenneteEtEngagement]: 'Culture numérique',
  [Theme.Donnees]: 'Culture numérique',
  [Theme.CodeEtProgrammation]: 'Culture numérique',
  [Theme.CommunicationEnLigneEtReseauxSociaux]: 'Culture numérique',
  [Theme.EducationEtFormation]: 'Culture numérique',
  [Theme.EmploiEtEntrepreunariat]: 'Culture numérique',
  [Theme.JeuxVideos]: 'Culture numérique',
  [Theme.NumeriqueEnSante]: 'Culture numérique',
  [Theme.Parentalite]: 'Culture numérique',
  [Theme.RisquesCyberEtProtection]: 'Culture numérique',
  [Theme.CommunsNumeriques]: 'Communs & souveraineté',
  [Theme.EconomieNumerique]: 'Communs & souveraineté',
  [Theme.GouvernancesPartagees]: 'Communs & souveraineté',
  [Theme.IntelligenceArtificielle]: 'Communs & souveraineté',
  [Theme.OpenSourceEtLicencesLibres]: 'Communs & souveraineté',
  [Theme.SouveraineteNumeriqueEtHebergementDesDonnees]:
    'Communs & souveraineté',
}

export const categoryThemes = (() => {
  const index: { [category in Category]: Theme[] } = {
    'Inclusion & compétences numériques': [],
    'Numérique & environnement': [],
    'Culture numérique': [],
    'Communs & souveraineté': [],
  }

  for (const [theme, category] of Object.entries(themeCategories)) {
    index[category].push(theme as Theme)
  }

  return index
})()

export const categoryThemesOptions = (() => {
  const index: { [category in Category]: SelectOption[] } = {
    'Inclusion & compétences numériques': [],
    'Numérique & environnement': [],
    'Culture numérique': [],
    'Communs & souveraineté': [],
  }

  for (const [theme, category] of Object.entries(themeCategories)) {
    index[category].push({
      name: themeLabels[theme as Theme],
      value: theme as Theme,
    })
  }

  return index
})()

export const themeOptions = Object.entries(themeLabels).map(
  ([value, name]) => ({
    value,
    name,
  }),
)
