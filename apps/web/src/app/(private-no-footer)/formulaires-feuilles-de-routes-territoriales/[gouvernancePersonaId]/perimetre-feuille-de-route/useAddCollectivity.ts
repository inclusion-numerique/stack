import React, { useCallback, useState } from 'react'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { communeNameWithCodePostaux } from '@app/web/data/communeNameWithCodePostaux'
import { filterHorsTerritoire } from '@app/web/gouvernance/perimetreFeuilleDeRouteHelpers'

export type UseAddCollectivityInput = {
  initiallyAddedEpcis: Array<{ nom: string; code: string }>
  initiallyAddedCommunes: Array<{ nom: string; code: string }>
  initiallyAddedDepartements: Array<{ nom: string; code: string }>
}

export const createAddCollectivityInputFromData = (
  data: Pick<
    GouvernanceFormulaireForForm,
    'epcisParticipantes' | 'communesParticipantes' | 'departementsParticipants'
  >,
) =>
  ({
    initiallyAddedEpcis: data.epcisParticipantes
      .filter(filterHorsTerritoire)
      .map(({ epci: { code, nom } }) => ({ code, nom })),
    initiallyAddedCommunes: data.communesParticipantes
      .filter(filterHorsTerritoire)
      .map(({ commune: { code, nom, codesPostaux } }) => ({
        code,
        nom: communeNameWithCodePostaux({ nom, codesPostaux }),
      })),
    initiallyAddedDepartements: data.departementsParticipants
      .filter(filterHorsTerritoire)
      .map(({ departement: { code, nom } }) => ({
        code,
        nom,
      })),
  } satisfies UseAddCollectivityInput)

export type AddedCollectivity =
  | {
      type: 'commune' | 'epci' | 'departement'
      state: 'added'
      code: string
      nom: string
    }
  | {
      state: 'pending'
      type?: 'commune' | 'epci' | 'departement' | null
      code?: string | null
      nom?: string | null
    }

export const useAddCollectivity = ({
  initiallyAddedDepartements,
  initiallyAddedCommunes,
  initiallyAddedEpcis,
}: UseAddCollectivityInput) => {
  const [addedCollectivities, setAddedCollectivities] = useState<
    AddedCollectivity[]
  >([
    ...initiallyAddedDepartements.map(
      ({ code, nom }): AddedCollectivity => ({
        type: 'departement',
        state: 'added',
        nom,
        code,
      }),
    ),
    ...initiallyAddedEpcis.map(
      ({ code, nom }): AddedCollectivity => ({
        type: 'epci',
        state: 'added',
        nom,
        code,
      }),
    ),
    ...initiallyAddedCommunes.map(
      ({ code, nom }): AddedCollectivity => ({
        type: 'commune',
        state: 'added',
        nom,
        code,
      }),
    ),
  ])

  const addCollectivity = useCallback(() => {
    setAddedCollectivities((current) => [...current, { state: 'pending' }])
  }, [setAddedCollectivities])

  const removeCollectivity = useCallback(
    (index: number) => {
      setAddedCollectivities((current) => {
        const newCollectivities = [...current]
        newCollectivities.splice(index, 1)
        return [...newCollectivities]
      })
    },

    [setAddedCollectivities],
  )

  const saveCollectivity = useCallback(
    (
      index: number,
      collectivity: Omit<AddedCollectivity & { state: 'added' }, 'state'>,
    ) => {
      setAddedCollectivities((current) => {
        const newCollectivities = [...current]
        newCollectivities.splice(index, 1, { state: 'added', ...collectivity })
        return [...newCollectivities]
      })
    },
    [setAddedCollectivities],
  )

  const editCollectivity = useCallback(
    (index: number) => {
      setAddedCollectivities((current) => {
        const previous = current[index]
        const newCollectivities = [...current]
        newCollectivities.splice(index, 1, { ...previous, state: 'pending' })
        return [...newCollectivities]
      })
    },
    [setAddedCollectivities],
  )

  const isPending = addedCollectivities.some(({ state }) => state !== 'added')

  console.log('ADDED', addedCollectivities)

  return {
    addedCollectivities,
    addCollectivity,
    removeCollectivity,
    saveCollectivity,
    editCollectivity,
    isPending,
  }
}

export type UseAddCollectivityReturn = ReturnType<typeof useAddCollectivity>
