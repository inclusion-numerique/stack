'use client'

import { useRouter } from 'next/navigation'
import { createToast } from '@app/ui/toast/createToast'
import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { getLoginRedirectUrl } from '@app/web/security/getHomepage'

const UsurpUserButton = ({
  userId,
  disabled,
  size = 'medium',
}: {
  userId: string
  disabled?: boolean
  size?: 'small' | 'large' | 'medium'
}) => {
  const mutation = trpc.usurpation.usurpUser.useMutation()
  const router = useRouter()

  const usurpUser = async () => {
    try {
      const usurped = await mutation.mutateAsync({ userId })

      createToast({
        priority: 'success',
        message: `Vous êtes maintenant connecté en tant que ${usurped.name || usurped.email}`,
      })

      router.replace(getLoginRedirectUrl(usurped))
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message:
          'Erreur lors de l’usurpation, veuillez réessayer ou contacter le support',
      })
    }
  }

  return (
    <Button
      type="button"
      iconId="fr-icon-user-star-line"
      priority="secondary"
      size={size}
      disabled={disabled}
      onClick={usurpUser}
      {...buttonLoadingClassname(mutation.isPending || mutation.isSuccess)}
    >
      Usurper
    </Button>
  )
}

export default withTrpc(UsurpUserButton)
