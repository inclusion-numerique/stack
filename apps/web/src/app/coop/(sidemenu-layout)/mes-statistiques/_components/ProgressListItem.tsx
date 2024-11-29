import { numberToPercentage } from '@app/web/utils/formatNumber'
import ProgressBar from './ProgressBar'

export const ProgressListItem = ({
  label,
  count,
  proportion,
  maxProportion,
  colors = [],
}: {
  label: string
  count: number
  proportion: number
  maxProportion: number
  colors?: string[]
}) => (
  <li className="fr-grid-row fr-grid-row--gutters fr-text--sm fr-mb-0 fr-align-items-center">
    <span className="fr-sm-col fr-col-12">{label}</span>
    <span className="fr-col-md-1 fr-col-2 fr-text--right fr-text--bold fr-whitespace-nowrap">
      {count}
    </span>
    <span className="fr-col-1 fr-text--right fr-text--medium fr-text-mention--grey fr-whitespace-nowrap">
      {numberToPercentage(proportion)}
    </span>
    <ProgressBar
      className="fr-col fr-my-auto"
      progress={[
        {
          label,
          percentage:
            maxProportion === 0 ? 0 : (100 * proportion) / maxProportion,
        },
      ]}
      colors={colors}
    />
  </li>
)
