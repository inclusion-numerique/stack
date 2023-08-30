'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useRouter } from 'next/navigation'
import * as Sentry from '@sentry/nextjs'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { PropsWithChildren, ReactNode } from 'react'
import { trpc } from '@app/web/trpc'
import PersistenceStateBadge from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/PersistenceStateBadge'
import styles from './ActionBar.module.css'

const CancelModal = createModal({
  isOpenedByDefault: false,
  id: 'cancel-formulaire-gouvernance',
})

const ActionBar = ({
  children,
  loading,
  autoSaving,
  formulaireGouvernanceId,
  skip,
  submitLabel,
}: PropsWithChildren<{
  autoSaving: boolean
  formulaireGouvernanceId: string
  loading: boolean
  skip?: ReactNode
  submitLabel?: string
}>) => {
  const mutation = trpc.formulaireGouvernance.annuler.useMutation()
  const router = useRouter()

  const onAnnulerFormulaire = () => {
    mutation
      .mutateAsync({ formulaireGouvernanceId })
      .then(() => {
        router.refresh()
        router.push('/')
        return null
      })
      .catch((error) => {
        // TODO Toast ?
        Sentry.captureException(error)
      })
  }

  const cancelLoading = mutation.isLoading || mutation.isSuccess

  return (
    <>
      <div className={classNames(styles.container)}>
        <div className={classNames('fr-container', styles.content)}>
          <div className={styles.info}>
            {children}
            {!!children && <span className="fr-mx-1w fr-text--bold">·</span>}
            <PersistenceStateBadge state={autoSaving ? 'saving' : 'saved'} />
          </div>
          <div className={styles.buttons}>
            {!!skip && (
              <Button
                priority="tertiary no outline"
                type="submit"
                className={loading ? 'fr-btn--loading' : undefined}
                disabled={autoSaving}
                nativeButtonProps={{
                  name: 'skip',
                }}
              >
                {skip}
              </Button>
            )}
            <Button
              priority="secondary"
              type="button"
              onClick={CancelModal.open}
              disabled={autoSaving || loading}
            >
              Annuler
            </Button>

            <Button
              priority="primary"
              type="submit"
              className={loading ? 'fr-btn--loading' : undefined}
              disabled={autoSaving}
              nativeButtonProps={{
                name: 'submit',
              }}
            >
              {submitLabel ?? 'Étape suivante'}
            </Button>
          </div>
        </div>
      </div>

      <CancelModal.Component
        title="Annuler la saisie du formulaire"
        buttons={[
          {
            type: 'button',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Reprendre',
            disabled: cancelLoading,
          },
          {
            type: 'button',
            priority: 'primary',
            children: 'Quitter le formulaire',
            onClick: onAnnulerFormulaire,
            className: cancelLoading ? 'fr-btn--loading' : undefined,
          },
        ]}
      >
        Êtes-vous sur de vouloir annuler la saisie du formulaire&nbsp;? Toutes
        les informations déjà complétées seront supprimés.
      </CancelModal.Component>
    </>
  )
}

export default ActionBar
