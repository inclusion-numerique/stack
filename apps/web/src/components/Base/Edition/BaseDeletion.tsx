'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import Input from '@codegouvfr/react-dsfr/Input'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { BasePageData } from '@app/web/server/bases/getBase'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: 'delete-base',
  isOpenedByDefault: false,
})

const BaseEdition = ({ base }: { base: BasePageData }) => {
  const router = useRouter()
  const mutate = trpc.base.delete.useMutation()

  const [validationInput, setValidationInput] = useState('')

  const onDelete = async () => {
    closeDeleteModal()
    try {
      await mutate.mutateAsync({ id: base.id })
      router.refresh()
      router.push('/')
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de la suppression de la base',
      })
      mutate.reset()
    }
  }
  return (
    <>
      <Button
        className="fr-btn--danger"
        data-testid="delete-base-button"
        {...deleteModalNativeButtonProps}
      >
        Supprimer la base
      </Button>
      <DeleteModal
        title="Supprimer la base"
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            onClick: closeDeleteModal,
          },
          {
            children: 'Supprimer',
            className: 'fr-btn--danger',
            onClick: onDelete,
            disabled: validationInput !== base.title,
            nativeButtonProps: {
              'data-testid': 'modal-delete-button',
            },
          },
        ]}
      >
        <p className="fr-mb-2w">
          Êtes-vous sûr de vouloir supprimer votre base ?
        </p>
        <p className="fr-text--bold">
          Cette action est irréversible et entraîne la suppression définitive de
          toutes les ressources de la Base.
        </p>
        <Input
          label={`Écrivez “${base.title}” dans le champ ci-dessous`}
          nativeInputProps={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: wrong dsfr type
            'data-testid': 'modal-input',
            onChange: (event) => {
              setValidationInput(event.target.value)
            },
          }}
        />
      </DeleteModal>
    </>
  )
}

export default withTrpc(BaseEdition)
