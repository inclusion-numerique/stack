'use client'

import { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import Button from '@codegouvfr/react-dsfr/Button'
import { SaveCollectionDynamicModal } from '@app/web/components/Collection/SaveCollectionModal'

const OpenSaveCollectionModalButton = ({
  collectionId,
  ...buttonProps
}: ButtonProps &
  ButtonProps.AsButton & {
    collectionId: string
  }) => {
  const open = SaveCollectionDynamicModal.useOpen()

  return <Button {...buttonProps} onClick={() => open({ collectionId })} />
}

export default OpenSaveCollectionModalButton
