import classNames from 'classnames'
import { MaterielLabel } from '../quantifiedShare'

const valueToIcon: Record<MaterielLabel, { icon: string; rotation: number }> = {
  Ordinateur: { icon: 'ri-computer-line', rotation: 0 },
  Smartphone: { icon: 'ri-smartphone-line', rotation: 0 },
  Tablette: { icon: 'ri-tablet-line', rotation: -90 },
  Autre: { icon: 'ri-vidicon-2-line', rotation: 0 },
  'Sans matériel': { icon: 'ri-loader-fill', rotation: 0 },
}

export const StatistiqueMateriel = ({
  value,
  count,
  proportion,
  className,
}: {
  value: MaterielLabel
  count: number
  proportion: number
  className?: string
}) => (
  <div className={classNames('fr-text--center', className)}>
    <div className="fr-background-alt--blue-france fr-p-2w fr-mb-3v fr-border-radius--8 fr-display-inline-block">
      <div
        style={
          valueToIcon[value].rotation
            ? { transform: `rotate(${valueToIcon[value].rotation}deg)` }
            : {}
        }
        className={`${valueToIcon[value].icon} ri-lg fr-line-height-1 fr-text-label--blue-france`}
        aria-hidden
      />
    </div>
    <div className="fr-flex fr-flex-gap-2v fr-justify-content-center">
      <span className="fr-text--bold">{count}</span>
      <span className="fr-text-mention--grey">{proportion} %</span>
    </div>
    {value}
  </div>
)
