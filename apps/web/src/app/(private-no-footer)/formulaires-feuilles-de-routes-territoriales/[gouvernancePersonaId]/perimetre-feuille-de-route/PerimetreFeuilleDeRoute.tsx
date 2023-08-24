'use client'

import React, { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import {
  PerimetreDepartementOptions,
  PerimetreDepartementWithInfoOptions,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/perimetreData'
import {
  createCollectivitySelectionInputFromData,
  useCollectivitySelection,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/useCollectivitySelection'
import { trpc } from '@app/web/trpc'
import PerimetreEpciCheckboxes from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/PerimetreEpciCheckboxes'
import CollectivitesHorsTerritoire from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/CollectivitesHorsTerritoire'
import ActionBar from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ActionBar'
import {
  createAddCollectivityInputFromData,
  useCollectivitesHorsTerritoire,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/useCollectivitesHorsTerritoire'
import { sPluriel } from '@app/web/utils/sPluriel'

const PerimetreFeuilleDeRoute = ({
  perimetreOptions,
  formulaireGouvernance,
  nextEtapePath,
}: {
  formulaireGouvernance: GouvernanceFormulaireForForm
  perimetreOptions:
    | PerimetreDepartementWithInfoOptions[]
    | PerimetreDepartementOptions
  nextEtapePath: string
}) => {
  const perimetreMutation =
    trpc.formulaireGouvernance.perimetreFeuilleDeRoute.useMutation()

  const etapeMutation =
    trpc.formulaireGouvernance.etapePerimetreFeuilleDeRoute.useMutation()

  const selectionInput = useMemo(
    () => createCollectivitySelectionInputFromData(formulaireGouvernance),
    [],
  )

  const epciAndCommunesCodesDansTerritoire = useMemo(
    () =>
      Array.isArray(perimetreOptions)
        ? // There is too much communes so we only exclude epcis and departements for now

          [
            ...perimetreOptions.map((options) => options.codeDepartement),
            ...perimetreOptions.flatMap((options) =>
              options.epcis.map(({ codeEpci }) => codeEpci),
            ),
          ]
        : // For smaller scope we add the communes
          [
            ...perimetreOptions.epcis.map(({ codeEpci }) => codeEpci),
            ...perimetreOptions.epcis.flatMap(({ communes }) =>
              communes.map(([code]) => code),
            ),
          ],
    [],
  )

  const {
    selectedEpci,
    selectedCommunes,
    onCommuneCheckboxChange,
    onSelectAllChange,
    onEpciCheckboxChange,
  } = useCollectivitySelection(selectionInput, perimetreMutation)

  const useAddCollectivityInput = useMemo(
    () => createAddCollectivityInputFromData(formulaireGouvernance),
    [],
  )
  const collectivitesHorsTerritoire = useCollectivitesHorsTerritoire(
    useAddCollectivityInput,
    perimetreMutation,
  )

  const router = useRouter()

  const onCheckboxesSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const etapeError =
    collectivitesHorsTerritoire.collectivitesHorsTerritoireEnCoursDeModification
      ? "Vous devez valider ou supprimer les collectivités hors territoire en cours de modification avant de passer à l'étape suivante"
      : selectedEpci.size === 0 &&
        selectedCommunes.size === 0 &&
        collectivitesHorsTerritoire.collectivitesHorsTerritoire.length === 0
      ? "Vous devez sélectionner au moins une collectivité pour passer à l'étape suivante"
      : null

  const totalSelectedEpcis =
    selectedEpci.size +
    collectivitesHorsTerritoire.collectivitesHorsTerritoire.filter(
      (collectivite) => collectivite.type === 'epci',
    ).length
  const totalSelectedCommunes =
    selectedCommunes.size +
    collectivitesHorsTerritoire.collectivitesHorsTerritoire.filter(
      (collectivite) => collectivite.type === 'commune',
    ).length

  const [showEtapeErrors, setShowEtapeErrors] = useState(false)

  const onPageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowEtapeErrors(true)
    if (etapeError) {
      return
    }

    try {
      await etapeMutation.mutateAsync({
        formulaireGouvernanceId: formulaireGouvernance.id,
      })
      router.push(nextEtapePath)
    } catch (mutationError) {
      console.error(mutationError)
    }
  }
  const isEtapeLoading = etapeMutation.isLoading || etapeMutation.isSuccess
  const disabled = isEtapeLoading
  const isAutoSaving = perimetreMutation.isLoading

  return (
    <>
      <h5>Liste des communes de votre territoire</h5>

      <p className="fr-text--sm">
        Vous pouvez sélectionner l’ensemble des communes d’une EPCI ou
        sélectionner par communes.
      </p>
      <form onSubmit={onCheckboxesSubmit}>
        {Array.isArray(perimetreOptions) ? (
          <div className="fr-accordions-group">
            {perimetreOptions.map((departementOptions) => (
              <Accordion
                label={`${departementOptions.nom} (${departementOptions.codeDepartement})`}
                key={departementOptions.codeDepartement}
              >
                <PerimetreEpciCheckboxes
                  perimetreOptions={departementOptions}
                  initiallySelectedEpcis={selectionInput.initiallySelectedEpcis}
                  initiallySelectedCommunes={
                    selectionInput.initiallySelectedCommunes
                  }
                  onEpciCheckboxChange={onEpciCheckboxChange}
                  onCommuneCheckboxChange={onCommuneCheckboxChange}
                  onSelectAllChange={onSelectAllChange}
                  disabled={disabled}
                />
              </Accordion>
            ))}
          </div>
        ) : (
          <PerimetreEpciCheckboxes
            perimetreOptions={perimetreOptions}
            initiallySelectedEpcis={selectionInput.initiallySelectedEpcis}
            initiallySelectedCommunes={selectionInput.initiallySelectedCommunes}
            onEpciCheckboxChange={onEpciCheckboxChange}
            onCommuneCheckboxChange={onCommuneCheckboxChange}
            onSelectAllChange={onSelectAllChange}
            disabled={disabled}
          />
        )}
      </form>
      <CollectivitesHorsTerritoire
        disabled={disabled}
        excludedCodes={epciAndCommunesCodesDansTerritoire}
        collectivitesHorsTerritoire={collectivitesHorsTerritoire}
        isLoading={perimetreMutation.isLoading}
      />
      {showEtapeErrors && !!etapeError && (
        <p className="fr-error-text">{etapeError}</p>
      )}
      <form onSubmit={onPageSubmit}>
        <ActionBar
          loading={isEtapeLoading}
          autoSaving={isAutoSaving}
          formulaireGouvernanceId={formulaireGouvernance.id}
        >
          <span className="fr-text--bold fr-mr-1v">{totalSelectedEpcis}</span>
          EPCI{sPluriel(totalSelectedEpcis)} -
          <span className="fr-text--bold fr-mx-1v">
            {totalSelectedCommunes}
          </span>
          commune{sPluriel(totalSelectedCommunes)} sélectionés
        </ActionBar>
      </form>
    </>
  )
}

export default withTrpc(PerimetreFeuilleDeRoute)
