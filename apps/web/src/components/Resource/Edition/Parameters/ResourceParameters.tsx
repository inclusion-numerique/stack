import React from 'react'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import { SessionUser } from '@app/web/auth/sessionUser'
import Card from '@app/web/components/Card'
import ResourceParametersSideMenu from '@app/web/components/Resource/Edition/Parameters/ResourceParametersSideMenu'
import ResourcePublication from '@app/web/components/Resource/Edition/Parameters/ResourcePublication'
import ResourceVisibilityForm from '@app/web/components/Resource/Edition/Parameters/ResourceVisibilityForm'
import ResourceIndexation from '@app/web/components/Resource/Edition/Parameters/ResourceIndexation'
import ResourceDeletion from '@app/web/components/Resource/Edition/Parameters/ResourceDeletion'
import InviteResourceContributors from '@app/web/components/Resource/Contributors/InviteResourceContributors'
import styles from './ResourceParameters.module.css'

const ResourceParameters = ({
  resource,
  user,
}: {
  resource: Resource
  user: SessionUser
}) => (
  <div className={classNames('fr-container', styles.container)}>
    <ResourceParametersSideMenu />
    <div>
      <h1 className="fr-mb-6w">Paramètres de la ressource</h1>
      <ResourcePublication resource={resource} user={user} />
      <ResourceVisibilityForm resource={resource} user={user} />
      <ResourceIndexation resource={resource} />
      <Card
        id="contributeurs"
        className="fr-mt-3w"
        title="Contributeurs"
        description="Les contributeurs peuvent voir, éditer, inviter d’autres contributeurs et supprimer la ressource."
      >
        <InviteResourceContributors resource={resource} />
      </Card>
      <Card
        className="fr-my-3w"
        id="supprimer"
        title="Supprimer la ressource"
        description="Cette action est irréversible et entraîne la suppression définitive de de la ressource. Utilisez cette fonction avec précaution."
      >
        <ResourceDeletion resource={resource} />
      </Card>
    </div>
  </div>
)

export default ResourceParameters
