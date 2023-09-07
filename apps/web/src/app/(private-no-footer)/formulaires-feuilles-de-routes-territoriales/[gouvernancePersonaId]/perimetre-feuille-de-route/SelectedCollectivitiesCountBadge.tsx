import classNames from 'classnames'
import { sPluriel } from '@app/web/utils/sPluriel'

const SelectedCollectivitiesCountBadge = ({
  selectedEpcisCount,
  selectedCommunesCount,
  className,
}: {
  selectedEpcisCount: number
  selectedCommunesCount: number
  className?: string
}) =>
  selectedCommunesCount + selectedEpcisCount === 0 ? null : (
    <span
      className={classNames(
        'fr-badge fr-badge--sm fr-badge--blue-cumulus',
        className,
      )}
    >
      {selectedEpcisCount} EPCI{sPluriel(selectedEpcisCount)} -{' '}
      {selectedCommunesCount} Commune
      {sPluriel(selectedCommunesCount)} sélectionné
      {sPluriel(selectedCommunesCount + selectedEpcisCount)}
    </span>
  )

export default SelectedCollectivitiesCountBadge
