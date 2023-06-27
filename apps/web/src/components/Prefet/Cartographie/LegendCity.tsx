import React from 'react'
import { City } from '@app/web/types/City'
import styles from './LegendCity.module.css'

const LegendCity = ({ city }: { city: City }) => (
  <div className={styles.city}>
    {city.nom} {city.codesPostaux.join(' ')}
  </div>
)

export default LegendCity
