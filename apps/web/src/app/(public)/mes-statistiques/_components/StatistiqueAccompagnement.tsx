import { ReactNode } from 'react'
import classNames from 'classnames'
import { AccompagnementLabel } from '../quantifiedShare'

const accompagnementToImage: Record<AccompagnementLabel, string> = {
  'Accompagnements individuels':
    'images/iconographie/accompagnement-individuel.svg',
  'Ateliers collectifs': 'images/iconographie/accompagnement-collectif.svg',
  'Aide aux démarches administratives':
    'images/iconographie/demarche-administrative.svg',
}

export const StatistiqueAccompagnement = ({
  accompagnement,
  count,
  proportion,
  className,
  children,
}: {
  accompagnement: AccompagnementLabel
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
      <img src={accompagnementToImage[accompagnement]} />
    </div>
    <div>
      <div className="fr-flex fr-direction-row fr-flex-gap-3v fr-align-items-baseline">
        <span className="fr-h4 fr-mb-0">{count}</span>
        <span className="fr-text-mention--grey ">{proportion} %</span>
      </div>
      <div className="fr-text--sm fr-mb-0">{accompagnement}</div>
      <div className="fr-text--sm fr-text-mention--grey fr-mb-0">
        {children}
      </div>
    </div>
  </div>
)
