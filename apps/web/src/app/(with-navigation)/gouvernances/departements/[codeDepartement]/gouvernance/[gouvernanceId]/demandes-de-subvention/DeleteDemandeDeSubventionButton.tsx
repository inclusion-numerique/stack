'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'

const DeleteDemandeDeSubventionButton = ({
  demandeDeSubventionId,
}: {
  demandeDeSubventionId: string
}) => {
  const mutation = trpc.demandesDeSubvention.delete.useMutation()
  const onClick = async () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        'Êtes-vous sûr de vouloir supprimer cette demande de subvention ?',
      )
    ) {
      await mutation.mutateAsync({ id: demandeDeSubventionId })
    }
  }
  return <Button onClick={onClick}>Supprimer</Button>
}

export default withTrpc(DeleteDemandeDeSubventionButton)
