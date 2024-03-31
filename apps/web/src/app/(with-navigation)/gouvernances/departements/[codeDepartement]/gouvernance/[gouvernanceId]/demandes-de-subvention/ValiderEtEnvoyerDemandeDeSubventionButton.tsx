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

const ValiderEtEnvoyerDemandeDeSubventionButton = ({
  demandeDeSubventionId,
  disabled,
}: {
  demandeDeSubventionId: string
  disabled: boolean
}) => {
  const mutation = trpc.demandesDeSubvention.validerEtEnvoyer.useMutation()
  const router = useRouter()

  const { open, Component, close } = createModal({
    isOpenedByDefault: false,
    id: `valider_et_envoyer_${demandeDeSubventionId}`,
  })

  const onClick = () => {
    open()
  }

  const onConfirm = async () => {
    try {
      await mutation.mutateAsync({ id: demandeDeSubventionId })
      createToast({
        priority: 'success',
        message: 'La demande de subvention a bien été envoyée',
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
        disabled={disabled}
        size="small"
      >
        Valider&nbsp;&&nbsp;envoyer
      </Button>
      {renderModal &&
        createPortal(
          <Component
            title="Valider et envoyer votre demande de subvention"
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
                children: 'Valider & envoyer',
                iconId: 'fr-icon-check-line',
                iconPosition: 'right',
                onClick: onConfirm,
                ...buttonLoadingClassname(isLoading),
              },
            ]}
          >
            Cette validation est définitive, vous ne pourrez plus modifier votre
            action et la demande de subvention correspondante.
            <br />
            <br />
            Nos équipes instruisent les demandes de subvention au fur et à
            mesure de leur réception.
            <br />
            <br />
            1. Si la demande est conforme, nos équipes reviennent vers les
            destinataires des fonds pour établir les conventions. Les
            préfectures seront en copie des échanges.
            <br />
            <br />
            2. Si la demande nécessite des précisions, nos équipes reviennent
            vers la préfecture.
          </Component>,
          document.body,
        )}
    </>
  )
}

export default withTrpc(ValiderEtEnvoyerDemandeDeSubventionButton)
