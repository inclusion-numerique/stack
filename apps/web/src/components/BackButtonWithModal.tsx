'use client'

import React, { ReactNode } from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'

const BackButtonWithModal = ({
  modalTitle,
  modalContent,
  modalConfirmButtonLabel = 'Quitter',
  modalCancelButtonLabel = 'Annuler',
  href,
  children = 'Retour',
  className,
}: {
  modalTitle: ReactNode
  modalContent: ReactNode
  modalConfirmButtonLabel?: string
  modalCancelButtonLabel?: string
  href: string
  children?: ReactNode
  className?: string
}) => {
  const {
    Component: BackButtonModal,
    close: closeBackButtonModal,
    buttonProps: backButtonModalNativeButtonProps,
  } = createModal({
    id: 'back-button-modal',
    isOpenedByDefault: false,
  })

  return (
    <>
      <Button
        priority="tertiary no outline"
        size="small"
        className={classNames('fr-mt-4v fr-mb-4v', className)}
        iconId="fr-icon-arrow-left-line"
        {...backButtonModalNativeButtonProps}
      >
        {children}
      </Button>
      <BackButtonModal
        title={modalTitle}
        buttons={[
          {
            children: modalCancelButtonLabel,
            priority: 'secondary',
            onClick: closeBackButtonModal,
          },
          {
            children: modalConfirmButtonLabel,
            linkProps: { href },
          },
        ]}
      >
        {modalContent}
      </BackButtonModal>
    </>
  )
}

export default BackButtonWithModal
