import classNames from 'classnames'
import { numberToPercentage } from '@app/web/utils/formatNumber'
import type { QuantifiedShare } from '../quantifiedShare'

export const QuantifiedShareLegend = ({
  colors,
  quantifiedShares,
  classeName,
}: {
  colors: string[]
  quantifiedShares: QuantifiedShare[]
  classeName?: string
}) => (
  <ul className={classNames('fr-width-full fr-px-0', classeName)}>
    {quantifiedShares.map(({ label, count, proportion }, index) => (
      <li key={label} className="fr-grid-row fr-text--sm fr-mb-1w">
        <span
          className="ri-circle-fill fr-mr-1w"
          style={{ color: colors[index % colors.length] }}
        />
        <span className="fr-col">{label}</span>
        <span className="fr-pr-2w fr-text--bold">{count}</span>
        <span className="fr-col-3 fr-text--medium fr-text-mention--grey fr-text--right">
          {numberToPercentage(proportion)}
        </span>
      </li>
    ))}
  </ul>
)
