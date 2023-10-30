'use client'

import { useRouter } from 'next/navigation'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import classNames from 'classnames'
import React from 'react'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

export const DeleteResourceDynamicModal = createDynamicModal({
  id: 'delete-resource-modal',
  isOpenedByDefault: false,
  initialState: {
    resourceId: null as string | null,
  },
})

const DeleteResource = () => {
  const { resourceId } = DeleteResourceDynamicModal.useState()

  const router = useRouter()
  const mutation = trpc.resource.mutate.useMutation()

  const onDelete = async () => {
    if (!resourceId) {
      return
    }
    try {
      await mutation.mutateAsync({
        name: 'Delete',
        payload: {
          resourceId,
        },
      })
      router.refresh()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <DeleteResourceDynamicModal.Component
      title="Supprimer la ressource"
      buttons={[
        {
          title: 'Annuler',
          priority: 'secondary',
          doClosesModal: true,
          children: 'Annuler',
          type: 'button',
        },
        {
          title: 'Supprimer',
          doClosesModal: true,
          children: 'Supprimer',
          type: 'button',
          onClick: onDelete,
          nativeButtonProps: {
            className: classNames(
              'fr-btn--danger',
              mutation.isPending && 'fr-btn--loading',
            ),
            'data-testid': 'delete-resource-modal-submit',
          },
        },
      ]}
    >
      <p>
        Confirmez-vous la suppression de la ressource ? Tous les contenus de la
        ressource seront supprimés avec elle.
      </p>
      {mutation.error && (
        <p className="fr-error-text" data-testid="invite-members-error">
          {mutation.error.message}
        </p>
      )}
    </DeleteResourceDynamicModal.Component>
  )
}

export default withTrpc(DeleteResource)
