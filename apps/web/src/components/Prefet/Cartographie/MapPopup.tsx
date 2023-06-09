import React from 'react'
import { GeoJSONFeature } from 'maplibre-gl'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './MapPopup.module.css'

const MapPopup = ({
  properties,
  close,
}: {
  properties: GeoJSONFeature['properties']
  close: () => void
}) => (
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
    <h6>{properties.nom}</h6>
  </div>
)

export default MapPopup
