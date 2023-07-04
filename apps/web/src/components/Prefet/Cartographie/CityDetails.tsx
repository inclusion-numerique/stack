import React, { useState } from 'react'
import Link from 'next/link'
import { City } from '@app/web/types/City'
import styles from './CityDetails.module.css'

const CityDetails = ({
  city: { nom, population, structures },
}: {
  city: City
}) => {
  // TODO Proper button element for click on title
  const [structuresDetailCollapsed, setStructuresDetailCollapsed] =
    useState(false)
  return (
    <>
      <h6 className="fr-mt-1v">{nom}</h6>
      <p>Commune de {population} hab.</p>
      <p className="fr-hint-text">
        Source :{' '}
        <Link
          href="https://geo.api.gouv.fr/decoupage-administratif/communes"
          target="_blank"
        >
          geo.api.gouv.fr
        </Link>
      </p>
      <hr className="fr-mt-6v" />
      <div className={styles.row}>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <h6
          className="fr-mt-1v"
          onClick={() => {
            setStructuresDetailCollapsed(!structuresDetailCollapsed)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setStructuresDetailCollapsed(!structuresDetailCollapsed)
            }
          }}
        >
          Lieux d&apos;Inclusion Numérique{' '}
          <span
            className={
              structuresDetailCollapsed
                ? 'fr-icon-arrow-down-s-line'
                : 'fr-icon-arrow-up-s-line'
            }
          />
        </h6>
        <h6 className="fr-mt-1v">{structures}</h6>
      </div>
    </>
  )
}

export default CityDetails
