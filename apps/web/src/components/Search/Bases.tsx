import React from 'react'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { departmentsOptions } from '@app/web/utils/departments'
import BaseCard from '../Base/Card/Card'
import Filters from '../Filters'
import EmptyBox from '../EmptyBox'
import styles from './Content.module.css'

const Bases = ({ bases }: { bases: BaseListItem[] }) => (
  <div className={styles.container}>
    {bases.length > 0 && (
      <Filters
        className="fr-mb-6w"
        label="Affiner la recherche"
        categories={[
          {
            id: 'department',
            label: 'Département',
            options: departmentsOptions,
          },
        ]}
      />
    )}
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>{bases.length} Bases</b>
      </p>
      <div className={styles.select}>
        Trier par :
        <select>
          <option>Les plus récentes</option>
        </select>
      </div>
    </div>
    {bases.length > 0 ? (
      bases.map((base) => <BaseCard key={base.slug} base={base} />)
    ) : (
      <EmptyBox title="Aucun résultat pour votre recherche">
        Veuillez réessayer avec différents mots-clés.
      </EmptyBox>
    )}
  </div>
)

export default Bases
