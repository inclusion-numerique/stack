import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { City } from '@app/web/types/City'
import { Structure } from '@app/web/components/Prefet/structuresData'
import CityDetails from '@app/web/components/Prefet/Cartographie/CityDetails'
import StructureDetails from '@app/web/components/Prefet/Cartographie/StructureDetails'
import styles from './MapPopup.module.css'

const MapPopup = ({
  city,
  structure,
  close,
}: {
  city: City | null | undefined
  structure: Structure | null | undefined
  close: () => void
}) => {
  if (!city && !structure) {
    return null
  }

  return (
    <div className={styles.popup}>
      <div className={styles.close}>
        <Button
          priority="tertiary no outline"
          iconId="fr-icon-close-line"
          iconPosition="right"
          size="small"
          onClick={close}
        >
          Fermer
        </Button>
      </div>
      {!!city && <CityDetails city={city} />}
      {!!structure && <StructureDetails structure={structure} />}
    </div>
  )
}

export default MapPopup
