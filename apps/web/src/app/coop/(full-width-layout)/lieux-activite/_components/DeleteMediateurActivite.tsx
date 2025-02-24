'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useRouter } from 'next/navigation'

const DeleteMediateurActivite = ({
  mediateurEnActiviteId,
}: {
  mediateurEnActiviteId: string
}) => {
  const {
    Component: DeleteModal,
    close: closeDeleteModal,
    buttonProps: deleteModalNativeButtonProps,
  } = createModal({
    id: `delete-activite-${mediateurEnActiviteId}`,
    isOpenedByDefault: false,
  })

  const router = useRouter()
  const deleteMutation = trpc.lieuActivite.delete.useMutation()

  const isLoading = deleteMutation.isPending

  const handleDeleteMediateurActivite = async () => {
    try {
      await deleteMutation.mutateAsync({ mediateurEnActiviteId })

      closeDeleteModal()
      router.refresh()

      createToast({
        priority: 'success',
        message: 'Le lieu d’activité a bien été supprimé de votre liste !',
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Le lieu d’activité n’a pas pu être supprimé de votre liste',
      })
    }
  }

  return (
    <>
      <Button
        type="button"
        size="small"
        priority="tertiary no outline"
        title="Supprimer"
        disabled={isLoading}
        {...deleteModalNativeButtonProps}
      >
        <span className="ri-delete-bin-6-line" />
        <span className="fr-sr-only">Supprimer</span>
      </Button>
      <DeleteModal
        title="Supprimer ce lieu d’activité de votre liste"
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            disabled: isLoading,
            onClick: closeDeleteModal,
          },
          {
            children: 'Supprimer',
            ...buttonLoadingClassname(isLoading, 'fr-btn--danger'),
            onClick: handleDeleteMediateurActivite,
          },
        ]}
      >
        Êtes-vous sûr de vouloir supprimer ce lieu de votre liste de lieu
        d’activité&nbsp;?
      </DeleteModal>
    </>
  )
}
export default withTrpc(DeleteMediateurActivite)
