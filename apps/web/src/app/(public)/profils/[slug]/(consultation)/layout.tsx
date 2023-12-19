import React, { PropsWithChildren } from 'react'
import Header from '@app/web/components/Profile/Header'
import PrivateBox from '@app/web/components/PrivateBox'
import { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { getProfilePageCounts } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageCounts'
import Menu from '@app/web/components/Profile/Menu'

const ProfileLayout = async ({
  params,
  children,
}: PropsWithChildren<ProfilRouteParams>) => {
  const { profile, user, authorizations } = await getProfilePageContext(
    params.slug,
  )
  const { resourcesCount, followsCount, collectionsCount, basesCount } =
    await getProfilePageCounts(profile.id)

  if (!authorizations.authorized) {
    return (
      <>
        <Header
          profile={authorizations.profile}
          resourcesCount={resourcesCount}
          user={user}
        />
        <PrivateBox type="Profil" />
      </>
    )
  }
  return (
    <>
      <Header
        profile={authorizations.profile}
        isConnectedUser={authorizations.isUser}
        resourcesCount={resourcesCount}
        user={user}
      />
      <Menu
        profile={authorizations.profile}
        resourcesCount={resourcesCount}
        isConnectedUser={authorizations.isUser}
        basesCount={basesCount}
        collectionsCount={collectionsCount.total}
        followsCount={followsCount.total}
      />
      <div className="fr-container fr-container--medium fr-mb-50v">
        {children}
      </div>
    </>
  )
}

export default ProfileLayout
