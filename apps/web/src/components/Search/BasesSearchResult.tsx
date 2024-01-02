import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { SearchParams } from '@app/web/server/search/searchQueryParams'
import { SessionUser } from '@app/web/auth/sessionUser'
import BaseCard from '../Base/Card/BaseCard'
import EmptyBox from '../EmptyBox'
import styles from './SearchContents.module.css'

const BasesSearchResult = ({
  bases,
  totalCount,
  searchParams: _willBeUsedForSorting,
  user,
}: {
  bases: BaseListItem[]
  totalCount: number
  searchParams: SearchParams
  user: SessionUser | null
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
      bases.map((base) => <BaseCard key={base.slug} user={user} base={base} />)
    ) : (
      <EmptyBox
        className="fr-mt-6v"
        title="Aucun résultat pour votre recherche"
      >
        Veuillez réessayer avec différents mots-clés.
      </EmptyBox>
    )}
  </>
)

export default BasesSearchResult
