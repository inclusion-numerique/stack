import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import OpenSaveResourceInCollectionModalButton from '@app/web/components/Resource/OpenSaveResourceInCollectionModalButton'
import { loginUrl } from '@app/web/security/login'

const secondaryButtonProps = {
  priority: 'secondary',
  children: 'Enregistrer',
} as const

const buttonIconOnlyProps = {
  title: secondaryButtonProps.children,
  size: 'small',
  priority: 'tertiary no outline',
} as const

const defaultIconId = 'fr-icon-bookmark-line' as const
const alreadySavedIconId = 'fr-icon-bookmark-fill' as const

const SaveResourceInCollectionButton = ({
  className,
  user,
  resource,
  iconOnly,
  'data-testid': dataTestid,
}: {
  className?: string
  user: SessionUser | null
  resource: { id: string; slug: string }
  iconOnly?: boolean
  'data-testid'?: string
}) => {
  const alreadySaved = user?.collections.some((collection) =>
    collection.resources.some(({ resourceId }) => resourceId === resource.id),
  )
  const buttonProps = {
    iconId: alreadySaved ? alreadySavedIconId : defaultIconId,
    ...(iconOnly ? buttonIconOnlyProps : secondaryButtonProps),
  }

  if (user) {
    return (
      <OpenSaveResourceInCollectionModalButton
        {...buttonProps}
        nativeButtonProps={{
          'data-testid': dataTestid,
        }}
        className={className}
        resourceId={resource.id}
      />
    )
  }
  return (
    <Button
      {...buttonProps}
      className={className}
      data-testid={dataTestid}
      linkProps={{
        href: loginUrl({
          intent: 'enregistrer-ressource-dans-collection',
          next: `/ressources/${resource.slug}`,
        }),
      }}
    />
  )
}

export default SaveResourceInCollectionButton
