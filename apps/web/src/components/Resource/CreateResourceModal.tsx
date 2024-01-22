/* eslint react/jsx-props-no-spreading: off */
import React from 'react'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Button from '@codegouvfr/react-dsfr/Button'

export const CreateResourceModal = createModal({
  id: 'create-resource',
  isOpenedByDefault: false,
})

export const createResourceModalId =
  CreateResourceModal.buttonProps['aria-controls']

export const CreateResourceButton = ({ className }: { className?: string }) => (
  <Button
    type="button"
    iconId="fr-icon-edit-box-line"
    className={className}
    {...CreateResourceModal.buttonProps}
  >
    Créer une ressource
  </Button>
)
