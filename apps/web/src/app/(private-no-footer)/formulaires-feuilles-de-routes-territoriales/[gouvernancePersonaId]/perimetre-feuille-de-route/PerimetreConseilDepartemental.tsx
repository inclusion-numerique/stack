'use client'

import { useRouter } from 'next/navigation'
import React, { FormEvent, useCallback, useMemo } from 'react'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { PerimetreDepartementOptions } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/perimetreData'
import CollectivitesHorsTerritoire from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/CollectivitesHorsTerritoire'
import { trpc } from '@app/web/trpc'
import ActionBar from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ActionBar'
import {
  createCollectivitySelectionInputFromData,
  useCollectivitySelection,
  UseCollectivitySelectionInput,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/useCollectivitySelection'
import PerimetreEpciCheckboxes from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/PerimetreEpciCheckboxes'

/**
 * This form is a bit special because it is not a form but a list of checkboxes
 * For performance issues, we dont use react-hook-form for this form
 * We use minimal html elements and we use trpc to submit the form
 */
const PerimetreConseilDepartemental = ({
  formulaireGouvernance,
  perimetreOptions,
  nextEtapePath,
}: {
  formulaireGouvernance: GouvernanceFormulaireForForm
  perimetreOptions: PerimetreDepartementOptions
  nextEtapePath: string
}) => {
  const selectionInput = useMemo(
    () => createCollectivitySelectionInputFromData(formulaireGouvernance),
    [],
  )

  const {
    selectedEpci,
    selectedCommunes,
    onCommuneCheckboxChange,
    onSelectAllChange,
    onEpciCheckboxChange,
  } = useCollectivitySelection(selectionInput)

  const mutation =
    trpc.formulaireGouvernance.informationsParticipant.useMutation()
  const router = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const isLoading = mutation.isLoading || mutation.isSuccess
  const disabled = isLoading

  return (
    <>
      <h5>Liste des communes de votre territoire</h5>

      <p className="fr-text--sm">
        Vous pouvez sélectionner l’ensemble des communes d’une EPCI ou
        sélectionner par communes.
      </p>
      <form onSubmit={onSubmit}>
        <PerimetreEpciCheckboxes
          perimetreOptions={perimetreOptions}
          initiallySelectedEpcis={selectionInput.initiallySelectedEpcis}
          initiallySelectedCommunes={selectionInput.initiallySelectedCommunes}
          onEpciCheckboxChange={onEpciCheckboxChange}
          onCommuneCheckboxChange={onCommuneCheckboxChange}
          onSelectAllChange={onSelectAllChange}
          disabled={disabled}
        />
        <CollectivitesHorsTerritoire />
        <ActionBar
          loading={isLoading}
          autoSaving={isLoading}
          formulaireGouvernanceId={formulaireGouvernance.id}
        >
          <span className="fr-text--bold fr-mr-1v">{selectedEpci.size}</span>
          EPCI{selectedEpci.size === 1 ? '' : 's'} -
          <span className="fr-text--bold fr-mx-1v">
            {selectedCommunes.size}
          </span>
          commune{selectedCommunes.size === 1 ? '' : 's'} sélectionés
        </ActionBar>
      </form>
    </>
  )
}

export default withTrpc(PerimetreConseilDepartemental)
