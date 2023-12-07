import { notFound } from 'next/navigation'
import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getSessionUser } from '../../../../../auth/getSessionUser'
import { getCollection } from '../../../../../server/collections/getCollection'

const CollectionEditionPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const collection = await getCollection(decodeURI(params.slug), user)

  if (!collection || !user) {
    notFound()
  }

  console.log(user, collection);

  return (
    <div className="fr-container">
      <Breadcrumbs
        parents={[
          {
            label: 'Mon profil',
            linkProps: { href: `/profils/${user.id}` },
          },
          {
            label: 'Mes collections',
            linkProps: { href: '/collections' },
          },
          {
            label: collection.title,
            linkProps: { href: `/collections/${params.slug}` },
          },
        ]}
        currentPage="Éditer la collection"
      />
      <div className="fr-mt-6w fr-mb-4w">
        {/*<CollectionEdition collection={collection} />*/}
      </div>
    </div>
  )
}

export default CollectionEditionPage
