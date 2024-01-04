import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { filterAccess } from '@app/web/server/collections/authorization'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import PrivateBox from '@app/web/components/PrivateBox'
import { getCollection } from '@app/web/server/collections/getCollection'
import CollectionView from '@app/web/components/Collection/CollectionView'

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const collection = await getCollection(decodeURI(params.slug), user)

  if (!collection) {
    notFound()
  }

  const authorizations = filterAccess(collection, user)
  return authorizations.authorized ? (
    <div className="fr-container">
      {user && (
        <Breadcrumbs
          parents={[
            {
              label: 'Mon profil',
              linkProps: { href: `/profils/${user.id}` },
            },
            {
              label: 'Mes collections',
              linkProps: { href: `/profils/${user.id}/collections` },
            },
          ]}
          currentPage={collection.title}
        />
      )}
      <div className="fr-container fr-container--medium fr-my-4w">
        {user && (
          <div className="fr-mb-4w">
            <Link
              href={`/profils/${user.id}/collections`}
              className="fr-link fr-mb-4w"
            >
              <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-1w" />
              Retour
            </Link>
          </div>
        )}
        <CollectionView
          collection={collection}
          user={user}
          isOwner={authorizations.isOwner}
        />
      </div>
    </div>
  ) : (
    <PrivateBox type="Collection" />
  )
}

export default CollectionPage
