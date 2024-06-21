import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const servicesStructureLabels = {
  'Aide aux démarches administratives': 'Aide aux démarches administratives',
  'Maîtrise des outils numériques du quotidien':
    'Maîtrise des outils numériques du quotidien',
  'Insertion professionnelle via le numérique':
    'Insertion professionnelle via le numérique',
  'Utilisation sécurisée du numérique': 'Utilisation sécurisée du numérique',
  'Parentalité et éducation avec le numérique':
    'Parentalité et éducation avec le numérique',
  'Loisirs et créations numériques': 'Loisirs et créations numériques',
  'Comprehension du monde numérique': 'Comprehension du monde numérique',
  'Accès internet et matériel informatique':
    'Accès internet et matériel informatique',
  'Acquisition de matériel informatique à prix solidaire':
    'Acquisition de matériel informatique à prix solidaire',
}

export type ServicesStructure = keyof typeof servicesStructureLabels

export const servicesStructureOptions = labelsToOptions(servicesStructureLabels)

export const modalitesAccompagnementStructureLabels = {
  'En autonomie': 'En autonomie',
  'Accompagnement individuel': 'Accompagnement individuel',
  "Dans un atelier collectif : j'apprends collectivement à utiliser le numérique":
    'Atelier collectif',
  'À distance (par téléphone ou en visioconférence)': 'À distance',
}

export type ModaliteAccompagnementStructure =
  keyof typeof modalitesAccompagnementStructureLabels

export const modalitesAccompagnementStructureHints: {
  [key in ModaliteAccompagnementStructure]?: string
} = {
  'À distance (par téléphone ou en visioconférence)':
    'par téléphone ou en visioconférence',
}

export const modalitesAccompagnementStructureOptions = labelsToOptions(
  modalitesAccompagnementStructureLabels,
  { hints: modalitesAccompagnementStructureHints },
)

export const fraisAChargeStructureLabels = {
  Gratuit: 'Gratuit',
  'Gratuit sous condition': 'Gratuit sous condition',
  Payant: 'Payant',
}

export type FraisAChargeStructure = keyof typeof fraisAChargeStructureLabels

export const fraisAChargeStructureHints: {
  [key in FraisAChargeStructure]: string
} = {
  Gratuit: 'Accès gratuit au lieu et à ses services',
  'Gratuit sous condition':
    'La gratuité est conditionnée à des critères (adhésion, situation familiale, convention avec un organisme social, pass numériques…)',
  Payant: 'L’accès au lieu et/ou à ses services est payant',
}

export const fraisAChargeStructureOptions = labelsToOptions(
  fraisAChargeStructureLabels,
  { hints: fraisAChargeStructureHints },
)

export const priseEnChargeSpecifiqueStructureLabels = {
  Surdité: 'Surdité',
  'Handicaps moteurs': 'Handicaps moteurs',
  'Handicaps mentaux': 'Handicaps mentaux',
  Illettrisme: 'Illettrisme',
  'Langues étrangères (anglais)': 'Langues étrangères (anglais)',
  'Langues étrangères (autres)': 'Langues étrangères (autres)',
}

export type PriseEnChargeSpecifiqueStructure =
  keyof typeof priseEnChargeSpecifiqueStructureLabels

export const priseEnChargeSpecifiqueStructureOptions = labelsToOptions(
  priseEnChargeSpecifiqueStructureLabels,
)

export const publicsAccueillisStructureLabels = {
  Jeunes: 'Jeunes',
  Étudiants: 'Étudiants',
  'Familles et/ou enfants': 'Familles et/ou enfants',
  Seniors: 'Seniors',
  Femmes: 'Femmes',
}

export type PublicsAccueillisStructure =
  keyof typeof publicsAccueillisStructureLabels

export const publicsAccueillisStructureOptions = labelsToOptions(
  publicsAccueillisStructureLabels,
)

export const itineranceStructureLabels = {
  Itinérant: 'Itinérant',
  Fixe: 'Fixe',
}

export type ItineranceStructure = keyof typeof itineranceStructureLabels

export const itineranceStructureValues: {
  [key in ItineranceStructure]: ItineranceStructure
} = {
  Itinérant: 'Itinérant',
  Fixe: 'Fixe',
}

export const itineranceStructureOptions = labelsToOptions(
  itineranceStructureLabels,
)

export const modalitesAccesStructureLabels = {
  'Se présenter': 'Se présenter',
  Téléphoner: 'Téléphoner',
  'Contacter par mail': 'Contacter par mail',
  'Prendre un RDV en ligne': 'Prendre un RDV en ligne',
  'Ce lieu n’accueille pas de public': 'Ce lieu n’accueille pas de public',
  'Envoyer un mail avec une fiche de prescription':
    'Envoyer un mail avec une fiche de prescription',
}

export type ModalitesAccesStructure = keyof typeof modalitesAccesStructureLabels

export const modalitesAccesStructureValues: {
  [key in ModalitesAccesStructure]: ModalitesAccesStructure
} = {
  'Se présenter': 'Se présenter',
  Téléphoner: 'Téléphoner',
  'Contacter par mail': 'Contacter par mail',
  'Prendre un RDV en ligne': 'Prendre un RDV en ligne',
  'Ce lieu n’accueille pas de public': 'Ce lieu n’accueille pas de public',
  'Envoyer un mail avec une fiche de prescription':
    'Envoyer un mail avec une fiche de prescription',
}

export const modalitesAccesStructureOptions = labelsToOptions(
  modalitesAccesStructureLabels,
)
