'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const LeaveTeamButton = ({ coordinateurId }: { coordinateurId: string }) => {
  const {
    Component: LeaveTeamModal,
    close: closeLeaveTeamModal,
    buttonProps: leaveTeamModalNativeButtonProps,
  } = createModal({
    id: 'leave-team-modal',
    isOpenedByDefault: false,
  })

  const router = useRouter()
  const mutation = trpc.mediateur.leaveTeam.useMutation()

  return (
    <>
      <LeaveTeamModal
        title="Quitter l’équipe"
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            onClick: closeLeaveTeamModal,
          },
          {
            children: 'Quitter l’équipe',
            onClick: async () => {
              await mutation.mutateAsync({ coordinateurId })
              router.push('/coop')
              router.refresh()
            },
          },
        ]}
      >
        <span className="fr-display-block fr-mb-6v">
          Êtes-vous sur de vouloir quitter votre équipe&nbsp;?
        </span>
        En quittant cette équipe, votre coordinateur n’aura plus accès à vos
        statistiques et vous ne serez plus référencé comme membre de l’équipe.
      </LeaveTeamModal>
      <Button priority="secondary" {...leaveTeamModalNativeButtonProps}>
        Quitter l’équipe
      </Button>
    </>
  )
}

export default withTrpc(LeaveTeamButton)
