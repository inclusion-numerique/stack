import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { Materiel } from '@prisma/client'

export const materielLabels: {
  [key in Materiel]: string
} = {
  Ordinateur: 'Ordinateur',
  Telephone: 'Téléphone',
  Tablette: 'Tablette',
  Autre: 'Autre',
  Aucun: 'Pas de matériel',
}

export const materielIcons: {
  [key in Materiel]: { icon: string; rotation?: number }
} = {
  Ordinateur: { icon: 'ri-computer-line' },
  Telephone: { icon: 'ri-smartphone-line' },
  Tablette: { icon: 'ri-tablet-line', rotation: -90 },
  Autre: { icon: 'ri-remote-control-line' },
  Aucun: { icon: 'ri-loader-fill' },
}

export const materielOptions = labelsToOptions(materielLabels)

export const materielValues = Object.keys(materielLabels) as [
  Materiel,
  ...Materiel[],
]

export const materielApiValues = {
  Ordinateur: 'ordinateur',
  Telephone: 'telephone',
  Tablette: 'tablette',
  Autre: 'autre',
  Aucun: 'aucun',
} as const satisfies {
  [key in Materiel]: string
}
