import type { Category } from '@app/web/themes/themes'

export type CategoryStyle = {
  description: string
  icon: string
  color: string
  background: string
  tagsClassName: string
}

export const categoryStyles: { [key in Category]: CategoryStyle } = {
  'Inclusion & compétences numériques': {
    description:
      'Rendre le numérique accessible à chaque individu et lui transmettre les compétences numériques qui pourraient être un levier de son inclusion sociale et économique.',
    icon: 'ri-service-fill',
    color: 'fr-text-label--green-archipel',
    background: 'fr-background-alt--green-archipel',
    tagsClassName: 'fr-tag--green-archipel',
  },
  'Numérique & environnement': {
    description: '',
    icon: 'ri-leaf-fill',
    color: 'fr-text-label--green-bourgeon',
    background: 'fr-background-alt--green-bourgeon',
    tagsClassName: 'fr-tag--green-bourgeon',
  },
  'Culture numérique': {
    description: '',
    icon: 'ri-stack-fill',
    color: 'fr-text-label--pink-tuile',
    background: 'fr-background-alt--pink-tuile',
    tagsClassName: 'fr-tag--pink-tuile',
  },
  'Communs & souveraineté': {
    description: '',
    icon: 'ri-government-fill',
    color: 'fr-text-label--yellow-tournesol',
    background: 'fr-background-alt--yellow-tournesol',
    tagsClassName: 'fr-tag--yellow-tournesol',
  },
}
