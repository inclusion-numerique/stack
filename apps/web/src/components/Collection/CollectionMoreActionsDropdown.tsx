import React, { ReactNode } from 'react'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { Dropdown } from '@app/web/components/Dropdown/Dropdown'
import OpenDeleteCollectionModalButton from '@app/web/components/Collection/OpenDeleteCollectionModalButton'
import OpenSaveCollectionModalButton from '@app/web/components/Collection/OpenSaveCollectionModalButton'

export const CollectionMoreActionsDropdown = ({
  collection,
  priority = 'tertiary no outline',
  modalPriority = 'tertiary no outline',
  modalControlClassName,
  dropdownControlClassName,
  children,
  size = 'small',
}: {
  collection: {
    isFavorites: boolean
    id: string
    slug: string
    title: string
  }
  priority?: ButtonProps['priority']
  modalPriority?: ButtonProps['priority']
  modalControlClassName?: string
  dropdownControlClassName?: string
  children?: ReactNode
  size?: ButtonProps['size']
}) => (
  <Dropdown
    id={`more_actions_for_${collection.slug}`}
    title="Options sur la collection"
    priority={priority}
    modalPriority={modalPriority}
    modalControlClassName={modalControlClassName}
    dropdownControlClassName={dropdownControlClassName}
    size={size}
    alignRight
    displayDropdownArrow={false}
    control={
      <>
        <span className="ri-more-fill" aria-hidden />
        {children}
      </>
    }
  >
    <ul>
      <li>
        <Button className="fr-btn fr-btn--sm" disabled>
          <div>
            <span
              className="ri-folder-open-line fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Gérer les ressources
          </div>
        </Button>
      </li>
      <div className="fr-hidden fr-unhidden-sm fr-border-bottom fr-border--grey fr-mx-3v" />
      <li>
        <OpenSaveCollectionModalButton
          className="fr-btn fr-btn--sm"
          collectionId={collection.id}
          data-testid="save-collection-button"
        >
          <span
            className="ri-bookmark-line fr-mr-1w fr-text-label--blue-france"
            aria-hidden
          />
          Enregistrer la collection
        </OpenSaveCollectionModalButton>
      </li>
      <div className="fr-hidden fr-unhidden-sm fr-border-bottom fr-border--grey fr-mx-3v" />
      <li>
        <Link
          className="fr-btn fr-btn--sm"
          href={`/collections/${collection.slug}/modifier`}
        >
          <span
            className="ri-settings-3-line fr-mr-1w fr-text-label--blue-france"
            aria-hidden
          />
          Modifier les paramètres
        </Link>
      </li>
      <div className="fr-hidden fr-unhidden-sm fr-border-bottom fr-border--grey fr-mx-3v" />
      <li>
        <OpenDeleteCollectionModalButton
          collectionId={collection.id}
          collectionTitle={collection.title}
          size="small"
        >
          <span
            className="ri-delete-bin-6-line fr-mr-1w fr-text-label--blue-france"
            aria-hidden
          />
          Supprimer la collection
        </OpenDeleteCollectionModalButton>
      </li>
    </ul>
  </Dropdown>
)
