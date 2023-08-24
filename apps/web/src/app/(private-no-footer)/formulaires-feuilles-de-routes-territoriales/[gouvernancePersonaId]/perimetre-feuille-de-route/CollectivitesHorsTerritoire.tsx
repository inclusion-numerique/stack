'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useMemo } from 'react'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import {
  createAddCollectivityInputFromData,
  useAddCollectivity,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/useAddCollectivity'
import CollectiviteHorsTerritoire from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/CollectiviteHorsTerritoire'
import { filterDansTerritoire } from '@app/web/gouvernance/perimetreFeuilleDeRouteHelpers'
import styles from './CollectivitesHorsTerritoire.module.css'

const CollectivitesHorsTerritoire = ({
  formulaireGouvernance,
  disabled,
  excludedCodes,
}: {
  formulaireGouvernance: GouvernanceFormulaireForForm
  disabled: boolean
  excludedCodes: string[]
}) => {
  // TODO Add a prop for exception to send to the backend
  // TODO Lift that up
  // TODO Put backend stuff in the hook

  const useAddCollectivityInput = useMemo(
    () => createAddCollectivityInputFromData(formulaireGouvernance),
    [],
  )
  const {
    addedCollectivities,
    removeCollectivity,
    saveCollectivity,
    addCollectivity,
    editCollectivity,
    isPending,
  } = useAddCollectivity(useAddCollectivityInput)

  return (
    <>
      <h5 className="fr-mt-12v fr-mb-1v">
        Ajoutez des collectivités en dehors votre territoire
      </h5>
      <p className="fr-text--sm fr-mb-6v">
        Vous pouvez venir renseigner manuellement des collectivités
        (EPCI/CD/Commune) en dehors de votre département que vous souhaitez
        intégrer à votre feuille de route territoriale.
      </p>

      {addedCollectivities.map((addedCollectivity, index) => (
        <CollectiviteHorsTerritoire
          key={addedCollectivity.code ?? index.toString(10)}
          index={index}
          addedCollectivity={addedCollectivity}
          saveCollectivity={saveCollectivity}
          removeCollectivity={removeCollectivity}
          editCollectivity={editCollectivity}
          disabled={disabled}
          excludedCodes={excludedCodes}
        />
      ))}

      <Button
        priority="tertiary"
        iconId="fr-icon-add-line"
        className={styles.addButton}
        size="large"
        type="button"
        onClick={addCollectivity}
      >
        Ajouter une collectivité
      </Button>
    </>
  )
}

export default withTrpc(CollectivitesHorsTerritoire)
