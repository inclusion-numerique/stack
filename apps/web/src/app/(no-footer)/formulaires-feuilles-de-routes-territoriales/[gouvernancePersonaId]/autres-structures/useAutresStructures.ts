import { useCallback, useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { GouvernanceFormulaireForForm } from '@app/web/app/(public)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
import { UseAutreStructureMutation } from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/autres-structures/useAutreStructureMutation'
import { ContactFormulaireGouvernanceData } from '@app/web/gouvernance/Contact'

export type UseAddCollectivityInput = {
  formulaireGouvernanceId: string
  formulaireGouvernance: Pick<
    GouvernanceFormulaireForForm,
    'id' | 'structuresParticipantes'
  >
}

export type AutreStructure =
  | {
      state: 'saved'
      participantId: string
      nomStructure: string
      contact: ContactFormulaireGouvernanceData
    }
  | {
      state: 'pending'
      participantId?: string
      nomStructure?: string | null
      contact?: ContactFormulaireGouvernanceData | null
    }

export const useAutresStructures = (
  { formulaireGouvernanceId, formulaireGouvernance }: UseAddCollectivityInput,
  autreStructureMutation: UseAutreStructureMutation,
) => {
  const [autresStructures, setAutresStructures] = useState(
    new Map<string, AutreStructure>(
      formulaireGouvernance.structuresParticipantes.map(
        (participant): [string, AutreStructure] => [
          participant.id,
          participant.contact
            ? {
                state: 'saved',
                participantId: participant.id,
                nomStructure: participant.nomStructure,
                contact: participant.contact,
              }
            : {
                state: 'pending',
                participantId: participant.id,
                nomStructure: participant.nomStructure,
                contact: null,
              },
        ],
      ),
    ),
  )

  const ajouterAutreStructure = useCallback(() => {
    setAutresStructures((current) => {
      const newCollectivities = new Map(current)
      newCollectivities.set(`new.${current.size}`, { state: 'pending' })
      return newCollectivities
    })
  }, [setAutresStructures])

  const supprimerAutreStructure = useCallback(
    (
      key: string,
      persisted?: {
        participantId: string
      },
    ) => {
      setAutresStructures((current) => {
        const newCollectivities = new Map(current)
        newCollectivities.delete(key)
        return newCollectivities
      })
      if (persisted) {
        autreStructureMutation.mutate({
          action: 'supprimer',
          participantId: persisted.participantId,
          formulaireGouvernanceId,
        })
      }
    },

    [setAutresStructures],
  )

  const validerAutreStructure = useCallback(
    (
      key: string,
      structure: Omit<
        AutreStructure & { state: 'saved' },
        'state' | 'participantId'
      > & { participantId?: string | null },
    ) => {
      autreStructureMutation
        .mutateAsync({
          formulaireGouvernanceId,
          action: 'enregistrer',
          participantId: structure.participantId,
          nomStructure: structure.nomStructure,
          contact: structure.contact,
        })
        .then((result) => {
          if (!result?.id) {
            // Edge case, no-op
            return
          }
          setAutresStructures((current) => {
            const newStructures = new Map(current)
            newStructures.set(key, {
              state: 'saved',
              ...structure,
              participantId: result.id,
            })
            return newStructures
          })
          return null
        })
        .catch((error) => {
          Sentry.captureException(error)
        })
    },
    [setAutresStructures],
  )

  const modifierAutreStructure = useCallback(
    (key: string) => {
      setAutresStructures((current) => {
        const newStructures = new Map(current)
        const existing = current.get(key)
        if (!existing) {
          return current
        }

        newStructures.set(key, { ...existing, state: 'pending' })
        return newStructures
      })
    },
    [setAutresStructures],
  )

  const autresStructuresEnCoursDeModification = [
    ...autresStructures.values(),
  ].some(({ state }) => state !== 'saved')

  return {
    autresStructures,
    ajouterAutreStructure,
    supprimerAutreStructure,
    validerAutreStructure,
    modifierAutreStructure,
    autresStructuresEnCoursDeModification,
  }
}

export type UseAutresStructuresReturn = ReturnType<typeof useAutresStructures>
