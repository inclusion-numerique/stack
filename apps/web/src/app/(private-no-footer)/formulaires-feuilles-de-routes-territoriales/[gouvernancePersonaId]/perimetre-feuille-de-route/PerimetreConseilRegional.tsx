'use client'

import React, { FormEvent, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { OptionTuples } from '@app/web/utils/options'
import { PerimetreDepartementWithInfoOptions } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/perimetreData'
import {
  createCollectivitySelectionInputFromData,
  useCollectivitySelection,
  UseCollectivitySelectionInput,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/useCollectivitySelection'
import { trpc } from '@app/web/trpc'
import PerimetreEpciCheckboxes from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/PerimetreEpciCheckboxes'
import CollectivitesHorsTerritoire from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/CollectivitesHorsTerritoire'
import ActionBar from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ActionBar'

const PerimetreConseilRegional = ({
  perimetreOptions,
  formulaireGouvernance,
  nextEtapePath,
}: {
  formulaireGouvernance: GouvernanceFormulaireForForm
  perimetreOptions: PerimetreDepartementWithInfoOptions[]
  nextEtapePath: string
}) => {
  console.log('PROPS FORM', formulaireGouvernance)
  console.log('OPTIONS', perimetreOptions)

  const selectionInput = useMemo(
    () => createCollectivitySelectionInputFromData(formulaireGouvernance),
    [],
  )

  // There is too much communes so we only exclude epcis and departements for now
  const epciAndCommunesCodesDansTerritoire = useMemo(
    () => [
      ...perimetreOptions.map((options) => options.codeDepartement),
      ...perimetreOptions.flatMap((options) =>
        options.epcis.map(({ codeEpci }) => codeEpci),
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
  } = useCollectivitySelection(selectionInput)

  const mutation =
    trpc.formulaireGouvernance.informationsParticipant.useMutation()
  const router = useRouter()

  const onCheckboxesSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const onPageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log('ON PAGE SUBMIT')
    console.log('SELECTED EPCIS', [...selectedEpci.values()])
    console.log('SELECTED COMMUNES', [...selectedCommunes.values()])

    // try {
    //   // TODO Transform type#code to arrays
    //   await mutation.mutateAsync(data)
    //   router.push(nextEtapePath)
    // } catch (mutationError) {
    //   applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    // }
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
      <form onSubmit={onCheckboxesSubmit}>
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
      </form>
      <CollectivitesHorsTerritoire
        formulaireGouvernance={formulaireGouvernance}
        disabled={disabled}
        excludedCodes={epciAndCommunesCodesDansTerritoire}
      />
      <form>
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

export default withTrpc(PerimetreConseilRegional)
