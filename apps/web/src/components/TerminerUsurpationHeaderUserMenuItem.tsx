'use client'

import { useRouter } from 'next/navigation'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'

const TerminerUsurpationHeaderUserMenuItem = () => {
  const mutation = trpc.usurpation.stopUsurpation.useMutation()
  const router = useRouter()

  const terminerUsurpation = async () => {
    try {
      const initialUser = await mutation.mutateAsync()

      createToast({
        priority: 'success',
        message: `Usurpation terminée, vous êtes de retour en tant que ${initialUser.name || initialUser.email}`,
      })

      router.replace('/administration/usurpation')
    } catch {
      createToast({
        priority: 'error',
        message:
          'Erreur lors de la fin de l’usurpation, veuillez vous déconnecter',
      })
    }
  }

  return (
    <li>
      <button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...buttonLoadingClassname(
          mutation.isPending || mutation.isSuccess,
          'fr-nav__link',
        )}
        type="button"
        onClick={terminerUsurpation}
      >
        <span
          className="fr-icon-user-star-line fr-icon--sm fr-mr-1w"
          style={{ color: 'var(--blue-france-sun-113-625)' }}
        />
        Terminer usurpation
      </button>
    </li>
  )
}

export default withTrpc(TerminerUsurpationHeaderUserMenuItem)
