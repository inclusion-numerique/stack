'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import maplibregl, { Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useRouter } from 'next/navigation'
import { DepartementGeoJson } from '@app/web/utils/map/departementGeoJson'
import { emptyStyleSpecification } from '@app/web/utils/map/emptyStyleSpecification'
import styles from './DepartementMap.module.css'

const DepartementMap = ({
  departement,
}: {
  departement: DepartementGeoJson
}) => {
  const { code, source, bounds } = departement
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<Map>()
  const router = useRouter()

  useEffect(() => {
    router.prefetch(`/prefet/${code}/cartographie`)
  }, [router, code])

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: emptyStyleSpecification,
      center: [5.4101, 50.0289],
      zoom: 5,
      scrollZoom: false,
      doubleClickZoom: false,
      dragPan: false,
    })

    map.current.on('load', () => {
      if (!map.current) {
        return
      }
      map.current.fitBounds(bounds, {
        padding: { top: 50, right: 50, left: 50, bottom: 250 },
        animate: false,
      })

      console.log('DEPARTEMENT', departement)

      map.current.addSource('departement', source)
      map.current.addLayer({
        id: 'departement-fill',
        type: 'fill',
        source: 'departement',
        paint: {
          'fill-color': '#b1b6e6',
        },
      })
      map.current.addLayer({
        id: 'departement-outline',
        type: 'line',
        source: 'departement',
        paint: {
          'line-color': '#000086',
          'line-width': 2,
        },
      })
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <div
          ref={mapContainer}
          className={styles.map}
          data-testid="departement-map"
        />
      </div>
      <h4 className={styles.departement}>{departement.name}</h4>
      <div className={styles.actionBox}>
        <span className={classNames(styles.blueIcon, 'fr-icon-info-fill')} />
        <div>
          <div className="fr-text--sm fr-mb-2w">
            Découvrez le déploiement à l’échelle communale des acteurs de
            l’Inclusion Numérique sur votre territoire à l’aide de cette
            cartographie.
          </div>
          <Link
            href={`/prefet/${code}/cartographie`}
            className="fr-btn"
            data-testid="cartographie-button"
          >
            <span className="fr-icon-road-map-line fr-mr-1w" />
            Visualiser la cartographie
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DepartementMap
