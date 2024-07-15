import classNames from 'classnames'
import { stringToOpeningHours } from '@app/web/opening-hours/stringToOpeningHours'

const JOURS_DE_LA_SEMAINE = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

export const OpeningHours = ({
  horaires,
  className,
}: {
  horaires: string
  className?: string
}) => {
  const openingHours = stringToOpeningHours(horaires)

  return (
    <div
      className={classNames(
        className,
        'fr-flex fr-direction-column fr-flex-gap-2v',
      )}
    >
      {JOURS_DE_LA_SEMAINE.map((jour) => (
        <div key={jour} className="fr-flex fr-flex-gap-4v">
          <span className="fr-text--medium" style={{ width: '38px' }}>
            {jour}.
          </span>
          <span>09h30 – 13h00</span>
          <span>/</span>
          <span>13h30 – 17h00</span>
        </div>
      ))}
      <i className="fr-text--sm fr-text-mention--grey fr-mb-0">
        Sauf les jours fériés et le premier Lundi du mois
      </i>
    </div>
  )
}
