import { notFound } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { filterAccess } from '@app/web/server/collections/authorization'
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
    <div className="fr-container fr-container--medium fr-my-4w">
      <CollectionView
        collection={collection}
        user={user}
        isOwner={authorizations.isOwner}
      />
    </div>
  ) : (
    <PrivateBox type="Collection" />
  )
}

export default CollectionPage
