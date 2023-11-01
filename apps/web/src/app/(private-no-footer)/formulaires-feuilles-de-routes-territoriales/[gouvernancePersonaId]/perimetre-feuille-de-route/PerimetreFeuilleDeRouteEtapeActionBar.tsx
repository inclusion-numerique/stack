import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import ActionBar from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ActionBar'
import { sPluriel } from '@app/web/utils/sPluriel'
import { trpc } from '@app/web/trpc'

const PerimetreFeuilleDeRouteEtapeActionBar = ({
  formulaireGouvernanceId,
  nextEtapePath,
  etapeError,
  isAutoSaving,
  totalSelectedEpcis,
  totalSelectedCommunes,
}: {
  nextEtapePath: string
  isAutoSaving: boolean
  etapeError: string | null
  totalSelectedEpcis: number
  totalSelectedCommunes: number
  formulaireGouvernanceId: string
}) => {
  const [showEtapeErrors, setShowEtapeErrors] = useState(false)

  const etapeMutation =
    trpc.formulaireGouvernance.etapePerimetreFeuilleDeRoute.useMutation()

  const router = useRouter()
  const onPageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowEtapeErrors(true)
    if (etapeError) {
      setTimeout(() => {
        // Scroll on next render
        document.querySelector('#etape-error')?.scrollIntoView()
      }, 0)
      return
    }

    try {
      await etapeMutation.mutateAsync({
        formulaireGouvernanceId,
      })
      router.refresh()
      router.push(nextEtapePath)
    } catch (mutationError) {
      console.error(mutationError)
    }
  }
  const isEtapeLoading = etapeMutation.isPending || etapeMutation.isSuccess

  return (
    <>
      {showEtapeErrors && !!etapeError && (
        <p id="etape-error" className="fr-error-text">
          {etapeError}
        </p>
      )}
      <form onSubmit={onPageSubmit}>
        <ActionBar
          loading={isEtapeLoading}
          autoSaving={isAutoSaving}
          formulaireGouvernanceId={formulaireGouvernanceId}
        >
          <span className="fr-text--bold fr-mr-1v">{totalSelectedEpcis}</span>
          EPCI{sPluriel(totalSelectedEpcis)} -
          <span className="fr-text--bold fr-mx-1v">
            {totalSelectedCommunes}
          </span>
          commune{sPluriel(totalSelectedCommunes)} sélectionnés
        </ActionBar>
      </form>
    </>
  )
}

export default PerimetreFeuilleDeRouteEtapeActionBar
