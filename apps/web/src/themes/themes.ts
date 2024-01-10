import { SelectOption } from '@app/ui/components/Form/utils/options'
import type { Theme } from '@prisma/client'

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
  Accessibilite: 'Accessibilité',
  ActeursDuNumerique: 'Acteurs du numérique',
  ArtsEtCulture: 'Arts et culture',
  CitoyenneteEtEngagement: 'Citoyenneté & engagement',
  CodeEtProgrammation: 'Code & programmation',
  CommunicationEnLigneEtReseauxSociaux:
    'Communication en ligne & réseaux sociaux',
  CommunsNumeriques: 'Communs numériques',
  DemarchesEtServicesEnLigne: 'Démarches et services en ligne',
  DiagnosticDeCompetencesNumeriques: 'Diagnostic de compétences numériques',
  Donnees: 'Données',
  EconomieNumerique: 'Économie numérique',
  EducationEtFormation: 'Education & formation',
  EmploiEtEntrepreunariat: 'Emploi & entrepreunariat',
  GouvernancesPartagees: 'Gouvernances partagées',
  InclusionNumerique: 'Inclusion numérique',
  IntelligenceArtificielle: 'Intelligence artificielle',
  JeuxVideos: 'Jeux vidéos',
  MaitriseDesOutilsNumeriques: 'Maîtrise des outils numériques',
  MaterielReconditionne: 'Matériel reconditionné',
  Mobilites: 'Mobilités',
  EcoconceptionDeServicesNumeriques: 'Écoconception de services numériques',
  UsagesResponsablesDuNumerique: 'Usages responsables du numérique',
  NumeriqueAuServiceDeLEnvironnement: 'Numérique au service de l’environnement',
  TerritoiresConnectesEtDurables: 'Territoires connectés et durables',
  NavigationSurInternet: 'Navigation sur Internet',
  NumeriqueEnSante: 'Numérique en santé',
  OpenSourceEtLicencesLibres: 'Open source et licences libres',
  Parentalite: 'Parentalité',
  RisquesCyberEtProtection: 'Risques cyber et protection',
  SobrieteNumerique: 'Sobriété numérique',
  SouveraineteNumeriqueEtHebergementDesDonnees:
    'Souveraineté numérique & hébergement des données',
  UsageDuMaterielInformatique: 'Usage du matériel informatique',
}

export const themeCategories: { [theme in Theme]: Category } = {
  DiagnosticDeCompetencesNumeriques: 'Inclusion & compétences numériques',
  DemarchesEtServicesEnLigne: 'Inclusion & compétences numériques',
  MaitriseDesOutilsNumeriques: 'Inclusion & compétences numériques',
  NavigationSurInternet: 'Inclusion & compétences numériques',
  UsageDuMaterielInformatique: 'Inclusion & compétences numériques',
  Accessibilite: 'Inclusion & compétences numériques',
  InclusionNumerique: 'Inclusion & compétences numériques',
  SobrieteNumerique: 'Numérique & environnement',
  MaterielReconditionne: 'Numérique & environnement',
  Mobilites: 'Numérique & environnement',
  EcoconceptionDeServicesNumeriques: 'Numérique & environnement',
  UsagesResponsablesDuNumerique: 'Numérique & environnement',
  NumeriqueAuServiceDeLEnvironnement: 'Numérique & environnement',
  TerritoiresConnectesEtDurables: 'Numérique & environnement',
  ActeursDuNumerique: 'Culture numérique',
  ArtsEtCulture: 'Culture numérique',
  CitoyenneteEtEngagement: 'Culture numérique',
  Donnees: 'Culture numérique',
  CodeEtProgrammation: 'Culture numérique',
  CommunicationEnLigneEtReseauxSociaux: 'Culture numérique',
  EducationEtFormation: 'Culture numérique',
  EmploiEtEntrepreunariat: 'Culture numérique',
  JeuxVideos: 'Culture numérique',
  NumeriqueEnSante: 'Culture numérique',
  Parentalite: 'Culture numérique',
  RisquesCyberEtProtection: 'Culture numérique',
  CommunsNumeriques: 'Communs & souveraineté',
  EconomieNumerique: 'Communs & souveraineté',
  GouvernancesPartagees: 'Communs & souveraineté',
  IntelligenceArtificielle: 'Communs & souveraineté',
  OpenSourceEtLicencesLibres: 'Communs & souveraineté',
  SouveraineteNumeriqueEtHebergementDesDonnees: 'Communs & souveraineté',
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
