'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import ActionBar from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ActionBar'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const Recapitulatif = ({
  missingContacts,
  formulaireGouvernanceId,
  nextEtapePath,
}: {
  missingContacts: number
  formulaireGouvernanceId: string
  nextEtapePath: string
}) => {
  const error =
    missingContacts > 0
      ? 'Vous devez renseigner les contacts manquants pour valider le périmètre de votre feuille de route.'
      : null

  const [showError, setShowError] = useState(false)

  const mutation = trpc.formulaireGouvernance.recapitulatif.useMutation()

  const router = useRouter()
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowError(true)
    if (error) {
      setTimeout(() => {
        // Scroll on next render
        document.querySelector('#etape-error')?.scrollIntoView()
      }, 0)
      return
    }

    try {
      await mutation.mutateAsync({
        formulaireGouvernanceId,
      })
      router.refresh()
      router.push(nextEtapePath)
    } catch (mutationError) {
      console.error(mutationError)
    }
  }
  const isLoading = mutation.isLoading || mutation.isSuccess

  return (
    <form onSubmit={onSubmit}>
      {showError && !!error && (
        <p id="etape-error" className="fr-error-text fr-text--sm fr-my-6v">
          {error}
        </p>
      )}

      <ActionBar
        autoSaving={false}
        loading={isLoading}
        formulaireGouvernanceId={formulaireGouvernanceId}
        submitLabel="Confirmer & envoyer"
      />
    </form>
  )
}

export default withTrpc(Recapitulatif)
