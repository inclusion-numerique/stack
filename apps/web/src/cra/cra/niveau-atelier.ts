import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { NiveauAtelier } from '@prisma/client'

export const niveauAtelierLabels: {
  [key in NiveauAtelier]: string
} = {
  Debutant: 'Débutant',
  Intermediaire: 'Intermédiaire',
  Avance: 'Avancé',
}

export const niveauAtelierStars: {
  [key in NiveauAtelier]: number
} = {
  Debutant: 1,
  Intermediaire: 2,
  Avance: 3,
}

export const niveauAtelierOptions = labelsToOptions(niveauAtelierLabels)

export const niveauAtelierOptionsWithExtras = niveauAtelierOptions.map(
  ({ label, value }) => ({
    label,
    value,
    extra: {
      stars: niveauAtelierStars[value],
      maxStars: 3,
    },
  }),
)

export const niveauAtelierValues = Object.keys(niveauAtelierLabels) as [
  NiveauAtelier,
  ...NiveauAtelier[],
]

export const niveauAtelierApiValues = {
  Debutant: 'debutant',
  Intermediaire: 'intermediaire',
  Avance: 'avance',
} as const satisfies {
  [key in NiveauAtelier]: string
}
