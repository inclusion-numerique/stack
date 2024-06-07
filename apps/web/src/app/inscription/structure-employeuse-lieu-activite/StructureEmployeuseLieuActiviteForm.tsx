'use client'

import React from 'react'
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

  const onSubmit = async (estLieuActivite: boolean) => {
    try {
      await mutation.mutateAsync({
        userId,
        structureEmployeuseId,
        estLieuActivite,
      })
      router.refresh()
      router.push('/inscription/lieux-activite')
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  return (
    <div className="fr-btns-group fr-btns-group--inline fr-width-full fr-flex fr-direction-row">
      <Button
        type="button"
        priority="secondary"
        {...buttonLoadingClassname(isLoading, 'fr-mb-0 fr-flex-grow-1')}
        onClick={() => onSubmit(false)}
      >
        Non
      </Button>
      <Button
        type="button"
        priority="primary"
        {...buttonLoadingClassname(isLoading, 'fr-mb-0 fr-flex-grow-1')}
        onClick={() => onSubmit(true)}
      >
        Oui
      </Button>
    </div>
  )
}

export default withTrpc(StructureEmployeuseLieuActiviteForm)
