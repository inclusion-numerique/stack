import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import { loginUrl } from '@app/web/security/login'
import OpenSaveCollectionModalButton from '@app/web/components/Collection/OpenSaveCollectionModalButton'
import { getBasesFromSessionUser } from '@app/web/bases/getBasesFromSessionUser'

const viewButtonProps = {
  title: 'Enregistrer la collection',
  size: 'small',
  priority: 'secondary',
} as const

const cardButtonProps = {
  ...viewButtonProps,
  priority: 'tertiary no outline',
} as const
const defaultIconId = 'ri-bookmark-3-line' as const
const alreadySavedIconId = 'ri-bookmark-3-fill' as const

const SaveCollectionButton = ({
  className,
  user,
  collection,
  'data-testid': dataTestid,
  context,
}: {
  className?: string
  user: SessionUser | null
  collection: { id: string; isPublic: boolean }
  'data-testid'?: string
  context: 'card' | 'view'
}) => {
  const alreadySavedInProfile = !!user?.savedCollections.some(
    (savedCollection) => savedCollection.collectionId === collection.id,
  )

  const userBases = user ? getBasesFromSessionUser(user) : null

  const alreadySavedInBases = !!userBases?.some((base) =>
    base.savedCollections.some(
      (savedCollection) => savedCollection.collectionId === collection.id,
    ),
  )

  const alreadySaved = alreadySavedInProfile || alreadySavedInBases

  const buttonProps = {
    ...(context === 'card' ? cardButtonProps : viewButtonProps),
    iconId: alreadySaved ? alreadySavedIconId : defaultIconId,
  }

  if (user) {
    return (
      <OpenSaveCollectionModalButton
        {...buttonProps}
        nativeButtonProps={{
          'data-testid': dataTestid,
        }}
        className={className}
        collectionId={collection.id}
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
          intent: 'enregistrer-collection',
          next: `/collections/${collection.id}`,
        }),
      }}
    />
  )
}

export default SaveCollectionButton
