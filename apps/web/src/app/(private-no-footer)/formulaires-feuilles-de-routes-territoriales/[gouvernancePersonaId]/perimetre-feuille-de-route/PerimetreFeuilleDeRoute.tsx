'use client'

import React, { FormEvent, useMemo } from 'react'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import { useRouter } from 'next/navigation'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
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
import {
  createAddCollectivityInputFromData,
  useCollectivitesHorsTerritoire,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/useCollectivitesHorsTerritoire'
import PerimetreFeuilleDeRouteEtapeActionBar from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/PerimetreFeuilleDeRouteEtapeActionBar'
import SelectedCollectivitiesCountBadge from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/SelectedCollectivitiesCountBadge'
import styles from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/PerimetreFeuilleDeRoute.module.css'

const onCheckboxesSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}

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
  const router = useRouter()

  const perimetreMutation =
    trpc.formulaireGouvernance.perimetreFeuilleDeRoute.useMutation({
      onSuccess: () => {
        // Refresh router on success to update the page in client cache
        router.refresh()
      },
    })

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
        : // Same pb for smaller scopes

          perimetreOptions.epcis.map(({ codeEpci }) => codeEpci),
    // ...perimetreOptions.epcis.flatMap(({ communes }) =>
    //   communes.map(([code]) => code),
    // ),
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

  const disabled = false
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
            {perimetreOptions.map((departementOptions) => {
              const selectedEpcisForDepartement = new Set(
                departementOptions.epcis
                  .filter(({ codeEpci }) => selectedEpci.has(codeEpci))
                  .map(({ codeEpci }) => codeEpci),
              )
              const selectedCommunesCount = departementOptions.epcis.flatMap(
                ({ communes }) =>
                  communes.filter(([code]) => selectedCommunes.has(code)),
              ).length

              return (
                <Accordion
                  label={
                    <div className={styles.accordionTitleContainer}>
                      <span>
                        {departementOptions.nom} (
                        {departementOptions.codeDepartement})
                      </span>
                      <SelectedCollectivitiesCountBadge
                        selectedEpcisCount={selectedEpcisForDepartement.size}
                        selectedCommunesCount={selectedCommunesCount}
                      />
                    </div>
                  }
                  key={departementOptions.codeDepartement}
                  data-testid={`accordion-departement-${departementOptions.codeDepartement}`}
                >
                  <PerimetreEpciCheckboxes
                    perimetreOptions={departementOptions}
                    selectedCommunes={selectedCommunes}
                    selectedEpcis={selectedEpcisForDepartement}
                    initiallySelectedEpcis={
                      selectionInput.initiallySelectedEpcis
                    }
                    initiallySelectedCommunes={
                      selectionInput.initiallySelectedCommunes
                    }
                    onEpciCheckboxChange={onEpciCheckboxChange}
                    onCommuneCheckboxChange={onCommuneCheckboxChange}
                    onSelectAllChange={onSelectAllChange}
                    disabled={disabled}
                  />
                </Accordion>
              )
            })}
          </div>
        ) : (
          <PerimetreEpciCheckboxes
            perimetreOptions={perimetreOptions}
            selectedCommunes={selectedCommunes}
            selectedEpcis={selectedEpci}
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
      <PerimetreFeuilleDeRouteEtapeActionBar
        nextEtapePath={nextEtapePath}
        isAutoSaving={isAutoSaving}
        etapeError={etapeError}
        totalSelectedEpcis={totalSelectedEpcis}
        totalSelectedCommunes={totalSelectedCommunes}
        formulaireGouvernanceId={formulaireGouvernance.id}
      />
    </>
  )
}

export default withTrpc(PerimetreFeuilleDeRoute)
