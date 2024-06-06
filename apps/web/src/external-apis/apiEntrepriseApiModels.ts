/**
 * Types from https://recherche-entreprises.api.gouv.fr/docs/#tag/Recherche-textuelle/paths/~1search/get
 */

export type UniteLegale = {
  siren: string // le numéro unique de l'entreprise
  nom_complet: string // Champs construit depuis les champs de dénomination
  nom_raison_sociale: string // La raison sociale pour les personnes morales
  sigle?: string // Forme réduite de la raison sociale ou de la dénomination (Nullable)
  nombre_etablissements: number // Nombre des établissements de l'unité légale
  nombre_etablissements_ouverts: number // Nombre des établissements ouverts de l'unité légale
  siege: Siege // Objet contenant les informations sur le siège de l'unité légale
  date_creation: string // Date de création de l'unité légale
  date_fermeture?: string // Date de fermeture de l'unité légale (Nullable)
  tranche_effectif_salarie: string // Tranche d'effectif salarié de l'unité légale
  annee_tranche_effectif_salarie: string // Année de validité de la tranche d'effectif salarié
  date_mise_a_jour: string // Date de la dernière modification d'une variable de niveau unité légale
  categorie_entreprise: string // Catégorie d'entreprise de l'unité légale
  caractere_employeur: string // Caractère employeur de l'unité légale
  annee_categorie_entreprise: string // Année de validité correspondant à la catégorie d'entreprise
  etat_administratif: string // État administratif de l'unité légale
  nature_juridique: string // Catégorie juridique de l'unité légale
  activite_principale: string // Code de l'activité principale exercée (APE)
  section_activite_principale: string // Calculée à partir de l'activité principale
  statut_diffusion: string // Statut de diffusion de l'unité légale
  matching_etablissements: Array<MatchingEtablissement> // Liste des établissements correspondants
  dirigeants: Array<Dirigeant> // Liste des dirigeants (personnes physiques ou morales)
  finances?: Finances // Objet contenant les informations financières (Nullable)
  complements?: Complements // Objet contenant les informations complémentaires (Nullable)
}

export type Siege = {
  activite_principale: string // Activité principale de l'établissement
  activite_principale_registre_metier?: string // Activité principale de l'établissement au Registre des Métiers (Nullable)
  annee_tranche_effectif_salarie?: string // Année de validité de la tranche d'effectif salarié de l'établissement (Nullable)
  adresse: string // Adresse complète de l'établissement
  caractere_employeur: string // Caractère employeur du siège
  cedex?: string // Code cedex de l'établissement (Nullable)
  code_pays_etranger?: string // Code pays de l'adresse de l'établissement à l'étranger (Nullable)
  code_postal?: string // Code postal de l'adresse de l'établissement (Nullable)
  commune?: string // Code géographique de la commune de localisation de l'établissement (Nullable)
  complement_adresse?: string // Complément d'adresse de l'établissement (Nullable)
  date_creation?: string // Date de création de l'établissement (Nullable)
  date_fermeture?: string // Date de fermeture de l'établissement (Nullable)
  date_debut_activite?: string // Date de début d'une période de l'historique de l'établissement (Nullable)
  date_mise_a_jour?: string // Date du dernier traitement de l'établissement (Nullable)
  departement?: string // Code département de l'établissement (Nullable)
  distribution_speciale?: string // Distribution spéciale de l'établissement (Nullable)
  est_siege: boolean // Indique si l'établissement est le siège de l'unité légale
  etat_administratif: string // État administratif de l'établissement (A : Actif, F : Fermé)
  geo_id?: string // Identifiant géographique de l'adresse de l'établissement (Nullable)
  indice_repetition?: string // Indice de répétition du numéro dans la voie (Nullable)
  latitude: string // Latitude de l'établissement
  libelle_cedex?: string // Libellé associé au code cedex (Nullable)
  libelle_commune: string // Libellé de la commune
  libelle_commune_etranger?: string // Libellé de la commune pour un établissement à l'étranger (Nullable)
  libelle_pays_etranger?: string // Libellé du pays pour un établissement à l'étranger (Nullable)
  libelle_voie: string // Libellé de la voie
  liste_enseignes?: string[] // Liste des enseignes de l'établissement (Nullable)
  liste_finess?: string[] // Liste des identifiants FINESS de l'établissement (Nullable)
  liste_idcc: string[] // Liste des conventions collectives de l'établissement
  liste_id_bio: string[] // Liste des identifiants bio de l'établissement
  liste_rge: string[] // Liste des identifiants RGE de l'établissement
  liste_uai: string[] // Liste des identifiants UAI de l'établissement
  longitude: string // Longitude de l'établissement
  nom_commercial?: string // Dénomination usuelle de l'établissement (Nullable)
  numero_voie: string // Numéro dans la voie
  region?: string // Code région de l'établissement (Nullable)
  epci?: string // Numéro siren de l'EPCI (Nullable)
  siret: string // Numéro unique de l'établissement siège
  tranche_effectif_salarie: string // Tranche d'effectif salarié de l'établissement
  type_voie: string // Type de voie de l'adresse
}

