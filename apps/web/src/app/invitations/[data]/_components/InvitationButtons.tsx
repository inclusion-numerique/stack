'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { Invitation } from '@app/web/equipe/InvitationValidation'
import { trpc } from '@app/web/trpc'
import {
  EncodedState,
  decodeSerializableState,
} from '@app/web/utils/encodeSerializableState'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const InvitationButtons = ({
  data,
}: {
  data: EncodedState<Invitation>
}): ReactNode => {
  const router = useRouter()

  const invitation = decodeSerializableState(data, null)

  const acceptMutation = trpc.mediateur.acceptInvitation.useMutation()
  const declineMutation = trpc.mediateur.declineInvitation.useMutation()

  if (invitation == null) {
    router.push('/')
    return
  }
  const isLoading = acceptMutation.isPending || declineMutation.isPending

  const onAccept = async () => {
    await acceptMutation.mutateAsync(invitation)

    createToast({
      priority: 'success',
      message: 'Vous avez accepté l’invitation',
    })

    router.push(`/coop/mes-equipes/${invitation.coordinateurId}`)
  }

  const onDecline = async () => {
    await declineMutation.mutateAsync(invitation)
    router.push(`${data}/refuser`)
  }

  return (
    <ButtonsGroup
      buttons={[
        {
          children: 'Accepter l’invitation',
          onClick: onAccept,
          ...buttonLoadingClassname(isLoading),
        },
        {
          children: 'Refuser l’invitation',
          onClick: onDecline,
          priority: 'secondary',
          ...buttonLoadingClassname(isLoading),
        },
      ]}
    />
  )
}

export default withTrpc(InvitationButtons)
