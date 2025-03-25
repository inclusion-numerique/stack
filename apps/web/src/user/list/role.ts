import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const roleSlugs = [
  'mediateur',
  'coordinateur',
  'administrateur',
] as const

export type Role = 'Mediateur' | 'Coordinateur' | 'Administrateur'

export type RoleSlug = (typeof roleSlugs)[number]

export const roleLabels: {
  [key in Role]: string
} = {
  Mediateur: 'Médiateur',
  Coordinateur: 'Coordinateur',
  Administrateur: 'Administrateur',
}

export const roleForSlug: { [key in RoleSlug]: Role } = {
  mediateur: 'Mediateur',
  coordinateur: 'Coordinateur',
  administrateur: 'Administrateur',
}

export const roleSlugLabels: {
  [key in RoleSlug]: string
} = {
  mediateur: roleLabels[roleForSlug.mediateur],
  coordinateur: roleLabels[roleForSlug.coordinateur],
  administrateur: roleLabels[roleForSlug.administrateur],
}

export const roleSlugOptions = labelsToOptions(roleSlugLabels)
