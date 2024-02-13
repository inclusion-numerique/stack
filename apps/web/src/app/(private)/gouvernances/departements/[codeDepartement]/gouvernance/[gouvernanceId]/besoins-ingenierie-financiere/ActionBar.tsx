'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import styles from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ActionBar.module.css'

const CancelModal = createModal({
  isOpenedByDefault: false,
  id: 'cancel-formulaire-gouvernance',
})

const ActionBar = ({
  children,
  loading,
  submitLabel,
  onCancel,
}: PropsWithChildren<{
  loading: boolean
  submitLabel?: string
  onCancel?: () => void
}>) => {
  const canCancel = !!onCancel

  return (
    <>
      <div className={classNames(styles.container)}>
        <div className={classNames('fr-container', styles.content)}>
          <div className={styles.info}>
            {!!children && (
              <span data-testid="action-bar-info">{children}</span>
            )}
          </div>
          <div className={styles.buttons}>
            {canCancel && (
              <Button
                priority="tertiary"
                type="button"
                data-testid="action-bar-cancel"
                onClick={CancelModal.open}
                disabled={loading}
              >
                Effacer le formulaire
              </Button>
            )}

            <Button
              priority="primary"
              type="submit"
              className={loading ? 'fr-btn--loading' : undefined}
              data-testid="action-bar-submit"
              nativeButtonProps={{
                name: 'submit',
              }}
            >
              {submitLabel ?? 'Étape suivante'}
            </Button>
          </div>
        </div>
      </div>

      {canCancel && (
        <CancelModal.Component
          title="Effacer le formulaire"
          buttons={[
            {
              type: 'button',
              priority: 'secondary',
              doClosesModal: true,
              children: 'Reprendre',
              disabled: loading,
            },
            {
              type: 'button',
              priority: 'primary',
              children: 'Effacer le formulaire',
              doClosesModal: false,
              onClick: onCancel,
              className: loading ? 'fr-btn--loading' : undefined,
            },
          ]}
        >
          Êtes-vous sur de vouloir effacer les données des besoins en ingénierie
          financière&nbsp;? Cette action est irréversible.
        </CancelModal.Component>
      )}
    </>
  )
}

export default ActionBar
