import React, { useCallback, useState } from 'react'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { UsePerimetreMutation } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/usePerimetreMutation'

export type UseCollectivitySelectionInput = {
  formulaireGouvernanceId: string
  initiallySelectedEpcis: Iterable<string>
  initiallySelectedCommunes: Iterable<string>
  initiallySelectedDepartements: Iterable<string>
}

const addToSet = (set: Set<string>, values: string | string[]) => {
  const newSet = new Set(set)

  if (Array.isArray(values)) {
    for (const value of values) {
      newSet.add(value)
    }
  } else {
    newSet.add(values)
  }
  return newSet
}
const removeFromSet = (set: Set<string>, values: string | string[]) => {
  const newSet = new Set(set)

  if (Array.isArray(values)) {
    for (const value of values) {
      newSet.delete(value)
    }
  } else {
    newSet.delete(values)
  }
  return newSet
}

export const createCollectivitySelectionInputFromData = (
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
    initiallySelectedEpcis: new Set(
      data.epcisParticipantes.map(({ epciCode }) => epciCode),
    ),
    initiallySelectedCommunes: new Set(
      data.communesParticipantes.map(({ communeCode }) => communeCode),
    ),
    initiallySelectedDepartements: new Set(
      data.departementsParticipants.map(
        ({ departementCode }) => departementCode,
      ),
    ),
  } satisfies UseCollectivitySelectionInput)

const codeToCollectivitePerimetre = (
  code: string | string[],
  type: 'commune' | 'epci' | 'departement',
  horsTerritoire = false,
) =>
  Array.isArray(code)
    ? code.map((codeItem) => ({
        type,
        code: codeItem,
        horsTerritoire,
      }))
    : [
        {
          type,
          code,
          horsTerritoire,
        },
      ]

export const useCollectivitySelection = (
  {
    formulaireGouvernanceId,
    initiallySelectedEpcis,
    initiallySelectedDepartements,
    initiallySelectedCommunes,
  }: UseCollectivitySelectionInput,
  perimetreMutation: UsePerimetreMutation,
) => {
  const [selectedEpci, setSelectedEpci] = useState(
    new Set<string>(initiallySelectedEpcis),
  )
  const [selectedCommunes, setSelectedCommunes] = useState(
    new Set<string>(initiallySelectedCommunes),
  )
  const [selectedDepartements, setSelectedDepartements] = useState(
    new Set<string>(initiallySelectedDepartements),
  )

  const selectEpci = useCallback(
    (epciCode: string | string[]) => {
      setSelectedEpci((current) => addToSet(current, epciCode))
      perimetreMutation.mutate({
        formulaireGouvernanceId,
        add: codeToCollectivitePerimetre(epciCode, 'epci'),
        remove: [],
      })
    },
    [setSelectedEpci],
  )
  const unselectEpci = useCallback(
    (epciCode: string | string[]) => {
      setSelectedEpci((current) => removeFromSet(current, epciCode))
      perimetreMutation.mutate({
        formulaireGouvernanceId,
        add: [],
        remove: codeToCollectivitePerimetre(epciCode, 'epci'),
      })
    },
    [setSelectedEpci],
  )

  const selectCommune = useCallback(
    (communeCode: string | string[]) => {
      setSelectedCommunes((current) => addToSet(current, communeCode))
      perimetreMutation.mutate({
        formulaireGouvernanceId,
        add: codeToCollectivitePerimetre(communeCode, 'commune'),
        remove: [],
      })
    },
    [setSelectedCommunes],
  )
  const unselectCommune = useCallback(
    (communeCode: string | string[]) => {
      setSelectedCommunes((current) => removeFromSet(current, communeCode))
      perimetreMutation.mutate({
        formulaireGouvernanceId,
        add: [],
        remove: codeToCollectivitePerimetre(communeCode, 'commune'),
      })
    },
    [setSelectedCommunes],
  )

  const selectDepartement = useCallback(
    (departementCode: string | string[]) => {
      setSelectedDepartements((current) => addToSet(current, departementCode))
      perimetreMutation.mutate({
        formulaireGouvernanceId,
        add: codeToCollectivitePerimetre(departementCode, 'departement'),
        remove: [],
      })
    },
    [setSelectedDepartements],
  )
  const unselectDepartement = useCallback(
    (departementCode: string | string[]) => {
      setSelectedDepartements((current) =>
        removeFromSet(current, departementCode),
      )
      perimetreMutation.mutate({
        formulaireGouvernanceId,
        add: [],
        remove: codeToCollectivitePerimetre(departementCode, 'departement'),
      })
    },
    [setSelectedDepartements],
  )

  const onSelectAllChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, epciId: string) => {
      const checkboxes: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(`[data-epci="${epciId}"][data-commune]`)
      const codes: string[] = []
      if (event.currentTarget.checked) {
        // Iterate over checkboxes and check them
        for (const checkbox of checkboxes) {
          checkbox.checked = true
          codes.push(checkbox.dataset.commune as string)
        }
        selectCommune(codes)

        return
      }
      // Iterate over checkboxes and check them
      for (const checkbox of checkboxes) {
        checkbox.checked = false
        codes.push(checkbox.dataset.commune as string)
      }
      unselectCommune(codes)
    },
    [selectCommune, unselectCommune],
  )

  const onCommuneCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, codeCommune: string) => {
      if (event.currentTarget.checked) {
        selectCommune(codeCommune)
        return
      }
      unselectCommune(codeCommune)
    },
    [selectCommune, unselectCommune],
  )

  const onEpciCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, codeEpci: string) => {
      if (event.currentTarget.checked) {
        selectEpci(codeEpci)
        return
      }
      unselectEpci(codeEpci)
    },
    [selectEpci, unselectEpci],
  )

  return {
    perimetreMutation,
    selectedEpci,
    selectedCommunes,
    selectedDepartements,
    selectEpci,
    unselectEpci,
    selectCommune,
    unselectCommune,
    selectDepartement,
    unselectDepartement,
    onCommuneCheckboxChange,
    onEpciCheckboxChange,
    onSelectAllChange,
  }
}
