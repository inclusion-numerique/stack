'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import { Invitation } from '@app/web/equipe/InvitationValidation'

const InvitationButtons = ({
  data,
}: {
  data: EncodedState<Invitation>
}): ReactNode => {
  const router = useRouter()

  const invitation = decodeSerializableState(data, null)
  if (invitation == null) {
    router.push('/')
    return
  }

  const acceptMutation = trpc.mediateur.acceptInvitation.useMutation()
  const declineMutation = trpc.mediateur.declineInvitation.useMutation()
  const isLading = acceptMutation.isPending || declineMutation.isPending

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
          ...buttonLoadingClassname(isLading),
        },
        {
          children: 'Refuser l’invitation',
          onClick: onDecline,
          priority: 'secondary',
          ...buttonLoadingClassname(isLading),
        },
      ]}
    />
  )
}

export default withTrpc(InvitationButtons)
