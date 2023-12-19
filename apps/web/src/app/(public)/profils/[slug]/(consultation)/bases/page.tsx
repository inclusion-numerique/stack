import React from 'react'
import { getProfileBases } from '@app/web/server/bases/getBasesList'
import Bases from '@app/web/components/Base/List/Bases'
import EmptyBases from '@app/web/components/Base/List/EmptyBases'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'

const ProfileBasesPage = async ({ params }: ProfilRouteParams) => {
  // Auth and profile has been checked in layout
  const { profile, user, authorizations } = await getProfilePageContext(
    params.slug,
  )

  const bases = await getProfileBases(profile.id, user)

  return bases.length === 0 ? (
    <EmptyBases isConnectedUser={authorizations.isUser} />
  ) : (
    <Bases user={user} bases={bases} isConnectedUser={authorizations.isUser} />
  )
}

export default ProfileBasesPage
