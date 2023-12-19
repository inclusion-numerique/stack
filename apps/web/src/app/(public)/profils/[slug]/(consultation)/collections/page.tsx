import React from 'react'
import { getProfileCollections } from '@app/web/server/collections/getCollectionsList'
import Collections from '@app/web/components/Collection/List/Collections'
import EmptyBox from '@app/web/components/EmptyBox'
import { getProfileSavedCollections } from '@app/web/server/collections/getSavedCollectionsList'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'

const ProfileBasesPage = async ({ params }: ProfilRouteParams) => {
  // Auth and profile has been checked in layout
  const { profile, user, authorizations } = await getProfilePageContext(
    params.slug,
  )

  const [collections, savedCollections] = await Promise.all([
    getProfileCollections(profile.id, user),
    getProfileSavedCollections(profile.id, user),
  ])

  return (
    <Collections
      user={user}
      collections={collections}
      savedCollections={savedCollections.map(({ collection }) => collection)}
      withCreation={authorizations.isUser}
      collectionsLabel="Mes collections"
      emptySavedBox={
        <EmptyBox title="Vous n’avez pas enregistré de collections.">
          Enregistrez la collection de quelqu&lsquo;un d&lsquo;autre et elle
          apparaîtra ici.
        </EmptyBox>
      }
    />
  )
}

export default ProfileBasesPage
