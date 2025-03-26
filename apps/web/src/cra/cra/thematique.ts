import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { Thematique } from '@prisma/client'

export const thematiqueLabels: {
  [key in Thematique]: string
} = {
  DiagnosticNumerique: 'Diagnostic numérique',
  PrendreEnMainDuMateriel: 'Prendre en main du matériel',
  MaintenanceDeMateriel: 'Maintenance de matériel',
  GereSesContenusNumeriques: 'Gérer ses contenus numériques',
  NavigationSurInternet: 'Navigation sur internet',
  Email: 'E-mail',
  Bureautique: 'Bureautique',
  ReseauxSociaux: 'Réseaux sociaux communication',
  Sante: 'Santé',
  BanqueEtAchatsEnLigne: 'Banque et achats en ligne',
  Entrepreneuriat: 'Accompagner un professionnel',
  InsertionProfessionnelle: 'Insertion professionnelle',
  SecuriteNumerique: 'Prévention en sécurité numérique',
  Parentalite: 'Parentalité',
  ScolariteEtNumerique: 'Scolarité et numérique',
  CreerAvecLeNumerique: 'Créer avec le numérique',
  CultureNumerique: 'Culture numérique',
  IntelligenceArtificielle: 'Intelligence artificielle (IA)',
}

export const thematiqueShortLabels = {
  ...thematiqueLabels,
  ReseauxSociaux: 'Réseaux sociaux',
  SecuriteNumerique: 'Sécurité numérique',
  IntelligenceArtificielle: 'Intelligence artificielle',
}

export const thematiqueHints: {
  [key in Thematique]?: string[]
} = {
  DiagnosticNumerique: [
    'Évaluation des compétences numériques des bénéficiaires',
    'Réaliser un questionnaire d’évaluation (ex : ABC Diag de Pix)',
  ],
  PrendreEnMainDuMateriel: [
    'Utiliser un ordinateur, une tablette ou un smartphone',
    'Utiliser des périphériques (réseau wifi, clé USB, imprimante, scanner…)',
    'Connaître & configurer les outils de base',
  ],
  MaintenanceDeMateriel: [
    'Maintenance de niveau 1',
    'Installation et paramétrage de matériel informatique',
    'Mise à jour des systèmes, installer/désinstaller outils et applications...',
  ],
  GereSesContenusNumeriques: [
    'Organiser, stocker et retrouver des données, des informations et des contenus dans des environnements numériques',
    'ex. : base de données, espace de stockage en ligne, gestionnaire de fichiers...',
  ],
  NavigationSurInternet: [
    'Faire une recherche',
    'Naviguer sur internet',
    'Me connecter, remplir un formulaire…',
  ],
  Email: [
    'Choisir & créer une boîte mail',
    'Envoyer et consulter des mails',
    'Envoyer et recevoir des documents',
  ],
  Bureautique: [
    'Outils de traitement de texte, tableur…',
    'Gérer mes documents',
  ],
  ReseauxSociaux: [
    'Maintenir un lien social avec les réseaux sociaux.',
    'Utiliser son téléphone pour communiquer : Mails, Sms, Whatsapp, etc.',
    'Prendre en main un logiciel de visioconférence.',
  ],
  Sante: [
    'Ameli',
    'Mon Espace Santé',
    'Prendre rendez-vous chez un spécialiste (Doctolib…)',
  ],
  BanqueEtAchatsEnLigne: [
    'Application bancaire',
    'Effectuer un achat en ligne',
    'Gérer son budget (tableurs, etc.)',
  ],
  Entrepreneuriat: [
    'Créer mon entreprise',
    'Communication professionnelle (Site internet, réseaux sociaux…)',
    'Outils pour gérer mon entreprise : comptabilité, gestion, collaboration, etc.',
  ],
  InsertionProfessionnelle: [
    'France Travail, Mon Compte Formation…',
    'Créer & diffuser son CV en ligne',
    'Rechercher un emploi en ligne',
  ],
  SecuriteNumerique: [
    'Me connecter sans risque',
    'Protéger mes informations personnelles',
    'Reconnaître les sites et messages frauduleux',
  ],
  Parentalite: [
    'Utiliser une plateforme de suivi scolaire',
    'Sites et logiciels éducatifs',
    'Dangers pour mon enfant & harcèlement',
  ],
  ScolariteEtNumerique: [
    'Accompagner un groupe scolaire et/ou un enfant sur un outil numérique',
    'Évaluer le niveau des jeunes avec un logiciel (maths, français, etc.)',
  ],
  CreerAvecLeNumerique: [
    'Création / gestion de médias : photos, vidéos, illustrations',
    'Fablabs : impression 3D, code',
  ],
  CultureNumerique: [
    'Usages responsables du numérique',
    'Fake news, éducation aux médias',
    'Citoyenneté & engagement',
    'RGPD, Open Source, Licences libres…',
  ],
  IntelligenceArtificielle: [
    'Comprendre les enjeux autour de l’IA',
    'Utiliser et interagir de manière critique avec les outils d’IA',
    'Animer un Café IA dans le cadre d’un atelier collectif',
  ],
}

