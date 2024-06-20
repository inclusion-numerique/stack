import classNames from 'classnames'
import React from 'react'

type CategoryStyle = {
  description: string
  icon: string
  color: string
  background: string
  index: number
}

type Category =
  | 'Inclusion & compétences numériques'
  | 'Culture numérique'
  | 'Communs & souveraineté'
  | 'Numérique & environnement'

const CATEGORY_VARIANTS: Record<Category, CategoryStyle> = {
  'Inclusion & compétences numériques': {
    description:
      'Rendre le numérique accessible à chaque individu et lui transmettre les compétences numériques qui pourraient être un levier de son inclusion sociale et économique.',
    icon: 'ri-service-fill',
    color: 'fr-text-label--green-archipel',
    background: 'fr-background-alt--green-archipel',
    index: 0,
  },
  'Numérique & environnement': {
    description: '',
    icon: 'ri-leaf-fill',
    color: 'fr-text-label--green-bourgeon',
    background: 'fr-background-alt--green-bourgeon',
    index: 1,
  },
  'Culture numérique': {
    description: '',
    icon: 'ri-stack-fill',
    color: 'fr-text-label--pink-tuile',
    background: 'fr-background-alt--pink-tuile',
    index: 2,
  },
  'Communs & souveraineté': {
    description: '',
    icon: 'ri-government-fill',
    color: 'fr-text-label--yellow-tournesol',
    background: 'fr-background-alt--yellow-tournesol',
    index: 3,
  },
}

export const ThematicHeader = ({
  category,
  categoriesCount,
}: {
  category: Category
  categoriesCount: { resourcesCount: number; themes: { title: string }[] }[]
}) => (
  <div
    className={classNames(
      'fr-text--center fr-p-6w fr-border-radius--16',
      CATEGORY_VARIANTS[category].background,
    )}
  >
    <span
      className={classNames(
        'ri-3x fr-display-block fr-mb-4w',
        CATEGORY_VARIANTS[category].icon,
        CATEGORY_VARIANTS[category].color,
      )}
      aria-hidden
    />
    <h1 className="fr-h3 fr-m-2w">{category}</h1>
    <p className="fr-mb-2w">{CATEGORY_VARIANTS[category].description}</p>
    <span className="fr-flex fr-flex-gap-2v fr-direction-md-row fr-justify-content-center">
      <span className="fr-flex fr-flex-gap-2v fr-align-items-baseline">
        <span className="ri-file-text-line fr-text--lg fr-mb-0" aria-hidden />
        <span className="fr-text--bold">
          {categoriesCount[CATEGORY_VARIANTS[category].index].resourcesCount}
        </span>{' '}
        Ressources
      </span>
      <span className="fr-flex fr-flex-gap-2v fr-align-items-baseline">
        <span className="fr-unhidden-md fr-hidden">·</span>
        <span className="ri-price-tag-3-line fr-text--lg fr-mb-0" aria-hidden />
        <span className="fr-text--bold">
          {categoriesCount[CATEGORY_VARIANTS[category].index].themes.length}
        </span>{' '}
        Thématiques
      </span>
    </span>
  </div>
)
