import ProgressBar from './ProgressBar'

export const ProgressListItem = ({
  label,
  count,
  proportion,
  colors = [],
}: {
  label: string
  count: number
  proportion: number
  colors?: string[]
}) => (
  <li className="fr-grid-row fr-grid-row--gutters fr-text--sm fr-align-items-center">
    <span className="fr-lg-col fr-col-12">{label}</span>
    <span className="fr-col-md-1 fr-col-2 fr-text--bold fr-whitespace-nowrap">
      {count}
    </span>
    <span className="fr-col-md-2 fr-col-2 fr-text--medium fr-text-mention--grey fr-whitespace-nowrap">
      {proportion} %
    </span>
    <ProgressBar
      className="fr-col fr-my-auto"
      progress={[{ label, value: proportion }]}
      colors={colors}
    />
  </li>
)
