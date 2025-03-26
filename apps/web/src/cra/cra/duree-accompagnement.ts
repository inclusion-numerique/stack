import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { dureeAsString } from '@app/web/utils/dureeAsString'

export const dureeAccompagnementPersonnaliseeValue = 'personnaliser'

export const dureeAccompagnementParDefautLabels = {
  '15': dureeAsString(15),
  '30': dureeAsString(30),
  '45': dureeAsString(45),
  '60': dureeAsString(60),
  '90': dureeAsString(90),
  '120': dureeAsString(120),
  [dureeAccompagnementPersonnaliseeValue]: 'Personnaliser',
} as const

export const dureeAccompagnementStatisticsRanges = [
  {
    key: '30',
    min: 0,
    max: 30,
    label: 'Moins de 30 min',
  },
  {
    key: '60',
    min: 30,
    max: 60,
    label: '30min à 1 h',
  },
  {
    key: '120',
    min: 60,
    max: 120,
    label: '1 h à 2 h',
  },
  {
    key: 'more',
    min: 120,
    max: null,
    label: '2 h et plus',
  },
]

export type DefaultDureeAccompagnementParDefaut =
  keyof typeof dureeAccompagnementParDefautLabels

export const dureeAcompagnementParDefautDefaultValues = Object.keys(
  dureeAccompagnementParDefautLabels,
) as [
  DefaultDureeAccompagnementParDefaut,
  ...DefaultDureeAccompagnementParDefaut[],
]

export const dureeAccompagnementParDefautOptions = labelsToOptions(
  dureeAccompagnementParDefautLabels,
)
