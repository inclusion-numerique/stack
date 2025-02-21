'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'

const ResetUserInscriptionButton = ({ userId }: { userId: string }) => {
  const mutation = trpc.user.resetInscription.useMutation()

  const router = useRouter()

  const resetUserInscription = async () => {
    try {
      const reset = await mutation.mutateAsync({ userId })
      router.push(`/administration/utilisateurs/${userId}`)
      router.refresh()

      createToast({
        priority: 'success',
        message: `L‘inscription pour ${reset.name || reset.email} a bien été réinitialisé`,
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
      onClick={resetUserInscription}
      {...buttonLoadingClassname(mutation.isPending)}
    >
      Réinitialiser l‘inscription
    </Button>
  )
}

export default withTrpc(ResetUserInscriptionButton)
