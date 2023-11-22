export const simpleBesoinsLabels = {
  faireUnDiagnosticTerritorial: 'Établir un diagnostic territorial',
  coConstruireLaFeuilleDeRoute:
    'Co-construire la feuille de route avec les acteurs du territoire',
  redigerLaFeuilleDeRoute: 'Rédiger la feuille de route',
  creerUnVehiculeJuridique: 'Appui juridique dédié à la gouvernance',
  formaliserLaFeuilleDeRouteAutre: 'Autre',
  structurerUnFondsLocal: 'Structurer un fonds local',
  monterDesDossiersDeSubvention: 'Monter des dossiers de subvention',
  animerEtMettreEnOeuvre: 'Animer et mettre en œuvre la feuille de route',
  financerLeDeploiementAutre: 'Autre',
  structurerUneFiliereDeReconditionnement:
    'Structurer une filière de reconditionnement',
  collecterDesDonneesTerritoriales: 'Collecter des données territoriales',
  sensibiliserLesActeurs: 'Sensibiliser les acteurs',
  outillerLesActeursAutre: 'Autre',
} as const
export const formationsLabels = {
  formerLesAgentsPublics: 'Former les agents publics',
  formerLesSalariesAssociatifs: 'Former les salariés associatifs',
  appuyerLaCertificationQualiopi: 'Appuyer la certification Qualiopi',
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
