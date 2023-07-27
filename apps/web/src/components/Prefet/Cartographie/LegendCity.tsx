import React from 'react'
import { DepartementCartographieDataCommune } from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'
import styles from './LegendCity.module.css'

const LegendCity = ({
  commune,
}: {
  commune: DepartementCartographieDataCommune
}) => (
  <div className={styles.city}>
    {commune.nom} {commune.codesPostaux.join(' ')}
  </div>
)

export default LegendCity
