import type { Genre, StatutSocial, TrancheAge } from '@prisma/client'
import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const genreLabels: { [key in Genre]: string } = {
  Masculin: 'Masculin',
  Feminin: 'Féminin',
  NonCommunique: 'Non communiqué',
}

export const sexLabels: { [key in Genre]: string } = {
  Masculin: 'Homme',
  Feminin: 'Femme',
  NonCommunique: 'Non communiqué',
}

export const genreOptions = labelsToOptions(genreLabels)

export const genreValues = Object.keys(genreLabels) as [Genre, ...Genre[]]

export const trancheAgeLabels: {
  [key in TrancheAge]: string
} = {
  Mineur: 'Mineur(e)',
  DixHuitVingtQuatre: '18 - 24 ans',
  VingtCinqTrenteNeuf: '25 - 39 ans',
  QuaranteCinquanteNeuf: '40 - 59 ans',
  SoixanteSoixanteNeuf: '60 - 69 ans',
  SoixanteDixPlus: '70 ans ou plus',
  NonCommunique: 'Non communiqué',
}

export const trancheAgeOptions = labelsToOptions(trancheAgeLabels)

export const trancheAgeValues = Object.keys(trancheAgeLabels) as [
  TrancheAge,
  ...TrancheAge[],
]

export const statutSocialLabels: {
  [key in StatutSocial]: string
} = {
  Scolarise: 'Scolarisé(e)',
  SansEmploi: 'Sans emploi',
  EnEmploi: 'En emploi',
  Retraite: 'Retraité(e)',
  NonCommunique: 'Non communiqué ou hétérogène',
}

export const statutSocialOptions = labelsToOptions(statutSocialLabels)

export const statutSocialValues = Object.keys(statutSocialLabels) as [
  StatutSocial,
  ...StatutSocial[],
]
