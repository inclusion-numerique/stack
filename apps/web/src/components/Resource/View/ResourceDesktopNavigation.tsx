import { Resource } from '@app/web/server/resources/getResource'
import ResourceIndexationView from '@app/web/components/Resource/View/ResourceIndexationView'

const ResourceDesktopNavigation = ({ resource }: { resource: Resource }) => (
  // TODO implement navigation dynamic with text xs
  <>
    <ResourceIndexationView
      resource={resource}
      withLink
      themes
      tagsClassName="fr-mt-1v"
      titleClassName="fr-text--xs fr-mb-0"
    />
    <hr className="fr-separator-6v" />
    <div className="wip">
      Menu de navigation desktop <br />
      Texte XS
    </div>
  </>
)

export default ResourceDesktopNavigation
