import React from 'react'
import { getProfileResources } from '@app/web/server/resources/getResourcesList'
import EmptyResources from '@app/web/components/Profile/EmptyResources'
import Resources from '@app/web/components/Resource/List/Resources'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'

const ProfilePage = async ({ params }: ProfilRouteParams) => {
  // Auth and profile has been checked in layout
  const { profile, user, authorizations } = await getProfilePageContext(
    params.slug,
  )

  const resources = await getProfileResources(profile.id, user)

  return resources.length === 0 ? (
    <EmptyResources isConnectedUser={authorizations.isUser} />
  ) : (
    <Resources
      resources={resources}
      isConnectedUser={authorizations.isUser}
      user={user}
    />
  )
}

export default ProfilePage
