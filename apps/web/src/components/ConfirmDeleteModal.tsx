import React, { ReactElement, ReactNode, useState } from 'react'
import Input from '@codegouvfr/react-dsfr/Input'
import { ModalProps } from '@codegouvfr/react-dsfr/Modal'

export const ConfirmDeleteModal = ({
  title,
  description,
  confirmText,
  Component: DeleteModal,
  onClose,
  onDelete,
}: {
  title: ReactNode
  description?: ReactNode
  confirmText: string
  Component: (props: ModalProps) => ReactElement
  onClose: () => void
  onDelete: () => void
}) => {
  const [validationInput, setValidationInput] = useState('')

  return (
    <DeleteModal
      title="Supprimer la collection"
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
      <p className="fr-mb-2w">{title}</p>
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
