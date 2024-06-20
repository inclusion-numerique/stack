import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const servicesStructureLabels = {
  Todo: 'todo',
}

export type ServicesStructure = keyof typeof servicesStructureLabels

export const servicesStructureOptions = labelsToOptions(servicesStructureLabels)

export const thematiquesStructureLabels = {
  Todo: 'todo',
}

export type ThematiquesStructure = keyof typeof thematiquesStructureLabels

export const thematiquesStructureOptions = labelsToOptions(
  thematiquesStructureLabels,
)

export const typesAccompagnementStructureLabels = {
  Todo: 'todo',
}

export type TypesAccompagnementStructure =
  keyof typeof typesAccompagnementStructureLabels

export const typesAccompagnementStructureOptions = labelsToOptions(
  typesAccompagnementStructureLabels,
)

export const fraisAChargeStructureLabels = {
  Todo: 'todo',
}

export type FraisAChargeStructure = keyof typeof fraisAChargeStructureLabels

export const fraisAChargeStructureOptions = labelsToOptions(
  fraisAChargeStructureLabels,
)

export const priseEnChargeSpecifiqueStructureLabels = {
  Todo: 'todo',
}

export type PriseEnChargeSpecifiqueStructure =
  keyof typeof priseEnChargeSpecifiqueStructureLabels

export const priseEnChargeSpecifiqueStructureOptions = labelsToOptions(
  priseEnChargeSpecifiqueStructureLabels,
)

export const publicsAccueillisStructureLabels = {
  Todo: 'todo',
}

export type PublicsAccueillisStructure =
  keyof typeof publicsAccueillisStructureLabels

export const publicsAccueillisStructureOptions = labelsToOptions(
  publicsAccueillisStructureLabels,
)
