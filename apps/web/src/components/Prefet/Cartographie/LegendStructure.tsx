import React from 'react'
import { Structure } from '@app/web/components/Prefet/structuresData'
import styles from './LegendStructure.module.css'

const LegendStructure = ({ structure }: { structure: Structure }) => (
  <div className={styles.structure}>{structure.properties.name}</div>
)

export default LegendStructure
