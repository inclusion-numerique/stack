'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useRouter } from 'next/navigation'

const ValiderFusion = ({
  sourceUser,
  targetUser,
}: {
  sourceUser: { id: string; name: string | null; email: string }
  targetUser: { id: string; name: string | null; email: string }
}) => {
  const router = useRouter()

  const mutation = trpc.user.merge.useMutation()

  const {
    Component: ValiderFusionModal,
    close: closeValiderFusionModal,
    buttonProps: validerFusionModalButtonProps,
  } = createModal({
    id: 'valider-fusion-modal',
    isOpenedByDefault: false,
  })

  const handleValiderFusion = async () => {
    await mutation.mutateAsync({
      sourceUserId: sourceUser.id,
      targetUserId: targetUser.id,
    })

    createToast({
      priority: 'success',
      message: `L’utilisateur ${sourceUser.name} (${sourceUser.email}) a bien été fusionné avec ${targetUser.name} (${targetUser.email})`,
    })

    router.replace(`/administration/utilisateurs/${targetUser.id}`)
    router.refresh()
  }

  return (
    <>
      <ValiderFusionModal
        title={
          <>
            <span className="fr-icon-git-merge-line" aria-hidden={true} />
            &nbsp; Fusionner des utilisateurs
          </>
        }
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            onClick: closeValiderFusionModal,
          },
          {
            children: 'Fusionner',
            onClick: handleValiderFusion,
          },
        ]}
      >
        Êtes-vous sûr de vouloir fusionner les utilisateurs suivants&nbsp;?
        <ul className="fr-mb-8v">
          <li>
            {sourceUser.name} - <strong>{sourceUser.email}</strong>
          </li>
          <li>
            {targetUser.name} - <strong>{targetUser.email}</strong>
          </li>
        </ul>
        <p>
          L’utilisateur {sourceUser.name} <strong>{sourceUser.email}</strong>{' '}
          sera supprimé.
        </p>
        <p>
          Toutes ses données seront transférées à l’utilisateur{' '}
          {targetUser.name} <strong>{targetUser.email}</strong>.
        </p>
        <p>Cette action est irréversible.</p>
      </ValiderFusionModal>
      <Button title="Valider la fusion" {...validerFusionModalButtonProps}>
        Valider la fusion
      </Button>
    </>
  )
}

export default withTrpc(ValiderFusion)
