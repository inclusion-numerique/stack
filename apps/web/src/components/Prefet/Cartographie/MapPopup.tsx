import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { City } from '@app/web/types/City'
import styles from './MapPopup.module.css'

const MapPopup = ({ city, close }: { city: City; close: () => void }) => (
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
    <h6>{city.nom}</h6>
    <div>Commune de {city.population} hab.</div>
  </div>
)

export default MapPopup
