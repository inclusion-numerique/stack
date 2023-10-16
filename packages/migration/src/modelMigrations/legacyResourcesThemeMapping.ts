import { Theme } from '@prisma/client'

export const legacyResourcesThemeMapping: {
  [legacyId: number]: Theme
} = {
  // 623,Accessibilité
  623: Theme.Accessibilite,
  // 79,Arts et culture
  // 541	BD
  79: Theme.ArtsEtCulture,
  541: Theme.ArtsEtCulture,
  // 83,Citoyenneté / engagement
  83: Theme.CitoyenneteEtEngagement,
  // 85,Code / programmation
  // 600, Blockchain
  85: Theme.CodeEtProgrammation,
  600: Theme.CodeEtProgrammation,
  // 90,Communication en ligne / réseaux sociaux
  90: Theme.CommunicationEnLigneEtReseauxSociaux,
  // 73,Entrepreneuriat
  73: Theme.EmploiEtEntrepreunariat,
  // 62,Harcèlement
  62: Theme.RisquesCyberEtProtection,
  // 655,cyberharcèlement
  655: Theme.RisquesCyberEtProtection,
  // 84,Intelligence artificielle
  84: Theme.IntelligenceArtificielle,
  // 77,Jeux Vidéos
  77: Theme.JeuxVideos,
  // 71,Mobilités
  71: Theme.Mobilites,
  // 68,Parentalité
  // 639	parentalité numérique
  68: Theme.Parentalite,
  639: Theme.Parentalite,
  // 63,Santé
  63: Theme.NumeriqueEnSante,
  // 94,Sécurité / protection
  94: Theme.RisquesCyberEtProtection,
  // 70,Travail
  70: Theme.EmploiEtEntrepreunariat,
  // 67,Education
  67: Theme.EducationEtFormation,
  // 74,Formation / éducation
  74: Theme.EducationEtFormation,
  // 92,Matériel informatique
  // 627	Ordinateur
  92: Theme.UsageDuMaterielInformatique,
  627: Theme.UsageDuMaterielInformatique,
  // 93,Services / démarches en ligne
  // 608	FranceConnect
  // 609	Démarches administratives
  93: Theme.DemarchesEtServicesEnLigne,
  608: Theme.DemarchesEtServicesEnLigne,
  609: Theme.DemarchesEtServicesEnLigne,

  // 91,Logiciels et outils numériques
  // 612	Email
  // 546	Multimédia
  91: Theme.MaitriseDesOutilsNumeriques,
  612: Theme.MaitriseDesOutilsNumeriques,
  546: Theme.MaitriseDesOutilsNumeriques,
  // 147,Communs numériques
  147: Theme.CommunsNumeriques,
  // 88,Economie numérique
  88: Theme.EconomieNumerique,
  // 632,Open source
  632: Theme.OpenSourceEtLicencesLibres,
  // 89,Sobriété numérique
  89: Theme.SobrieteNumerique,
  // 78,Energie / éco-gestes
  78: Theme.SobrieteNumerique,
  // 80, Illectronisme
  // 604, Difficultés
  80: Theme.InclusionNumerique,
  604: Theme.InclusionNumerique,
  // 81,Exclusion numérique
  81: Theme.InclusionNumerique,
  // 82,Numérique inclusif
  82: Theme.InclusionNumerique,
  // 545,Données
  // 633,Données personnelles
  // 617	Stockage en ligne
  633: Theme.Donnees,
  617: Theme.Donnees,
  545: Theme.Donnees, // Données

  // Tags customs
  550: Theme.MaitriseDesOutilsNumeriques, // photos/video

  613: Theme.MaitriseDesOutilsNumeriques, // Messagerie
  642: Theme.RisquesCyberEtProtection, // Cybersécurité
  538: Theme.DemarchesEtServicesEnLigne, // Habitat
  598: Theme.CommunicationEnLigneEtReseauxSociaux, // Réseaux Sociaux
  602: Theme.DemarchesEtServicesEnLigne, // Gestion budgétaire
  606: Theme.InclusionNumerique, // FranceNum
  610: Theme.DemarchesEtServicesEnLigne, // Facturation
  614: Theme.MaitriseDesOutilsNumeriques, // QR Code
  618: Theme.MaitriseDesOutilsNumeriques, // Cloud
  621: Theme.NavigationSurInternet, // Navigateur
  548: Theme.UsageDuMaterielInformatique, // Souris
  628: Theme.CodeEtProgrammation, // Robotique
  631: Theme.OpenSourceEtLicencesLibres, // Libre
  634: Theme.NavigationSurInternet, // Réseaux informatiques
  640: Theme.JeuxVideos, // Jeux vidéo
  643: Theme.Parentalite, // Gestion des écrans
  646: Theme.EmploiEtEntrepreunariat, // Emploi
  648: Theme.NavigationSurInternet, // Internet / Web
  650: Theme.InclusionNumerique, // Hub
  652: Theme.RisquesCyberEtProtection, // Sécurité numérique
  654: Theme.InclusionNumerique, // Tiers-lieu
  656: Theme.InclusionNumerique, // Dispositif CnFS
  658: Theme.EmploiEtEntrepreunariat, // Ingénierie pédagogique
  660: Theme.RisquesCyberEtProtection, // Désinformation
  662: Theme.InclusionNumerique, // Posture pédagogique
  664: Theme.InclusionNumerique, // Accompagnement des publics fragiles
  668: Theme.UsageDuMaterielInformatique, // Tablette / Smartphone
  670: Theme.UsageDuMaterielInformatique, // Cartes électroniques (Arduino / Raspberry...)
  672: Theme.InclusionNumerique, // Usagers
  674: Theme.Donnees, // Standard de donnée
  678: Theme.MaitriseDesOutilsNumeriques, // Partager
  682: Theme.MaitriseDesOutilsNumeriques, // Entretien
  539: Theme.EducationEtFormation, // Education numérique aux médias
  544: Theme.DemarchesEtServicesEnLigne, // Achats en ligne
  603: Theme.DemarchesEtServicesEnLigne, // Litiges
  611: Theme.DemarchesEtServicesEnLigne, // Aides
  615: Theme.MaitriseDesOutilsNumeriques, // Transfert de fichiers
  619: Theme.MaitriseDesOutilsNumeriques, // Bureautique
  540: Theme.UsageDuMaterielInformatique, // Clavier
  626: Theme.DemarchesEtServicesEnLigne, // Leboncoin
  641: Theme.InclusionNumerique, // Organisation professionnelle
  644: Theme.Parentalite, // Famille et numérique
  645: Theme.DemarchesEtServicesEnLigne, // Impôts
  647: Theme.NavigationSurInternet, // Moteur de recherche
  653: Theme.RisquesCyberEtProtection, // FakeNews
  657: Theme.UsageDuMaterielInformatique, // Smartphone
  659: Theme.RisquesCyberEtProtection, // Mot de passe
  669: Theme.UsageDuMaterielInformatique, // Impression 3D
  671: Theme.InclusionNumerique, // Offre de service
  675: Theme.MaitriseDesOutilsNumeriques, // playstore
  677: Theme.UsageDuMaterielInformatique, // Scanner
  679: Theme.MaitriseDesOutilsNumeriques, // Mémoire
  683: Theme.MaitriseDesOutilsNumeriques, // Nettoyage
  685: Theme.RisquesCyberEtProtection, // virus
  686: Theme.RisquesCyberEtProtection, // malware
  687: Theme.InclusionNumerique, // Diagnostic territorial
  688: Theme.CommunsNumeriques, // Associatif
  695: Theme.InclusionNumerique, // Financement
  696: Theme.ArtsEtCulture, // Education artistique et culturelle
  697: Theme.MaitriseDesOutilsNumeriques, // Geocaching
  700: Theme.EmploiEtEntrepreunariat, // Commerce
  701: Theme.EmploiEtEntrepreunariat, // Economie locale
  702: Theme.DemarchesEtServicesEnLigne, // caf
  703: Theme.DemarchesEtServicesEnLigne, // démarche administrative
  704: Theme.MaitriseDesOutilsNumeriques, // Tableur (Excel, Sheets, Libre Office)
  706: Theme.InclusionNumerique, // Territoires
}

export const getThemesFromLegacyTags = (
  resourceTags: { tag_id: bigint }[],
): Theme[] => {
  // Use a set to have unique themes only
  const themes = new Set<Theme>()
  for (const tag of resourceTags) {
    const theme = legacyResourcesThemeMapping[Number(tag.tag_id)]
    if (theme) {
      themes.add(theme)
    }
  }
  return [...themes]
}
