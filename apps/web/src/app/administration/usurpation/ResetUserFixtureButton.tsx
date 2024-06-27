'use client'

import { createToast } from '@app/ui/toast/createToast'
import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const ResetUserFixtureButton = ({ userId }: { userId: string }) => {
  const mutation = trpc.usurpation.resetUserFixture.useMutation()

  const resetUserFixture = async () => {
    try {
      const reset = await mutation.mutateAsync({ userId })

      createToast({
        priority: 'success',
        message: `${reset.name || reset.email} a bien été réinitialisé`,
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Erreur lors de la réinitialisation, veuillez réessayer ou contacter le support',
      })
    }
  }

  return (
    <Button
      type="button"
      iconId="fr-icon-recycle-line"
      size="small"
      priority="secondary"
      onClick={resetUserFixture}
      {...buttonLoadingClassname(mutation.isPending)}
    >
      Réinitialiser
    </Button>
  )
}

export default withTrpc(ResetUserFixtureButton)
