import React from 'react'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { sPluriel } from '@app/web/utils/sPluriel'
import { SearchParams } from '@app/web/server/search/searchQueryParams'
import BaseCard from '../Base/Card/Card'
import EmptyBox from '../EmptyBox'
import styles from './Content.module.css'

const Bases = ({
  bases,
  totalCount,
  searchParams: _willBeUsedForSorting,
}: {
  bases: BaseListItem[]
  totalCount: number
  searchParams: SearchParams
}) => (
  <>
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>
          {totalCount} Base{sPluriel(totalCount)}
        </b>
      </p>
      <div className={styles.select}>
        Trier par :
        <select>
          <option>Les plus pertinentes</option>
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
  </>
)

export default Bases
