'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import ActionBar from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ActionBar'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { sPluriel } from '@app/web/utils/sPluriel'
import { useAutresStructures } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/autres-structures/useAutresStructures'
import { useAutreStructureMutation } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/autres-structures/useAutreStructureMutation'
import AutreStructureCard from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/autres-structures/AutreStructureCard'
import styles from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/CollectivitesHorsTerritoire.module.css'

const AutresStructures = ({
  formulaireGouvernance,
  nextEtapePath,
}: {
  formulaireGouvernance: GouvernanceFormulaireForForm
  nextEtapePath: string
}) => {
  const autreStructureMutation = useAutreStructureMutation()

  const etapeMutation =
    trpc.formulaireGouvernance.etapeAutresStructures.useMutation()

  const {
    autresStructures,
    modifierAutreStructure,
    supprimerAutreStructure,
    validerAutreStructure,
    ajouterAutreStructure,
    autresStructuresEnCoursDeModification,
  } = useAutresStructures(
    {
      formulaireGouvernanceId: formulaireGouvernance.id,
      formulaireGouvernance,
    },
    autreStructureMutation,
  )

  const router = useRouter()

  const etapeError = autresStructuresEnCoursDeModification
    ? "Vous devez valider ou supprimer les structures en cours de modification avant de passer à l'étape suivante"
    : null

  const [showEtapeErrors, setShowEtapeErrors] = useState(false)

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
        formulaireGouvernanceId: formulaireGouvernance.id,
      })
      router.refresh()
      router.push(nextEtapePath)
    } catch (mutationError) {
      console.error(mutationError)
    }
  }
  const isEtapeLoading = etapeMutation.isPending || etapeMutation.isSuccess
  const disabled = isEtapeLoading
  const isAutoSaving = autreStructureMutation.isPending

  return (
    <>
      {[...autresStructures.entries()].map(([structureKey, autreStructure]) => (
        <AutreStructureCard
          key={structureKey}
          structureKey={structureKey}
          autreStructure={autreStructure}
          modifierAutreStructure={modifierAutreStructure}
          supprimerAutreStructure={supprimerAutreStructure}
          validerAutreStructure={validerAutreStructure}
          disabled={disabled}
          formulaireGouvernanceId={formulaireGouvernance.id}
        />
      ))}
      <Button
        priority="tertiary"
        iconId="fr-icon-add-line"
        className={styles.addButton}
        size="large"
        type="button"
        onClick={ajouterAutreStructure}
      >
        Ajouter une structure partenaire
      </Button>

      <form onSubmit={onPageSubmit}>
        {showEtapeErrors && !!etapeError && (
          <p id="etape-error" className="fr-error-text fr-my-6v">
            {etapeError}
          </p>
        )}
        <ActionBar
          loading={isEtapeLoading}
          autoSaving={isAutoSaving}
          formulaireGouvernanceId={formulaireGouvernance.id}
          skip={autresStructures.size > 0 ? undefined : 'Passer cette étape'}
        >
          <span className="fr-text--bold fr-mr-1v">
            {autresStructures.size}
          </span>
          structure{sPluriel(autresStructures.size)} partenaire
          {sPluriel(autresStructures.size)} ajoutée
          {sPluriel(autresStructures.size)}
        </ActionBar>
      </form>
    </>
  )
}

export default withTrpc(AutresStructures)
