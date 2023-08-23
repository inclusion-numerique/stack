import React, { useCallback, useState } from 'react'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'

export type UseCollectivitySelectionInput = {
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
    'epcisParticipantes' | 'communesParticipantes' | 'departementsParticipants'
  >,
) =>
  ({
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

export const useCollectivitySelection = ({
  initiallySelectedEpcis,
  initiallySelectedDepartements,
  initiallySelectedCommunes,
}: UseCollectivitySelectionInput) => {
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
    },
    [setSelectedEpci],
  )
  const unselectEpci = useCallback(
    (epciCode: string | string[]) => {
      setSelectedEpci((current) => removeFromSet(current, epciCode))
    },
    [setSelectedEpci],
  )

  const selectCommune = useCallback(
    (communeCode: string | string[]) => {
      setSelectedCommunes((current) => addToSet(current, communeCode))
    },
    [setSelectedCommunes],
  )
  const unselectCommune = useCallback(
    (communeCode: string | string[]) => {
      setSelectedCommunes((current) => removeFromSet(current, communeCode))
    },
    [setSelectedCommunes],
  )

  const selectDepartement = useCallback(
    (departementCode: string | string[]) => {
      setSelectedDepartements((current) => addToSet(current, departementCode))
    },
    [setSelectedDepartements],
  )
  const unselectDepartement = useCallback(
    (departementCode: string | string[]) => {
      setSelectedDepartements((current) =>
        removeFromSet(current, departementCode),
      )
    },
    [setSelectedDepartements],
  )

  const onSelectAllChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, epciId: string) => {
      const checkboxes: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(`[data-epci="${epciId}"][data-commune]`)
      console.log('Communes checkbox', checkboxes)
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
      console.log('Deselect all', epciId)
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
      console.log(
        'CHECKBOX COMMUNE CHANGE',
        event.currentTarget.checked,
        codeCommune,
      )
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
      console.log('CHECKBOX EPCI CHANGE', event.currentTarget.checked, codeEpci)
    },
    [selectEpci, unselectEpci],
  )

  return {
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
