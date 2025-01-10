import classNames from 'classnames'
import { Materiel } from '@prisma/client'
import { materielIcons } from '@app/web/cra/cra'
import { numberToPercentage, numberToString } from '@app/web/utils/formatNumber'

export const StatistiqueMateriel = ({
  label,
  value,
  count,
  proportion,
  className,
}: {
  label: string
  value: Materiel
  count: number
  proportion: number
  className?: string
}) => (
  <div className={classNames('fr-text--center', className)}>
    <div className="fr-background-alt--blue-france fr-p-2w fr-mb-3v fr-border-radius--8 fr-display-inline-block">
      <div
        style={
          materielIcons[value].rotation
            ? { transform: `rotate(${materielIcons[value].rotation}deg)` }
            : {}
        }
        className={`${materielIcons[value].icon} ri-lg fr-line-height-1 fr-text-label--blue-france`}
        aria-hidden
      />
    </div>
    <div className="fr-flex fr-flex-gap-2v fr-justify-content-center">
      <span className="fr-text--bold">{numberToString(count)}</span>
      <span className="fr-text-mention--grey">
        {numberToPercentage(proportion)}
      </span>
    </div>
    {label}
  </div>
)
