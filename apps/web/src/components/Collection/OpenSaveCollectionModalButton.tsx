'use client'

import { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import Button from '@codegouvfr/react-dsfr/Button'
import { SaveCollectionDynamicModal } from '@app/web/components/Collection/SaveCollectionModal'
import { ReactNode } from 'react'

const OpenSaveCollectionModalButton = ({
  collectionId,
  children,
  ...buttonProps
}: ButtonProps &
  ButtonProps.AsButton & {
    collectionId: string
    children?: ReactNode
  }) => {
  const open = SaveCollectionDynamicModal.useOpen()

  return (
    <Button {...buttonProps} onClick={() => open({ collectionId })}>
      {children}
    </Button>
  )
}

export default OpenSaveCollectionModalButton
