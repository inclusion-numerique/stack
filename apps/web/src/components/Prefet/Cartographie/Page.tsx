'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  applyStructureFilter,
  StructureFilters,
} from '@app/web/components/Prefet/Cartographie/structureFilters'
import {
  DepartementCartographieData,
  DepartementCartographieDataCommune,
  DepartementCartographieDataStructure,
} from '@app/web/app/(cartographie)/prefet/[codeDepartement]/cartographie/getDepartementCartographieData'
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
      structures.filter((structure) =>
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
    router.prefetch(`/prefet/${departement.code}`)
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
        onFilter={onFilter}
      />
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
    </div>
  )
}

export default CartographiePage
