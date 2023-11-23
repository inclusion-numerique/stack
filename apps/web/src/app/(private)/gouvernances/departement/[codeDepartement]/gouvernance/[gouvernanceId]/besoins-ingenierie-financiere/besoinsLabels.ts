export const simpleBesoinsLabels = {
  faireUnDiagnosticTerritorial: 'Établir un diagnostic territorial',
  coConstruireLaFeuilleDeRoute:
    'Co-construire la feuille de route avec les acteurs du territoire',
  redigerLaFeuilleDeRoute: 'Rédiger la feuille de route',
  creerUnVehiculeJuridique: 'Appui juridique dédié à la gouvernance',
  formaliserLaFeuilleDeRouteAutre: 'Autre',
  structurerUnFondsLocal:
    'Structurer un fonds local pour l’inclusion numérique',
  monterDesDossiersDeSubvention:
    'Monter de dossiers de subvention complexes (ex : FSE)',
  animerEtMettreEnOeuvre:
    'Animer et mettre en œuvre la gouvernance et la feuille de route',
  financerLeDeploiementAutre: 'Autre',
  structurerUneFiliereDeReconditionnement:
    'Structurer une filière de reconditionnement locale',
  collecterDesDonneesTerritoriales:
    'Collecter des données territoriales pour alimenter la plateforme de données nationale',
  sensibiliserLesActeurs:
    'Sensibiliser les acteurs de l’inclusion numérique aux outils existants (PIX, La Base…)',
  outillerLesActeursAutre: 'Autre',
} as const
export const formationsLabels = {
  formerLesAgentsPublics:
    'Former les agents publics à l’inclusion numérique (ex : secrétaires de mairie, travailleurs sociaux..)',
  formerLesSalariesAssociatifs:
    'Former les salariés associatifs à l’inclusion numérique',
  appuyerLaCertificationQualiopi:
    'Appuyer la certification Qualiopi de structures privées portant des formations à l’inclusion numérique',
  formerLesProfessionnelsAutre: 'Autre',
} as const

export const besoinsLabels = {
  ...simpleBesoinsLabels,
  ...formationsLabels,
} as const

export const besoinsCategoriesLabels = {
  formaliserLaFeuilleDeRoute: 'Formaliser la feuille de route',
  financerLeDeploiement: 'Financer le déploiement',
  formerLesProfessionnels: 'Former les professionnels',
  outillerLesActeurs: 'Outiller les acteurs',
}
