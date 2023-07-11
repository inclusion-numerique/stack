'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { City } from '@app/web/types/City'
import {
  Structure,
  StructuresData,
} from '@app/web/components/Prefet/structuresData'
import { DepartementData } from '@app/web/utils/map/departement'
import {
  applyStructureFilter,
  StructureFilters,
} from '@app/web/components/Prefet/Cartographie/structureFilters'
import styles from './Page.module.css'
import Legend from './Legend'
import Map from './Map'

const Cartographie = ({
  departement,
  structuresData,
}: {
  departement: DepartementData
  structuresData: StructuresData
}) => {
  const [selectedCity, setSelectedCity] = useState<City | null | undefined>()
  const [selectedStructure, setSelectedStructure] = useState<
    Structure | null | undefined
  >()

  const { cities, code } = departement
  const router = useRouter()

  const onCitySelected = useCallback(
    (city: string | undefined | null) => {
      if (city) {
        setSelectedStructure(null)
        setSelectedCity(cities.find((c) => c.nom === city))
      } else {
        setSelectedCity(null)
      }
    },
    [cities],
  )

  const onStructureSelected = useCallback(
    (structure: string | undefined | null) => {
      if (structure) {
        setSelectedCity(null)
        setSelectedStructure(
          structuresData.structures.find(
            (item) => item.properties.id === structure,
          ),
        )
      } else {
        setSelectedStructure(null)
      }
    },
    [cities],
  )

  useEffect(() => {
    router.prefetch(`/prefet/${code}`)
  }, [router, code])

  const [filteredStructures, setFilteredStructures] = useState(
    structuresData.structures,
  )
  const onFilter = (filters: StructureFilters) => {
    setFilteredStructures(
      structuresData.structures.filter((structure) =>
        applyStructureFilter(structure, filters),
      ),
    )
  }

  return (
    <div className={styles.container}>
      <Legend
        cities={cities}
        departement={departement}
        structuresData={structuresData}
        selectedCity={selectedCity}
        onCitySelected={onCitySelected}
        selectedStructure={selectedStructure}
        onStructureSelected={onStructureSelected}
        onFilter={onFilter}
      />
      <Map
        departement={departement}
        structuresData={structuresData}
        selectedCity={selectedCity}
        onCitySelected={onCitySelected}
        selectedStructure={selectedStructure}
        onStructureSelected={onStructureSelected}
        filteredStructures={filteredStructures}
      />
    </div>
  )
}

export default Cartographie
