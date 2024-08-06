import {
  NullableTime,
  toTimetableOpeningHours,
} from '@gouvfr-anct/timetable-to-osm-opening-hours'
import classNames from 'classnames'

const JOURS_DE_LA_SEMAINE = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const OpeningHoursRange = ({
  startTime,
  endTime,
}: {
  startTime: NullableTime
  endTime: NullableTime
}) => [startTime, endTime].join(' - ').replace(':', 'h')

const OpeningHoursComment = ({ horaires }: { horaires: string }) => {
  const comment = horaires?.match(/".+"/g)?.toString().replaceAll('"', '')
  return (
    comment && <i className="fr-text--sm fr-text-mention--grey">{comment}</i>
  )
}

export const OpeningHours = ({
  horaires,
  className,
}: {
  horaires: string
  className?: string
}) => (
  <div
    className={classNames(
      className,
      'fr-flex fr-direction-column fr-flex-gap-2v',
    )}
  >
    {Object.entries(toTimetableOpeningHours(new Date())(horaires)).map(
      ([day, daySchedule], index) => (
        <div key={day} className="fr-flex fr-flex-gap-4v">
          <span className="fr-text--medium" style={{ width: '38px' }}>
            {JOURS_DE_LA_SEMAINE[index]}.
          </span>
          <span>
            {daySchedule.am.isOpen ? (
              <OpeningHoursRange {...daySchedule.am} />
            ) : (
              'Fermé'
            )}
          </span>
          <span>/</span>
          <span>
            {daySchedule.pm.isOpen ? (
              <OpeningHoursRange {...daySchedule.pm} />
            ) : (
              'Fermé'
            )}
          </span>
        </div>
      ),
    )}
    <OpeningHoursComment horaires={horaires} />
  </div>
)
