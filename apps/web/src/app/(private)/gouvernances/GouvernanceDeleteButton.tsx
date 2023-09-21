'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useRouter } from 'next/navigation'
import * as Sentry from '@sentry/nextjs'
import classNames from 'classnames'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const GouvernanceDeleteButton = ({
  gouvernanceId,
}: {
  gouvernanceId: string
}) => {
  const deletionModal = createModal({
    isOpenedByDefault: false,
    id: `gouvernance-deletion-${gouvernanceId}`,
  })

  const mutation = trpc.gouvernance.supprimer.useMutation()
  const router = useRouter()

  const onSupprimer = () => {
    mutation
      .mutateAsync({ gouvernanceId })
      .then(() => {
        deletionModal.close()
        router.refresh()
        return null
      })
      .catch((error) => {
        // TODO Toast ?
        Sentry.captureException(error)
      })
  }

  const isLoading = mutation.isLoading || mutation.isSuccess

  return (
    <>
      <Button
        type="button"
        priority="tertiary"
        iconId="fr-icon-delete-bin-line"
        title="Supprimer"
        onClick={() => deletionModal.open()}
      />
      <deletionModal.Component
        title="Supprimer"
        buttons={[
          {
            type: 'button',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            disabled: isLoading,
          },
          {
            type: 'button',
            priority: 'primary',
            children: 'Supprimer',
            onClick: onSupprimer,
            className: classNames(
              'fr-btn--danger',
              isLoading && 'fr-btn--loading',
            ),
          },
        ]}
      >
        Êtes-vous sûr de vouloir supprimer cette proposition de gouvernance
        pressentie&nbsp;?
      </deletionModal.Component>
    </>
  )
}

export default withTrpc(GouvernanceDeleteButton)
