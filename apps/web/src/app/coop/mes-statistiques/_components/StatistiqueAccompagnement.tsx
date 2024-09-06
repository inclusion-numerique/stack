import { ReactNode } from 'react'
import classNames from 'classnames'
import { TypeActivite } from '@prisma/client'
import {
  typeActiviteIllustrations,
  typeActivitePluralLabels,
} from '@app/web/cra/cra'
import { numberToPercentage } from '@app/web/utils/formatNumber'

export const StatistiqueAccompagnement = ({
  typeActivite,
  count,
  proportion,
  className,
  children,
}: {
  typeActivite: TypeActivite
  count: number
  proportion: number
  className?: string
  children?: ReactNode
}) => (
  <div
    className={classNames(
      className,
      'fr-flex fr-align-items-center fr-flex-gap-4v',
    )}
  >
    <div className="fr-py-1v fr-px-2v fr-border-radius--8 fr-background-default--grey">
      <img src={typeActiviteIllustrations[typeActivite]} />
    </div>
    <div>
      <div className="fr-flex fr-direction-row fr-flex-gap-3v fr-align-items-baseline">
        <span className="fr-h4 fr-mb-0">{count}</span>
        <span className="fr-text-mention--grey ">
          {numberToPercentage(proportion)}
        </span>
      </div>
      <div className="fr-text--sm fr-mb-0">
        {typeActivitePluralLabels[typeActivite]}
      </div>
      <div className="fr-text--sm fr-text-mention--grey fr-mb-0">
        {children}
      </div>
    </div>
  </div>
)
