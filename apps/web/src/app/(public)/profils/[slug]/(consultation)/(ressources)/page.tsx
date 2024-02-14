import React from 'react'
import { getProfileResources } from '@app/web/server/resources/getResourcesList'
import { BaseResource } from '@app/web/server/bases/getBase'
import {
  getResourceProjectionWithContext,
  ResourceProjectionWithContext,
} from '@app/web/server/resources/getResourceFromEvents'
import EmptyProfileResources from '@app/web/components/Profile/EmptyProfileResources'
import Resources from '@app/web/components/Resource/List/Resources'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { applyDraft } from '@app/web/utils/resourceDraft'

const matchingId =
  (resource: BaseResource) =>
  (draftResource: ResourceProjectionWithContext | null) =>
    resource.id === draftResource?.id

const onlyDefined = <T,>(nullable: T | null): nullable is T => nullable != null

const ProfilePage = async ({ params }: ProfilRouteParams) => {
  // Auth and profile has been checked in layout
  const { profile, user, authorizations } = await getProfilePageContext(
    params.slug,
  )

  const resources = await getProfileResources(profile.id, user)
  const draftRessources = await Promise.all(
    resources.map((ressource) =>
      getResourceProjectionWithContext({ slug: decodeURI(ressource.slug) }),
    ),
  )

  const ressourcesWithDraft = resources
    .map((resource) =>
      applyDraft(resource, draftRessources.find(matchingId(resource))),
    )
    .filter(onlyDefined)

  return ressourcesWithDraft.length === 0 ? (
    <EmptyProfileResources isConnectedUser={authorizations.isUser} />
  ) : (
    <Resources
      resources={ressourcesWithDraft}
      isConnectedUser={authorizations.isUser}
      user={user}
      baseId={null}
    />
  )
}

export default ProfilePage
