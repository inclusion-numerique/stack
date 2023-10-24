import React from 'react'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import { sPluriel } from '@app/web/utils/sPluriel'
import { SearchParams } from '@app/web/server/search/searchQueryParams'
import ResourceCard from '../Resource/Card'
import EmptyBox from '../EmptyBox'
import styles from './Content.module.css'

const Resources = ({
  totalCount,
  resources,
  user,
  searchParams: _willBeUsedForSorting,
}: {
  totalCount: number
  resources: ResourceListItem[]
  user: SessionUser | null
  searchParams: SearchParams
}) => (
  <>
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>
          {totalCount} Ressource{sPluriel(totalCount)}
        </b>
      </p>
      <div className={styles.select}>
        Trier par :
        <select>
          <option>Les plus pertinentes</option>
        </select>
      </div>
    </div>
    {resources.length > 0 ? (
      resources.map((resource) => (
        <ResourceCard key={resource.slug} resource={resource} user={user} />
      ))
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

export default Resources
