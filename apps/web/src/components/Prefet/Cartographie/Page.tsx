'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { City } from '@app/web/types/City'
import { StructuresData } from '@app/web/components/Prefet/structuresData'
import { DepartementData } from '@app/web/utils/map/departement'
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

  const { cities, code } = departement
  const router = useRouter()

  const onCitySelected = useCallback(
    (city: string | undefined | null) => {
      if (city) {
        setSelectedCity(cities.find((c) => c.nom === city))
      } else {
        setSelectedCity(null)
      }
    },
    [cities],
  )

  useEffect(() => {
    router.prefetch(`/prefet/${code}`)
  }, [router, code])

  return (
    <div className={styles.container}>
      <Legend
        cities={cities}
        departement={departement}
        setSelectedCity={setSelectedCity}
      />
      <Map
        departement={departement}
        structuresData={structuresData}
        selectedCity={selectedCity}
        onCitySelected={onCitySelected}
      />
    </div>
  )
}

export default Cartographie
