import classNames from 'classnames'
import React, { MouseEventHandler } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import IconLink from '../../Icon/IconLink'
import { ResourceModificationState } from '../enums/ResourceModificationState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import styles from './EditionActionBar.module.css'
import ResourceModificationStateBadge from './ResourceModificationStateBadge'
import ResourcePublishedStateBadge from './ResourcePublishedStateBadge'

const EditionActionBar = ({
  publishedState,
  modificationState,
  actionLabel,
  actionDisabled,
  action,
}: {
  publishedState: ResourcePublishedState
  modificationState: ResourceModificationState | null
  actionLabel: string
  actionDisabled?: boolean
  action: MouseEventHandler<HTMLButtonElement>
}) => (
  <div className={styles.container}>
    <div className={classNames('fr-container', styles.content)}>
      <div className={styles.block}>
        <ResourcePublishedStateBadge state={publishedState} />
        {modificationState && (
          <ResourceModificationStateBadge state={modificationState} />
        )}
      </div>
      <div className={styles.block}>
        <IconLink title="Supprimer" href="/" icon="fr-icon-delete-line" />
        <IconLink
          title="Ajouter un contributeur"
          href="/"
          icon="fr-icon-user-add-line"
        />
        <Button
          disabled={actionDisabled}
          onClick={action}
          data-testid="publish-resource-button"
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  </div>
)

export default EditionActionBar