export type MatchingEtablissement = {
  activite_principale: string // Activité principale de l'établissement
  adresse: string // Adresse complète de l'établissement
  caractere_employeur: string // Caractère employeur de l'établissement
  commune: string // Code géographique de la commune de localisation de l'établissement
  est_siege: boolean // Indique si l'établissement est le siège de l'unité légale
  etat_administratif: string // État administratif de l'établissement (A : Actif, F : Fermé)
  geo_id?: string // Identifiant géographique de l'adresse de l'établissement (Nullable)
  latitude: string // Latitude de l'établissement
  libelle_commune: string // Libellé de la commune
  liste_enseignes?: string[] // Liste des enseignes de l'établissement (Nullable)
  liste_finess?: string[] // Liste des identifiants FINESS de l'établissement (Nullable)
  liste_idcc: string[] // Liste des conventions collectives de l'établissement
  liste_rge: string[] // Liste des identifiants RGE de l'établissement
  liste_uai: string[] // Liste des identifiants UAI de l'établissement
  longitude: string // Longitude de l'établissement
  nom_commercial?: string // Dénomination usuelle de l'établissement (Nullable)
  region?: string // Région de l'établissement (Nullable)
  epci?: string // Numéro siren de l'EPCI (Nullable)
  siret: string // Numéro unique de l'établissement
  tranche_effectif_salarie?: string // Tranche d'effectif salarié de l'établissement (Nullable)
  dirigeants: Array<Dirigeant> // Liste des dirigeants (personnes physiques ou morales)
  finances?: Finances // Informations financières (Nullable)
  complements?: Complements // Informations complémentaires (Nullable)
  collectivite_territoriale?: CollectiviteTerritoriale // Informations sur la collectivité territoriale (Nullable)
  convention_collective_renseignee: boolean // Indique si une convention collective est renseignée
  egapro_renseignee: boolean // Indique si un indice égalité H/F est renseigné
  est_association: boolean // Indique si l'entreprise est une association
  est_bio: boolean // Indique si l'entreprise est certifiée bio
  est_entrepreneur_individuel: boolean // Indique si l'entreprise est individuelle
  est_entrepreneur_spectacle: boolean // Indique si l'entreprise a une licence d'entrepreneur du spectacle
  est_ess: boolean // Indique si l'entreprise appartient à l'économie sociale et solidaire
  est_finess: boolean // Indique si l'entreprise a un établissement FINESS
  est_organisme_formation: boolean // Indique si l'entreprise est un organisme de formation
  est_qualiopi: boolean // Indique si l'entreprise est certifiée Qualiopi
  liste_id_organisme_formation: string[] // Liste des numéros de déclaration d’activité des établissements organismes de formation
  est_rge: boolean // Indique si l'entreprise est reconnue garante de l'environnement
  est_siae: boolean // Indique si l'entreprise est une structure d'insertion par l'activité économique
  est_service_public: boolean // Indique si l'entreprise est reconnue comme service public
  est_societe_mission: boolean // Indique si l'entreprise est une société à mission
  est_uai: boolean // Indique si l'entreprise a un établissement UAI
  identifiant_association?: string // Numéro au Répertoire National des Associations (Nullable)
  statut_bio: boolean // Statut des établissements ayant fait une demande de certification bio
  statut_entrepreneur_spectacle?: string // Statut des établissements ayant fait une demande de licence d'entrepreneur du spectacle (Nullable)
  type_siae?: string // Type de structure de l'inclusion (Nullable)
}

