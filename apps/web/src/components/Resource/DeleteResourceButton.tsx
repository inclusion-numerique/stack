'use client'

import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { DeleteResourceDynamicModal } from '@app/web/components/Resource/DeleteResource/DeleteResource'

const DeleteResourceButton = ({ resourceId }: { resourceId: string }) => {
  const open = DeleteResourceDynamicModal.useOpen()

  return (
    <Button
      title="Supprimer la ressource"
      iconId="fr-icon-delete-line"
      size="small"
      priority="tertiary no outline"
      onClick={() => open({ resourceId })}
    />
  )
}

export default withTrpc(DeleteResourceButton)
