import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { TypeLieu } from '@prisma/client'

export const typeLieuLabels: { [key in TypeLieu]: string } = {
  LieuActivite: 'Lieu d’activité',
  Autre: 'Autre lieu',
  Domicile: 'À domicile',
  ADistance: 'À distance',
}

export const typeLieuIllustrations: {
  [key in TypeLieu]?: string
} = {
  LieuActivite: '/dsfr/artwork/pictograms/buildings/city-hall.svg',
  Autre: '/dsfr/artwork/pictograms/buildings/school.svg',
  Domicile: '/images/iconographie/thematique-logement.svg',
  ADistance: '/images/iconographie/mednum-internet.svg',
}

export const typeLieuOptions = labelsToOptions(typeLieuLabels)

export const typeLieuOptionsWithExtras = typeLieuOptions.map(
  ({ label, value }) => ({
    label,
    value,
    extra: {
      illustration: typeLieuIllustrations[value],
    },
  }),
)

export const typeLieuValues = Object.keys(typeLieuLabels) as [
  TypeLieu,
  ...TypeLieu[],
]

export const typeLieuApiValues = {
  LieuActivite: 'lieu_activite',
  Autre: 'autre',
  Domicile: 'domicile',
  ADistance: 'a_distance',
} as const satisfies {
  [key in TypeLieu]: string
}