export type Dirigeant = DirigeantPP | DirigeantPM

type DirigeantPP = {
  nom: string // Nom du dirigeant
  prenoms: string // Prénom(s) du dirigeant
  annee_de_naissance: string // Année de naissance du dirigeant
  date_de_naissance: string // Année et mois de naissance du dirigeant
  qualite: string // Qualité du dirigeant
  nationalite: string // Nationalité du dirigeant
  type_dirigeant: 'personne physique' // Type de dirigeant : personne physique
}

type DirigeantPM = {
  nom: string // Nom du dirigeant
  prenoms?: string // Prénom(s) du dirigeant (Nullable)
  qualite: string // Qualité du dirigeant
  nationalite: string // Nationalité du dirigeant
  type_dirigeant: 'personne morale' // Type de dirigeant : personne morale
}

export type Finances = {
  // Ajoutez ici les propriétés financières si elles sont définies
}

export type Complements = {
  collectivite_territoriale: CollectiviteTerritoriale // Informations sur la collectivité territoriale
  convention_collective_renseignee: boolean // Indique si au moins un établissement a une convention collective renseignée
  egapro_renseignee: boolean // Indique si au moins un établissement a un indice égalité professionnel H/F renseigné
  est_association: boolean // Indique si l'entreprise est une association
  est_bio: boolean // Indique si l'entreprise a au moins un établissement certifié bio
  est_entrepreneur_individuel: boolean // Indique si l'entreprise est individuelle
  est_entrepreneur_spectacle: boolean // Indique si l'entreprise a une licence d'entrepreneur du spectacle
  est_ess: boolean // Indique si l'entreprise appartient à l'économie sociale et solidaire
  est_finess: boolean // Indique si l'entreprise a au moins un établissement FINESS
  est_organisme_formation: boolean // Indique si l'entreprise est un organisme de formation
  est_qualiopi: boolean // Indique si l'entreprise a une certification de la marque « Qualiopi »
  liste_id_organisme_formation: string[] // Liste des numéros de déclaration d’activité des établissements organismes de formation
  est_rge: boolean // Indique si l'entreprise a au moins un établissement RGE
  est_siae: boolean // Indique si l'entreprise est une structure d'insertion par l'activité économique
  est_service_public: boolean // Indique si l'entreprise est reconnue comme service public
  est_societe_mission: boolean // Indique si l'entreprise est une société à mission
  est_uai: boolean // Indique si l'entreprise a au moins un établissement UAI
  identifiant_association?: string // Numéro au Répertoire National des Associations (Nullable)
  statut_bio: boolean // Statut des établissements ayant fait une demande de certification bio
  statut_entrepreneur_spectacle?: string // Statut des établissements ayant fait une demande de licence d'entrepreneur du spectacle (Nullable)
  type_siae?: string // Type de structure de l'inclusion (Nullable)
}
export type CollectiviteTerritoriale = {
  code_insee: string // Code INSEE de la collectivité territoriale
  code: string // Code de la collectivité territoriale
  niveau: string // Niveau de la collectivité territoriale
  elus: Array<Elu> // Liste des élus
}

export type Elu = {
  nom: string // Nom de l'élu
  prenoms: string // Prénom de l'élu
  annee_de_naissance: string // Année de naissance de l'élu
  fonction: string // Fonction de l'élu
  sexe: string // Sexe de l'élu
}
