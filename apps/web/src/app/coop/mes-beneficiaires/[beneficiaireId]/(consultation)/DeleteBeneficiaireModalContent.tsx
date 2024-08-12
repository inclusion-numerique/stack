'use client'

import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { DeleteBeneficiaireModal } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/DeleteBeneficiaireModal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'

const DeleteBeneficiaireModalContent = ({
  beneficiaireId,
  displayName,
  nextPath = '/coop/mes-beneficiaires',
}: {
  displayName: string
  beneficiaireId: string
  nextPath?: string
}) => {
  const router = useRouter()
  const mutation = trpc.beneficiaires.delete.useMutation()

  const onDelete = async () => {
    try {
      await mutation.mutateAsync({
        id: beneficiaireId,
      })
      router.push(nextPath)
      router.refresh()
      createToast({
        priority: 'success',
        message: (
          <>
            <strong>{displayName}</strong> a bien été supprimé(e)
          </>
        ),
      })
      DeleteBeneficiaireModal.close()
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la suppression du bénéficiaire',
      })
      mutation.reset()
    }
  }
  return (
    <DeleteBeneficiaireModal.Component
      title="Supprimer un bénéficiaire"
      buttons={[
        {
          title: 'Annuler',
          priority: 'secondary',
          doClosesModal: true,
          children: 'Annuler',
          type: 'button',
        },
        {
          title: 'Supprimer',
          doClosesModal: false,
          children: 'Supprimer',
          type: 'button',
          onClick: onDelete,
          nativeButtonProps: {
            className: classNames(
              'fr-btn--danger',
              mutation.isPending && 'fr-btn--loading',
            ),
            'data-testid': 'delete-resource-modal-submit',
          },
        },
      ]}
    >
      <p>
        <strong>{displayName}</strong> sera supprimé(e) de votre liste de
        bénéficiaires et ses informations personnelles ne seront plus
        récupérables.
      </p>
      <p>
        Vos statistiques ne seront pas impactées, et les données anonymes
        (tranche d’âge, genre, etc.) seront conservées.
      </p>
    </DeleteBeneficiaireModal.Component>
  )
}

export default withTrpc(DeleteBeneficiaireModalContent)
