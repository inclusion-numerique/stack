'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import maplibregl, { Map, StyleSpecification } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { ardennesBounds } from '@app/web/utils/map/geom'
import ardennes from '@app/web/utils/map/departements/ardennes.json'
import empty from '@app/web/utils/map/departements/empty.json'
import styles from './DepartmentMap.module.css'

const DepartmentMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<Map>()

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: empty as StyleSpecification,
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
      map.current.fitBounds(ardennesBounds, {
        padding: { top: 50, right: 50, left: 50, bottom: 250 },
        animate: false,
      })

      map.current.addSource('departement', { type: 'geojson', data: ardennes })
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
        <div ref={mapContainer} className={styles.map} />
      </div>
      <h4 className={styles.departement}>Ardennes</h4>
      <div className={styles.actionBox}>
        <span className={classNames(styles.blueIcon, 'fr-icon-info-fill')} />
        <div>
          <div className="fr-text--sm fr-mb-2w">
            Découvrez le déploiement à l’échelle communale des acteurs de
            l’Inclusion Numérique sur votre territoire à l’aide de cette
            cartographie.
          </div>
          <Link href="/prefet/cartographie" className="fr-btn">
            <span className="fr-icon-road-map-line fr-mr-1w" />
            Visualiser la cartographie
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DepartmentMap
