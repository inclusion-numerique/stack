'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DepartementCartographieData,
  DepartementCartographieDataCommune,
  DepartementCartographieDataStructure,
} from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'
import {
  applyStructureFilter,
  isFilterEmpty,
  StructureFilters,
} from '@app/web/components/Prefet/Cartographie/structureFilters'
import ErrorBoundary from '@app/web/components/ErrorBoundary'
import Filters from '@app/web/components/Prefet/Cartographie/Filters'
import styles from './Page.module.css'
import Legend from './Legend'
import Map from './Map'

const CartographiePage = ({
  data: { departement, structures, count, communes, epcis },
}: {
  data: DepartementCartographieData
}) => {
  const router = useRouter()

  const [selectedCommune, setSelectedCommune] = useState<
    DepartementCartographieDataCommune | null | undefined
  >()
  const [selectedStructure, setSelectedStructure] = useState<
    DepartementCartographieDataStructure | null | undefined
  >()
  const [filteredStructures, setFilteredStructures] = useState(structures)
  const [filteredOutSelectedStructure, setFilteredOutSelectedStructure] =
    useState<DepartementCartographieDataStructure | null | undefined>()

  const onFilter = (filters: StructureFilters) => {
    setFilteredStructures(
      isFilterEmpty(filters)
        ? structures
        : structures.filter((structure) =>
            applyStructureFilter(structure, filters),
          ),
    )
  }

  const onCommuneSelected = useCallback(
    (codeCommune: string | undefined | null) => {
      if (codeCommune) {
        setSelectedStructure(null)
        setFilteredOutSelectedStructure(null)
        setSelectedCommune(communes.find((c) => c.code === codeCommune))
      } else {
        setSelectedCommune(null)
      }
    },
    [communes],
  )

  const onStructureSelected = useCallback(
    (structure: string | undefined | null) => {
      if (structure) {
        setSelectedCommune(null)
        const found = filteredStructures.find(
          (item) => item.properties.id === structure,
        )
        if (found) {
          setSelectedStructure(found)
          setFilteredOutSelectedStructure(null)
        } else {
          // Selected commune (e.g. from search in Legend.tsx) is not in filtered structures
          // We add it to filtered structure so it is displayed while selected
          const filteredOutStructure = structures.find(
            (item) => item.properties.id === structure,
          )
          setSelectedStructure(filteredOutStructure)
          setFilteredOutSelectedStructure(filteredOutStructure)
        }
      } else {
        setSelectedStructure(null)
        setFilteredOutSelectedStructure(null)
      }
    },
    [filteredStructures, structures],
  )

  // Prefetch dashboard page
  useEffect(() => {
    router.prefetch(`/tableau-de-bord/departement/${departement.code}`)
  }, [router, departement.code])

  return (
    <div className={styles.container}>
      <Legend
        count={count}
        structures={structures}
        communes={communes}
        departement={departement}
        selectedCommune={selectedCommune}
        onCommuneSelected={onCommuneSelected}
        selectedStructure={selectedStructure}
        onStructureSelected={onStructureSelected}
      />
      <ErrorBoundary>
        <Map
          departement={departement}
          communes={communes}
          epcis={epcis}
          structures={structures}
          selectedCommune={selectedCommune}
          onCommuneSelected={onCommuneSelected}
          selectedStructure={selectedStructure}
          onStructureSelected={onStructureSelected}
          filteredStructures={
            filteredOutSelectedStructure
              ? [...filteredStructures, filteredOutSelectedStructure]
              : filteredStructures
          }
        />
      </ErrorBoundary>
      <Filters onFilter={onFilter} />
    </div>
  )
}

export default CartographiePage
