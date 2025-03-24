import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { TypeActivite } from '@prisma/client'

export const typeActivitePluralLabels: {
  [key in TypeActivite]: string
} = {
  Individuel: 'Accompagnements individuels',
  Demarche: 'Aides aux démarches administratives',
  Collectif: 'Ateliers collectifs',
}

export type TypeActiviteSlug = 'individuel' | 'demarche' | 'collectif'

export const typeActiviteLabels: {
  [key in TypeActivite]: string
} = {
  Individuel: 'Accompagnement individuel',
  Demarche: 'Aide aux démarches administratives',
  Collectif: 'Atelier collectif',
}

export const typeActiviteForSlug: { [key in TypeActiviteSlug]: TypeActivite } =
  {
    individuel: 'Individuel',
    demarche: 'Demarche',
    collectif: 'Collectif',
  }

export const typeActiviteSlugLabels: {
  [key in TypeActiviteSlug]: string
} = {
  individuel: typeActiviteLabels[typeActiviteForSlug.individuel],
  demarche: typeActiviteLabels[typeActiviteForSlug.demarche],
  collectif: typeActiviteLabels[typeActiviteForSlug.collectif],
}

export const typeActiviteIllustrations: {
  [key in TypeActivite]?: string
} = {
  Individuel: '/images/iconographie/accompagnement-individuel.svg',
  Demarche: '/images/iconographie/demarche-administrative.svg',
  Collectif: '/images/iconographie/accompagnement-collectif.svg',
}

export const typeActiviteValues = Object.keys(typeActiviteLabels) as [
  TypeActivite,
  ...TypeActivite[],
]

export const typeActiviteOptions = labelsToOptions(typeActiviteLabels)

export const typeActiviteSlugOptions = labelsToOptions(typeActiviteSlugLabels)

export const typeActiviteSlugValues = Object.keys(typeActiviteSlugLabels) as [
  TypeActiviteSlug,
  ...TypeActiviteSlug[],
]

export const typeActiviteApiValues = {
  Individuel: 'individuel',
  Demarche: 'demarche_administrative',
  Collectif: 'collectif',
} as const satisfies {
  [key in TypeActivite]: string
}
