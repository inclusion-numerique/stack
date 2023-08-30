import { useCallback, useState } from 'react'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
import { communeNameWithCodePostaux } from '@app/web/data/communeNameWithCodePostaux'
import { filterHorsTerritoire } from '@app/web/gouvernance/perimetreFeuilleDeRouteHelpers'
import { UsePerimetreMutation } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/usePerimetreMutation'

export type UseAddCollectivityInput = {
  formulaireGouvernanceId: string
  initiallyAddedEpcis: Array<{ nom: string; code: string }>
  initiallyAddedCommunes: Array<{ nom: string; code: string }>
  initiallyAddedDepartements: Array<{ nom: string; code: string }>
}

export const createAddCollectivityInputFromData = (
  data: Pick<
    GouvernanceFormulaireForForm,
    | 'id'
    | 'epcisParticipantes'
    | 'communesParticipantes'
    | 'departementsParticipants'
  >,
) =>
  ({
    formulaireGouvernanceId: data.id,
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

export type CollectiviteHorsTerritoire =
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

export const useCollectivitesHorsTerritoire = (
  {
    formulaireGouvernanceId,
    initiallyAddedDepartements,
    initiallyAddedCommunes,
    initiallyAddedEpcis,
  }: UseAddCollectivityInput,
  perimetreMutation: UsePerimetreMutation,
) => {
  const [collectivitesHorsTerritoire, setCollectivitesHorsTerritoire] =
    useState<CollectiviteHorsTerritoire[]>([
      ...initiallyAddedDepartements.map(
        ({ code, nom }): CollectiviteHorsTerritoire => ({
          type: 'departement',
          state: 'added',
          nom,
          code,
        }),
      ),
      ...initiallyAddedEpcis.map(
        ({ code, nom }): CollectiviteHorsTerritoire => ({
          type: 'epci',
          state: 'added',
          nom,
          code,
        }),
      ),
      ...initiallyAddedCommunes.map(
        ({ code, nom }): CollectiviteHorsTerritoire => ({
          type: 'commune',
          state: 'added',
          nom,
          code,
        }),
      ),
    ])

  const ajouterCollectiviteHorsTerritoire = useCallback(() => {
    setCollectivitesHorsTerritoire((current) => [
      ...current,
      { state: 'pending' },
    ])
  }, [setCollectivitesHorsTerritoire])

  const supprimerCollectiviteHorsTerritoire = useCallback(
    (
      index: number,
      persisted?: {
        type: 'commune' | 'epci' | 'departement'
        code: string
      },
    ) => {
      setCollectivitesHorsTerritoire((current) => {
        const newCollectivities = [...current]
        newCollectivities.splice(index, 1)
        return [...newCollectivities]
      })
      if (persisted) {
        perimetreMutation.mutate({
          formulaireGouvernanceId,
          add: [],
          remove: [{ ...persisted, horsTerritoire: true }],
        })
      }
    },

    [setCollectivitesHorsTerritoire],
  )

  const validerCollectiviteHorsTerritoire = useCallback(
    (
      index: number,
      collectivity: Omit<
        CollectiviteHorsTerritoire & { state: 'added' },
        'state'
      >,
    ) => {
      setCollectivitesHorsTerritoire((current) => {
        const newCollectivities = [...current]
        newCollectivities.splice(index, 1, { state: 'added', ...collectivity })
        return [...newCollectivities]
      })
      perimetreMutation.mutate({
        formulaireGouvernanceId,
        add: [
          {
            type: collectivity.type,
            code: collectivity.code,
            horsTerritoire: true,
          },
        ],
        remove: [],
      })
    },
    [setCollectivitesHorsTerritoire],
  )

  const modifierCollectiviteHorsTerritoire = useCallback(
    (index: number) => {
      setCollectivitesHorsTerritoire((current) => {
        const previous = current[index]
        const newCollectivities = [...current]
        newCollectivities.splice(index, 1, { ...previous, state: 'pending' })
        return [...newCollectivities]
      })
    },
    [setCollectivitesHorsTerritoire],
  )

  const collectivitesHorsTerritoireEnCoursDeModification =
    collectivitesHorsTerritoire.some(({ state }) => state !== 'added')

  return {
    collectivitesHorsTerritoire,
    ajouterCollectiviteHorsTerritoire,
    supprimerCollectiviteHorsTerritoire,
    validerCollectiviteHorsTerritoire,
    modifierCollectiviteHorsTerritoire,
    collectivitesHorsTerritoireEnCoursDeModification,
  }
}

export type UseCollectivitesHorsTerritoireReturn = ReturnType<
  typeof useCollectivitesHorsTerritoire
>
