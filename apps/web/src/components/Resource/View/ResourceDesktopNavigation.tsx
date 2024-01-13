import { Resource } from '@app/web/server/resources/getResource'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceIndexationView from '@app/web/components/Resource/View/ResourceIndexationView'

const ResourceDesktopNavigation = ({
  resource,
  user,
  isAdmin,
}: {
  resource: Resource
  user: SessionUser | null
  isAdmin: boolean
}) => {
  const canEdit = true
  return (
    <>
      <ResourceIndexationView
        resource={resource}
        withLink
        themes
        tagsClassName="fr-mt-1v"
        titleClassName="fr-text--xs fr-mb-0"
      />
      <hr className="fr-separator-6v" />
      <div>todo menu navigation XS text</div>
    </>
  )
}

export default ResourceDesktopNavigation
