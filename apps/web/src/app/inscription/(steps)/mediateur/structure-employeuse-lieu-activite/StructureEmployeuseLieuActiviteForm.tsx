'use client'

import React, { useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'

const StructureEmployeuseLieuActiviteForm = ({
  userId,
  structureEmployeuseId,
}: {
  userId: string
  structureEmployeuseId: string
}) => {
  const mutation =
    trpc.inscription.ajouterStructureEmployeuseEnLieuActivite.useMutation()

  const router = useRouter()

  // If the "Oui" or "Non" option was clicked
  const [submittedEstLieuActivite, setSubmittedEstLieuActivite] =
    useState(false)

  const onSubmit = async (estLieuActivite: boolean) => {
    try {
      setSubmittedEstLieuActivite(estLieuActivite)
      await mutation.mutateAsync({
        userId,
        structureEmployeuseId,
        estLieuActivite,
      })
      router.push('/inscription/mediateur/lieux-activite')
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  const isNonLoading = submittedEstLieuActivite === false && isLoading
  const isOuiLoading = submittedEstLieuActivite === true && isLoading

  return (
    <div className="fr-btns-group fr-btns-group--inline fr-width-full fr-flex fr-direction-row">
      <Button
        type="button"
        priority="secondary"
        {...buttonLoadingClassname(isNonLoading, 'fr-mb-0 fr-flex-grow-1')}
        disabled={isOuiLoading}
        onClick={() => onSubmit(false)}
      >
        Non
      </Button>
      <Button
        type="button"
        priority="primary"
        {...buttonLoadingClassname(isOuiLoading, 'fr-mb-0 fr-flex-grow-1')}
        disabled={isNonLoading}
        onClick={() => onSubmit(true)}
      >
        Oui
      </Button>
    </div>
  )
}

export default withTrpc(StructureEmployeuseLieuActiviteForm)
