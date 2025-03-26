import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { Autonomie, ThematiqueDemarcheAdministrative } from '@prisma/client'

export const autonomieLabels: {
  [key in Autonomie]: string
} = {
  EntierementAccompagne: 'Avec guidage',
  PartiellementAutonome: 'Autonome avec guidage en cas de besoin',
  Autonome: 'Autonome',
}

export const autonomieApiValues = {
  EntierementAccompagne: 'entierement_accompagne',
  PartiellementAutonome: 'partiellement_autonome',
  Autonome: 'autonome',
} as const satisfies {
  [key in Autonomie]: string
}

// Same thing as thematiques for ThematiqueDemarcheAdministrative
export const thematiqueDemarcheAdministrativeLabels: {
  [key in ThematiqueDemarcheAdministrative]: string
} = {
  PapiersElectionsCitoyennete: 'Papiers - Élections Citoyenneté',
  FamilleScolarite: 'Famille - Scolarité',
  SocialSante: 'Social - Santé',
  TravailFormation: 'Travail - Formation',
  Logement: 'Logement',
  TransportsMobilite: 'Transports - Mobilité',
  ArgentImpots: 'Argent - Impôts',
  Justice: 'Justice',
  EtrangersEurope: 'Étrangers - Europe',
  LoisirsSportsCulture: 'Loisirs - Sports Culture',
}

export const thematiqueDemarcheAdministrativeIllustrations: {
  [key in ThematiqueDemarcheAdministrative]?: string
} = {
  PapiersElectionsCitoyennete: '/images/iconographie/thematique-papiers.svg',
  FamilleScolarite: '/images/iconographie/mednum-scolarite.svg',
  SocialSante: '/images/iconographie/thematique-sante.svg',
  TravailFormation: '/images/iconographie/thematique-travail.svg',
  Logement: '/images/iconographie/thematique-logement.svg',
  TransportsMobilite: '/images/iconographie/thematique-transports.svg',
  ArgentImpots: '/images/iconographie/thematique-argent.svg',
  Justice: '/images/iconographie/thematique-justice.svg',
  EtrangersEurope: '/images/iconographie/thematique-etranger.svg',
  LoisirsSportsCulture: '/images/iconographie/thematique-loisirs.svg',
}

export const thematiqueDemarcheAdministrativeHints: {
  [key in ThematiqueDemarcheAdministrative]?: string[]
} = {
  PapiersElectionsCitoyennete: [
    'État-civil, Passeport, Élections, Papiers à conserver, Carte d’identité...',
    'ANTS · Défenseur des droits',
  ],
  FamilleScolarite: [
    'Allocations familiales, Naissance, Mariage, Pacs, Scolarité...',
    'CAF · EduConnect · ameli.fr',
  ],
  SocialSante: [
    'Carte vitale, Chômage, Handicap, RSA, Personnes âgées...',
    'ameli.fr · MSA',
  ],
  TravailFormation: [
    'CDD, Concours, Retraite, Démission, Période d’essai...',
    'Pôle Emploi · Mon compte formation · info-retraite.fr',
  ],
  Logement: [
    'Allocations logement, Permis de construire, Logement social, Fin de bail...',
    'CAF · Enedis',
  ],
  TransportsMobilite: [
    'Carte grise, Permis de conduire, Contrôle technique, Infractions...',
    'ANTS · ANTAI · Crit’air',
  ],
  ArgentImpots: [
    'Crédit immobilier, Impôts, Consommation, Livret A, Assurance, Surendettement...',
    'impots.gouv.fr · Timbres fiscaux',
  ],
  Justice: [
    'Casier judiciaire, Plainte, Aide juridictionnelle, Saisie...',
    'Télérecours citoyens',
  ],
  EtrangersEurope: [
    'Titres de séjour, Attestation d’accueil, Regroupement familial...',
    'OFPRA',
  ],
  LoisirsSportsCulture: [
    'Animaux, Permis bateau, Tourisme, Permis de chasser...',
    'Ariane',
  ],
}

export const thematiqueDemarcheAdministrativeOptions = labelsToOptions(
  thematiqueDemarcheAdministrativeLabels,
)

export const thematiqueDemarcheAdministrativeValues = Object.keys(
  thematiqueDemarcheAdministrativeLabels,
) as [ThematiqueDemarcheAdministrative, ...ThematiqueDemarcheAdministrative[]]

export const thematiqueDemarcheAdministrativeOptionsWithExtras =
  thematiqueDemarcheAdministrativeOptions.map(({ label, value }) => ({
    label,
    value,
    extra: {
      tooltips: thematiqueDemarcheAdministrativeHints[value],
      illustration: thematiqueDemarcheAdministrativeIllustrations[value],
    },
  }))

export const thematiqueDemarcheAdministrativeApiValues = {
  PapiersElectionsCitoyennete: 'papiers_elections_citoyennete',
  FamilleScolarite: 'famille_scolarite',
  SocialSante: 'social_sante',
  TravailFormation: 'travail_formation',
  Logement: 'logement',
  TransportsMobilite: 'transports_mobilite',
  ArgentImpots: 'argent_impots',
  Justice: 'justice',
  EtrangersEurope: 'etrangers_europe',
  LoisirsSportsCulture: 'loisirs_sports_culture',
} as const satisfies {
  [key in ThematiqueDemarcheAdministrative]: string
}

export const autonomieStars: {
  [key in Autonomie]: number
} = {
  EntierementAccompagne: 1,
  PartiellementAutonome: 2,
  Autonome: 3,
}

export const autonomieOptions = labelsToOptions(autonomieLabels)

export const autonomieValues = Object.keys(autonomieLabels) as [
  Autonomie,
  ...Autonomie[],
]

export const autonomieOptionsWithExtras = autonomieOptions.map(
  ({ label, value }) => ({
    label,
    value,
    extra: {
      stars: autonomieStars[value],
      maxStars: 3,
    },
  }),
)
