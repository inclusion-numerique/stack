'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import * as Sentry from '@sentry/nextjs'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { isBrowser } from '@app/web/utils/isBrowser'

const AccepterDemandeDeSubventionButton = ({
  demandeDeSubventionId,
}: {
  demandeDeSubventionId: string
}) => {
  const mutation = trpc.demandesDeSubvention.accepter.useMutation()
  const router = useRouter()

  const { open, Component, close } = createModal({
    isOpenedByDefault: false,
    id: `accepter_${demandeDeSubventionId}`,
  })

  const onClick = () => {
    open()
  }

  const onConfirm = async () => {
    try {
      await mutation.mutateAsync({ id: demandeDeSubventionId })
      createToast({
        priority: 'success',
        message: 'La demande de subvention a bien été acceptée',
      })
      router.refresh()
      close()
    } catch (error) {
      Sentry.captureException(error)
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue, merci de réessayer ultérieurement',
      })
    }
  }

  const isLoading = mutation.isPending

  const [renderModal, setRenderModal] = useState(false)

  useEffect(() => {
    setRenderModal(isBrowser)
  }, [])

  return (
    <>
      <Button
        {...buttonLoadingClassname(isLoading)}
        onClick={onClick}
        iconId="fr-icon-check-line"
        iconPosition="right"
      >
        Accepter
      </Button>
      {renderModal &&
        createPortal(
          <Component
            title="Accepter la demande de subvention"
            buttons={[
              {
                type: 'button',
                priority: 'secondary',
                doClosesModal: true,
                children: 'Annuler',
                disabled: isLoading,
              },
              {
                doClosesModal: false,
                type: 'button',
                priority: 'primary',
                children: 'Accepter',
                iconId: 'fr-icon-check-line',
                iconPosition: 'right',
                onClick: onConfirm,
                ...buttonLoadingClassname(isLoading),
              },
            ]}
          >
            Êtes-vous sûr de vouloir accepter cette demande de subvention&nbsp;?
          </Component>,
          document.body,
        )}
    </>
  )
}

export default withTrpc(AccepterDemandeDeSubventionButton)
