import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Resource } from '@app/web/server/resources/getResource'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceReportButton from '@app/web/components/Resource/View/ResourceReportButton'
import SaveResourceInCollectionButton from '../SaveResourceInCollectionButton'
import styles from './ResourceNavigation.module.css'
import ResourceSideMenu from './ResourceSideMenu'

const {
  Component: ResourceNavigationModal,
  buttonProps: resourceNavigationModalNativeButtonProps,
} = createModal({
  id: 'resource-navigation',
  isOpenedByDefault: false,
})

const ResourceNavigation = ({
  resource,
  user,
  isAdmin,
}: {
  resource: Resource
  user: SessionUser | null
  isAdmin: boolean
}) => (
  <>
    <ResourceNavigationModal
      className={styles.modal}
      title=""
      buttons={[
        {
          title: 'Annuler',
          priority: 'tertiary',
          children: 'Annuler',
        },
      ]}
    >
      <Link
        className={
          isAdmin
            ? classNames(
                'fr-btn',
                'fr-btn--secondary',
                'fr-btn--icon-left',
                'fr-icon-edit-line',
              )
            : classNames(
                'fr-btn',
                'fr-btn--secondary',
                'fr-btn--icon-left',
                'fr-icon-edit-line',
                'wip',
              )
        }
        href={isAdmin ? `/ressources/${resource.slug}/editer` : '/'}
      >
        {isAdmin ? 'Modifier' : 'Demander à contribuer'}
      </Link>
      <SaveResourceInCollectionButton
        data-testid="save-resource-in-collection-button-mobile"
        resource={resource}
        user={user}
      />
      {!!user && <ResourceReportButton />}
    </ResourceNavigationModal>
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Link
          data-testid="resource-edition-button"
          className={
            isAdmin
              ? classNames(
                  'fr-btn',
                  'fr-btn--secondary',
                  'fr-btn--icon-left',
                  'fr-icon-edit-line',
                  styles.button,
                )
              : classNames(
                  'fr-btn',
                  'fr-btn--secondary',
                  'fr-btn--icon-left',
                  'fr-icon-edit-line',
                  styles.button,
                  'wip',
                )
          }
          href={isAdmin ? `/ressources/${resource.slug}/editer` : '/'}
        >
          {isAdmin ? 'Modifier' : 'Demander à contribuer'}
        </Link>
        <SaveResourceInCollectionButton
          resource={resource}
          user={user}
          className={styles.button}
          data-testid="save-resource-in-collection-button"
        />
        <Button
          size="large"
          className="fr-hidden-md"
          title="Plus d’action"
          priority="tertiary no outline"
          iconId="fr-icon-more-fill"
          {...resourceNavigationModalNativeButtonProps}
        />
        {!!user && (
          <ResourceReportButton className={styles.button} priority="tertiary" />
        )}
      </div>
      <div className="fr-hidden fr-unhidden-md">
        <ResourceSideMenu resource={resource} />
      </div>
    </div>
  </>
)

export default ResourceNavigation
