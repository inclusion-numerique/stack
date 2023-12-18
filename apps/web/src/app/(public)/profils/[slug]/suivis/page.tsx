import { notFound, redirect } from 'next/navigation'
import React from 'react'
import Header from '@app/web/components/Profile/Header'
import Menu from '@app/web/components/Profile/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResourcesCount } from '@app/web/server/resources/getResourcesList'
import { getProfileCollectionsCount } from '@app/web/server/collections/getCollectionsList'
import { getProfileBasesCount } from '@app/web/server/bases/getBasesList'
import { filterAccess } from '@app/web/server/profiles/authorization'
import PrivateBox from '@app/web/components/PrivateBox'
import {
  getProfileBaseFollows,
  getProfileFollowsCount,
  getProfileProfileFollows,
} from '@app/web/server/follows/getFollowsList'
import FollowsList from '@app/web/components/Follows/FollowsList'

const ProfileSuivisPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const profile = await getProfilePageQuery(decodeURI(params.slug), user)
  if (!profile) {
    notFound()
  }

  // logged out user must logged in to see the page
  if (!user) {
    redirect(`/connexion?suivant=/profils/${params.slug}/suivis`)
  }

  // logged in user must be the same as the profile
  if (user?.id !== profile.id) {
    redirect(`/profils/${params.slug}`)
  }

  const [
    resourcesCount,
    basesCount,
    collectionsCount,
    followsCount,
    baseFollows,
    profileFollows,
  ] = await Promise.all([
    getProfileResourcesCount(profile.id, user),
    getProfileBasesCount(profile.id, user),
    getProfileCollectionsCount(profile.id, user),
    user && user.id === profile.id ? getProfileFollowsCount(profile.id) : null,
    getProfileBaseFollows(profile.id),
    getProfileProfileFollows(profile.id),
  ])

  const authorizations = filterAccess(profile, user)
  return authorizations.authorized ? (
    <>
      <Header
        profile={authorizations.profile}
        isConnectedUser={authorizations.isUser}
        resourcesCount={resourcesCount}
      />
      <Menu
        profile={authorizations.profile}
        resourcesCount={resourcesCount}
        collectionsCount={collectionsCount.total}
        basesCount={basesCount}
        followsCount={followsCount?.total ?? null}
        currentPage="/suivis"
        isConnectedUser={authorizations.isUser}
      />
      <div className="fr-container  fr-container--medium fr-mb-50v">
        <FollowsList
          user={user}
          profileFollows={profileFollows}
          baseFollows={baseFollows}
        />
      </div>
    </>
  ) : (
    <>
      <Header
        profile={authorizations.profile}
        resourcesCount={resourcesCount}
      />
      <PrivateBox type="Profil" />
    </>
  )
}

export default ProfileSuivisPage
