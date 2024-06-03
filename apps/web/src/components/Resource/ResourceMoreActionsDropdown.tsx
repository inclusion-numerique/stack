import React, { ReactNode } from 'react'
import Link from 'next/link'
import { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { Dropdown } from '@app/web/components/Dropdown/Dropdown'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import OpenInviteContributorModalButton from './Contributors/OpenInviteContributorModalButton'
import OpenDeleteResourceModalButton from './OpenDeleteResourceModalButton'
import OpenSaveResourceInCollectionModalButton from './OpenSaveResourceInCollectionModalButton'

export const ResourceMoreActionsDropdown = ({
  resource,
  priority = 'tertiary no outline',
  children,
  saveResourceInCollection = true,
  copyLink = true,
}: {
  priority?: ButtonProps['priority']
  children?: ReactNode
  resource: ResourceListItem
  saveResourceInCollection?: boolean
  copyLink?: boolean
}) => (
  <Dropdown
    id={`more-actions-for-${resource.slug}`}
    title="Plus d'actions"
    priority={priority}
    size="small"
    alignRight
    displayDropdownArrow={false}
    control={
      <>
        <span className="ri-more-fill" aria-hidden />
        {children && <>&ensp;{children}</>}
      </>
    }
  >
    <ul>
      {resource.title && saveResourceInCollection && (
        <li>
          <OpenSaveResourceInCollectionModalButton
            size="small"
            title={`Enregistrer "${resource.title}" dans une collection`}
            resourceId={resource.id}
          >
            <span
              className="ri-bookmark-line fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Enregistrer
          </OpenSaveResourceInCollectionModalButton>
        </li>
      )}
      {copyLink && (
        <li>
          <CopyLinkButton
            size="small"
            priority="tertiary no outline"
            displayIcon={false}
            url={getServerUrl(`/ressources/${resource.slug}`, true)}
          >
            <span
              className="ri-link fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Partager un lien
          </CopyLinkButton>
        </li>
      )}
      <li>
        <Link
          className="fr-btn fr-btn--sm"
          href={`/ressources/${resource.slug}/parametres`}
        >
          <span
            className="ri-settings-5-line fr-mr-1w fr-text-label--blue-france"
            aria-hidden
          />
          Modifier les paramètres
        </Link>
      </li>
      <li>
        <OpenInviteContributorModalButton size="small" resource={resource}>
          <span
            className="ri-user-add-line fr-mr-1w fr-text-label--blue-france"
            aria-hidden
          />
          Inviter un contributeur
        </OpenInviteContributorModalButton>
      </li>
      <li>
        <Link
          className="fr-btn fr-btn--sm"
          href={`/ressources/${resource.slug}/avis`}
        >
          <span
            className="ri-emotion-line fr-mr-1w fr-text-label--blue-france"
            aria-hidden
          />
          Voir les avis
        </Link>
      </li>
      <li>
        <OpenDeleteResourceModalButton resourceId={resource.id} size="small">
          <span
            className="ri-delete-bin-6-line fr-mr-1w fr-text-label--blue-france"
            aria-hidden
          />
          Supprimer la ressource
        </OpenDeleteResourceModalButton>
      </li>
    </ul>
  </Dropdown>
)
