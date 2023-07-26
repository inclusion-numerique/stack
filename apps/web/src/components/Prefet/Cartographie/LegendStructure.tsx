import React from 'react'
import { DepartementCartographieDataStructure } from '@app/web/app/(cartographie)/prefet/[codeDepartement]/cartographie/getDepartementCartographieData'
import styles from './LegendStructure.module.css'

const LegendStructure = ({
  structure,
}: {
  structure: DepartementCartographieDataStructure
}) => <div className={styles.structure}>{structure.properties.nom}</div>

export default LegendStructure
