import React, { ReactElement, ReactNode, useState } from 'react'
import Input from '@codegouvfr/react-dsfr/Input'
import { ModalProps } from '@codegouvfr/react-dsfr/Modal'

export const ConfirmDeleteModal = ({
  title,
  message,
  description,
  confirmText,
  Component: DeleteModal,
  onClose,
  onDelete,
}: {
  title: ReactNode
  message?: ReactNode
  description?: ReactNode
  confirmText: string
  Component: (props: ModalProps) => ReactElement
  onClose: () => void
  onDelete: () => void
}) => {
  const [validationInput, setValidationInput] = useState('')

  return (
    <DeleteModal
      title={title}
      buttons={[
        {
          children: 'Annuler',
          priority: 'secondary',
          onClick: onClose,
        },
        {
          children: 'Supprimer',
          className: 'fr-btn--danger',
          onClick: onDelete,
          disabled: validationInput !== confirmText,
          nativeButtonProps: {
            'data-testid': 'modal-delete-button',
          },
        },
      ]}
    >
      {message && <p className="fr-mb-2w">{message}</p>}
      {description && <p className="fr-text--bold">{description}</p>}
      <Input
        label={`Écrivez “${confirmText}” dans le champ ci-dessous`}
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
  )
}
