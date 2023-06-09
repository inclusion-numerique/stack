'use client'

import React, { useEffect, useRef, useState } from 'react'
import maplibregl, { GeoJSONFeature, Map as MapType } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import ardennes from '../departements/ardennes.json'
import styles from './Map.module.css'
import IndiceNumerique from './IndiceNumerique'
import { addHoverState, communesLayer } from './MapUtils'
import MapPopup from './MapPopup'

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<MapType>()
  const [viewIndiceFN, setViewIndiceFN] = useState(true)
  const [clicked, setClicked] = useState<GeoJSONFeature['properties'] | null>()

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json',
      center: [5.4101, 50.0289],
      zoom: 6,
    })

    map.current.on('load', () => {
      if (!map.current) {
        return
      }

      map.current.addSource('decoupage', {
        type: 'vector',
        tiles: [
          'https://openmaptiles.geo.data.gouv.fr/data/decoupage-administratif/{z}/{x}/{y}.pbf',
        ],
      })
      map.current.addLayer(communesLayer)
      map.current.addLayer({
        id: 'epcis',
        type: 'line',
        source: 'decoupage',
        'source-layer': 'epcis',
        paint: {
          'line-color': 'blue',
        },
      })

      map.current.on('click', 'communes', (event) => {
        if (event.features && event.features.length > 0) {
          setClicked(event.features[0].properties)
        }
      })

      addHoverState(map.current, 'communes')

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
        animate: false,
        zoom: 8,
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

  useEffect(() => {
    if (map.current && map.current.getLayer('communes')) {
      map.current.setLayoutProperty(
        'communes',
        'visibility',
        viewIndiceFN ? 'visible' : 'none',
      )
    }
  }, [viewIndiceFN])

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainer} className={styles.map} />
      {clicked && (
        <MapPopup properties={clicked} close={() => setClicked(null)} />
      )}
      <IndiceNumerique
        setViewIndiceFN={setViewIndiceFN}
        viewIndiceFN={viewIndiceFN}
      />
    </div>
  )
}

export default Map
