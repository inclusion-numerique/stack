import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const statutSlugs = ['inscrit', 'inscription', 'deleted'] as const

export type Statut = 'Inscrit' | 'Inscription' | 'Deleted'

export type StatutSlug = (typeof statutSlugs)[number]

export const statutLabels: {
  [key in Statut]: string
} = {
  Inscrit: 'Inscrit',
  Inscription: 'Inscription en cours',
  Deleted: 'Supprimé',
}

export const statutForSlug: { [key in StatutSlug]: Statut } = {
  inscrit: 'Inscrit',
  inscription: 'Inscription',
  deleted: 'Deleted',
}

export const statutSlugLabels: {
  [key in StatutSlug]: string
} = {
  inscrit: statutLabels[statutForSlug.inscrit],
  inscription: statutLabels[statutForSlug.inscription],
  deleted: statutLabels[statutForSlug.deleted],
}

export const statutSlugOptions = labelsToOptions(statutSlugLabels)