export const thematiqueIllustrations: {
  [key in Thematique]?: string
} = {
  DiagnosticNumerique: '/images/iconographie/mednum-diagnostic.svg',
  PrendreEnMainDuMateriel: '/images/iconographie/mednum-materiel.svg',
  MaintenanceDeMateriel: '/images/iconographie/mednum-maintenance.svg',
  GereSesContenusNumeriques: '/images/iconographie/mednum-contenus.svg',
  NavigationSurInternet: '/images/iconographie/mednum-internet.svg',
  Email: '/images/iconographie/mednum-email.svg',
  Bureautique: '/images/iconographie/mednum-bureautique.svg',
  ReseauxSociaux: '/images/iconographie/mednum-reseaux-sociaux.svg',
  Sante: '/images/iconographie/mednum-sante.svg',
  BanqueEtAchatsEnLigne: '/images/iconographie/thematique-argent.svg',
  Entrepreneuriat: '/images/iconographie/thematique-travail.svg',
  InsertionProfessionnelle: '/images/iconographie/mednum-insertion.svg',
  SecuriteNumerique: '/images/iconographie/mednum-securite.svg',
  Parentalite: '/images/iconographie/mednum-parentalite.svg',
  ScolariteEtNumerique: '/images/iconographie/mednum-scolarite.svg',
  CreerAvecLeNumerique: '/images/iconographie/mednum-creer.svg',
  CultureNumerique: '/images/iconographie/mednum-culture-numerique.svg',
  IntelligenceArtificielle:
    '/images/iconographie/intelligence-artificielle.svg',
}

export const thematiqueOptions = labelsToOptions(thematiqueLabels)

export const thematiqueOptionsWithExtras = thematiqueOptions.map(
  ({ label, value }) => ({
    label,
    value,
    extra: {
      tooltips: thematiqueHints[value],
      illustration: thematiqueIllustrations[value],
    },
  }),
)

export const thematiqueValues = Object.keys(thematiqueLabels) as [
  Thematique,
  ...Thematique[],
]

export const thematiqueApiValues = {
  DiagnosticNumerique: 'diagnostic_numerique',
  PrendreEnMainDuMateriel: 'prendre_en_main_du_materiel',
  MaintenanceDeMateriel: 'maintenance_de_materiel',
  GereSesContenusNumeriques: 'gere_ses_contenus_numeriques',
  NavigationSurInternet: 'navigation_sur_internet',
  Email: 'email',
  Bureautique: 'bureautique',
  ReseauxSociaux: 'reseaux_sociaux',
  Sante: 'sante',
  BanqueEtAchatsEnLigne: 'banque_et_achats_en_ligne',
  Entrepreneuriat: 'entrepreneuriat',
  InsertionProfessionnelle: 'insertion_professionnelle',
  SecuriteNumerique: 'securite_numerique',
  Parentalite: 'parentalite',
  ScolariteEtNumerique: 'scolarite_et_numerique',
  CreerAvecLeNumerique: 'creer_avec_le_numerique',
  CultureNumerique: 'culture_numerique',
  IntelligenceArtificielle: 'intelligence_artificielle',
} as const satisfies {
  [key in Thematique]: string
}
