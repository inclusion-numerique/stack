'use client'

import React, { useEffect, useRef, useState } from 'react'
import maplibregl, { Map as MapType } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import ardennes from '../departements/ardennes.json'
import styles from './Map.module.css'
import IndiceNumerique from './IndiceNumerique'

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<MapType>()
  const [viewIndiceFN, setViewIndiceFN] = useState(true)

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json',
      center: [5.4101, 50.0289],
      zoom: 5,
    })

    map.current.on('load', () => {
      if (!map.current) {
        return
      }

      /* map.current.addSource('communes', {
        type: 'vector',
        tiles: [`/api/communes/{z}/{x}/{y}`],
      })
      map.current.addLayer({
        id: 'communes-fill',
        type: 'fill',
        source: 'communes',
        'source-layer': 'test',
        paint: {
          'fill-color': '#b1b6e6',
        },
      })*/

      // TO CACHE ?
      const bounds = ardennes.features[0].geometry.coordinates[0].reduce(
        function (bounds, coord) {
          return bounds.extend(coord)
        },
        new maplibregl.LngLatBounds(
          ardennes.features[0].geometry.coordinates[0][0],
          ardennes.features[0].geometry.coordinates[0][1],
        ),
      )

      map.current.fitBounds(bounds, {
        padding: { top: 50, right: 50, left: 50, bottom: 250 },
        animate: false,
      })

      const navControl = new maplibregl.NavigationControl({
        showZoom: true,
        showCompass: false,
      })
      map.current.addControl(navControl, 'top-right')

      const scaleControl = new maplibregl.ScaleControl({
        maxWidth: 100,
        unit: 'metric',
      })
      map.current.addControl(scaleControl, 'bottom-left')
    })
  }, [])
  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainer} className={styles.map} />
      <IndiceNumerique
        setViewIndiceFN={setViewIndiceFN}
        viewIndiceFN={viewIndiceFN}
      />
    </div>
  )
}

export default Map
