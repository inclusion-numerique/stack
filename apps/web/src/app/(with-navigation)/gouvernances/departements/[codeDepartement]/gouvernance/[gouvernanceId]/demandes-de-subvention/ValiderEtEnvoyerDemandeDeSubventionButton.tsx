'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import * as Sentry from '@sentry/nextjs'
import classNames from 'classnames'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const ValiderEtEnvoyerDemandeDeSubventionButton = ({
  demandeDeSubventionId,
  disabled,
}: {
  demandeDeSubventionId: string
  disabled: boolean
}) => {
  const mutation = trpc.demandesDeSubvention.validerEtEnvoyer.useMutation()
  const router = useRouter()

  const { open, Component } = createModal({
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
    } catch (error) {
      Sentry.captureException(error)
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue, merci de réessayer ultérieurement',
      })
    }
  }

  const isLoading = mutation.isSuccess || mutation.isPending

  return (
    <>
      <Button
        {...buttonLoadingClassname(isLoading)}
        onClick={onClick}
        iconId="fr-icon-check-line"
        iconPosition="right"
        disabled={disabled}
      >
        Valider&nbsp;&&nbsp;envoyer
      </Button>
      <Component
        title="TODO"
        buttons={[
          {
            type: 'button',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            disabled: isLoading,
          },
          {
            type: 'button',
            priority: 'primary',
            children: 'Valider & envoyer',
            onClick: onConfirm,
            className: classNames(isLoading && 'fr-btn--loading'),
          },
        ]}
      >
        Hello
      </Component>
    </>
  )
}

export default withTrpc(ValiderEtEnvoyerDemandeDeSubventionButton)
