import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const roleSlugs = [
  'conseiller-numerique',
  'mediateur',
  'coordinateur',
  'administrateur',
] as const

export type Role =
  | 'ConseillerNumerique'
  | 'Mediateur'
  | 'Coordinateur'
  | 'Administrateur'

export type RoleSlug = (typeof roleSlugs)[number]

export const roleLabels: {
  [key in Role]: string
} = {
  ConseillerNumerique: 'Conseiller numérique',
  Mediateur: 'Médiateur',
  Coordinateur: 'Coordinateur',
  Administrateur: 'Administrateur',
}

export const roleForSlug: { [key in RoleSlug]: Role } = {
  'conseiller-numerique': 'ConseillerNumerique',
  mediateur: 'Mediateur',
  coordinateur: 'Coordinateur',
  administrateur: 'Administrateur',
}

export const roleSlugLabels: {
  [key in RoleSlug]: string
} = {
  'conseiller-numerique': roleLabels[roleForSlug['conseiller-numerique']],
  mediateur: roleLabels[roleForSlug.mediateur],
  coordinateur: roleLabels[roleForSlug.coordinateur],
  administrateur: roleLabels[roleForSlug.administrateur],
}

export const roleSlugOptions = labelsToOptions(roleSlugLabels)
