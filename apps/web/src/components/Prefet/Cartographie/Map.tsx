'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import maplibregl, {
  LngLatLike,
  Map as MapType,
  MapGeoJSONFeature,
  MapMouseEvent,
  StyleSpecification,
} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { City } from '@app/web/types/City'
import {
  StructuresData,
  structureTypes,
} from '@app/web/components/Prefet/structuresData'
import { DepartementData } from '@app/web/utils/map/departement'
import IndiceNumerique from './IndiceNumerique'
import { addHoverState, addSelectedState } from './MapUtils'
import MapPopup from './MapPopup'
import styles from './Map.module.css'
import { mapStyle } from './mapStyle'
import {
  communesIFNFilledLayer,
  communesIFNLayer,
  epcisIFNFilledLayer,
  epcisIFNLayer,
  ifnColors,
  selectedCommunesIFNLayer,
} from './Layers/ifn'
import {
  communesFilledLayer,
  communesLayer,
  departementLayer,
  epcisFilledLayer,
  epcisLayer,
  selectedCommunesFilledLayer,
  selectedCommunesLayer,
} from './Layers/sections'
import {
  structuresCircleLayer,
  structuresClusterCircleLayer,
  structuresClusterSymbolLayer,
} from './Layers/structures'
import { epciMaxZoom } from './Layers/common'
import { placesLayer } from './Layers/places'

const getColorIndexFromIfn = (ifn: number) =>
  Math.floor(((ifn - 1) * ifnColors.length) / 10)

const Map = ({
  departement,
  selectedCity,
  onCitySelected,
  structuresData,
}: {
  departement: DepartementData
  structuresData: StructuresData
  selectedCity?: City | null
  onCitySelected: (city: string | null | undefined) => void
}) => {
  const { cities, epcis, bounds, code: departementCode } = departement
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<MapType>()
  const [viewIndiceFN, setViewIndiceFN] = useState(true)
  const [division, setDivision] = useState('EPCI')
  const clickedPoint = useRef<string>()
  const [selectedStructure, setSelectedStructure] = useState<{
    lngLat: LngLatLike
    name: string
  }>()

  const citiesByIndex: string[][] = useMemo(() => {
    const result: string[][] = ifnColors.map(() => [])
    for (const city of cities) {
      if (city.ifn === null || city.ifn === undefined) {
        continue
      }
      result[getColorIndexFromIfn(city.ifn)].push(city.code)
    }

    return result
  }, [cities])

  const epcisByIndex: string[][] = useMemo(() => {
    const result: string[][] = ifnColors.map(() => [])
    for (const epci of epcis) {
      if (epci.ifn === null || epci.ifn === undefined) {
        continue
      }
      result[getColorIndexFromIfn(epci.ifn)].push(epci.code)
    }
    return result
  }, [epcis])

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return
    }

    // Initialize map with min and max zoom
    map.current = new maplibregl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: mapStyle as StyleSpecification,
      minZoom: 8,
      maxZoom: 12.9,
    })

    map.current.on('load', () => {
      if (!map.current) {
        return
      }

      // Zoom to departement bounds
      map.current.fitBounds(bounds, { padding: 20, animate: false })

      // Add source for cities and epcis
      map.current.addSource('decoupage', {
        type: 'vector',
        tiles: [
          'https://openmaptiles.geo.data.gouv.fr/data/decoupage-administratif/{z}/{x}/{y}.pbf',
        ],
      })

      const epciCodes = epcis.map((epci) => epci.code)
      map.current.addLayer(
        communesIFNFilledLayer({ departementCode, citiesByIndex }),
      )
      map.current.addLayer(communesIFNLayer({ departementCode, citiesByIndex }))
      map.current.addLayer(
        selectedCommunesIFNLayer({ departementCode, citiesByIndex }),
      )
      map.current.addLayer(epcisIFNFilledLayer(epcisByIndex, epciCodes))
      map.current.addLayer(epcisIFNLayer(epcisByIndex, epciCodes))

      map.current.addLayer(departementLayer(departementCode))
      map.current.addLayer(communesFilledLayer(departementCode))
      map.current.addLayer(communesLayer(departementCode))
      map.current.addLayer(selectedCommunesFilledLayer(departementCode))
      map.current.addLayer(selectedCommunesLayer(departementCode))

      map.current.addLayer(epcisFilledLayer(epciCodes))
      map.current.addLayer(epcisLayer(epciCodes))

      placesLayer.map((placeLayer) => map.current?.addLayer(placeLayer))

      map.current.addSource('structures', {
        type: 'geojson',
        generateId: true,
        data: {
          type: 'FeatureCollection',
          features: structuresData.structures,
        },
        cluster: true,
        clusterRadius: 25,
        clusterProperties: { count: ['+', 1] },
      })
      map.current.addLayer(structuresCircleLayer)
      map.current.addLayer(structuresClusterCircleLayer)
      map.current.addLayer(structuresClusterSymbolLayer)
      for (const structureImageName of structureTypes) {
        map.current.loadImage(
          `/images/structure/${structureImageName}.png`,
          (error, image) => {
            if (map.current && image) {
              map.current.addImage(structureImageName, image)
              map.current.addLayer({
                id: `structuresSymbol${structureImageName}`,
                source: 'structures',
                type: 'symbol',
                layout: {
                  'icon-allow-overlap': true,
                  'icon-image': structureImageName,
                },
                filter: ['==', ['get', 'type'], structureImageName],
              })
            }
          },
        )
      }

      addHoverState(map.current, 'decoupage', 'communesIFNFilled', 'communes')
      addHoverState(map.current, 'decoupage', 'communesFilled', 'communes')
      addHoverState(map.current, 'decoupage', 'epcisFilled', 'epcis')
      addHoverState(map.current, 'decoupage', 'epcisIFNFilled', 'epcis')
      addHoverState(map.current, 'structures', 'structuresCircle')

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

      map.current.on('zoom', () => {
        if (!map.current) {
          return
        }

        setDivision(map.current.getZoom() < epciMaxZoom ? 'EPCI' : 'Commune')
      })
    })
  }, [])

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      if (selectedCity) {
        map.current.flyTo({ center: selectedCity.centre.coordinates, zoom: 11 })
        map.current.setFilter('selectedCommunesFilled', [
          '==',
          ['get', 'nom'],
          selectedCity.nom,
        ])
        map.current.setFilter('selectedCommunes', [
          '==',
          ['get', 'nom'],
          selectedCity.nom,
        ])
        map.current.setFilter('selectedCommunesIFN', [
          '==',
          ['get', 'nom'],
          selectedCity.nom,
        ])
      } else {
        map.current.setFilter('selectedCommunesFilled', ['boolean', false])
        map.current.setFilter('selectedCommunes', ['boolean', false])
        map.current.setFilter('selectedCommunesIFN', ['boolean', false])
      }
    }
  }, [map, selectedCity])

  // Add structure popup on hover
  useEffect(() => {
    if (map.current && selectedStructure) {
      const popup = new maplibregl.Popup({
        closeButton: false,
        className: styles.popup,
      })
        .setLngLat(selectedStructure.lngLat)
        .setHTML(`<b>${selectedStructure.name}</b>`)
        .addTo(map.current)
      return () => {
        popup.remove()
      }
    }
  }, [map, selectedStructure])

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      if (viewIndiceFN) {
        map.current.setLayoutProperty(
          'communesIFNFilled',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty('communesIFN', 'visibility', 'visible')
        map.current.setLayoutProperty(
          'selectedCommunesIFN',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty('epcisIFN', 'visibility', 'visible')
        map.current.setLayoutProperty('epcisIFNFilled', 'visibility', 'visible')

        map.current.setLayoutProperty('communes', 'visibility', 'none')
        map.current.setLayoutProperty('communesFilled', 'visibility', 'none')
        map.current.setLayoutProperty('selectedCommunes', 'visibility', 'none')
        map.current.setLayoutProperty(
          'selectedCommunesFilled',
          'visibility',
          'none',
        )
        map.current.setLayoutProperty('epcis', 'visibility', 'none')
        map.current.setLayoutProperty('epcisFilled', 'visibility', 'none')
      } else {
        map.current.setLayoutProperty('communesIFNFilled', 'visibility', 'none')
        map.current.setLayoutProperty('communesIFN', 'visibility', 'none')
        map.current.setLayoutProperty(
          'selectedCommunesIFN',
          'visibility',
          'none',
        )
        map.current.setLayoutProperty('epcisIFN', 'visibility', 'none')
        map.current.setLayoutProperty('epcisIFNFilled', 'visibility', 'none')

        map.current.setLayoutProperty('communes', 'visibility', 'visible')
        map.current.setLayoutProperty('communesFilled', 'visibility', 'visible')
        map.current.setLayoutProperty(
          'selectedCommunes',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty(
          'selectedCommunesFilled',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty('epcis', 'visibility', 'visible')
        map.current.setLayoutProperty('epcisFilled', 'visibility', 'visible')
      }
    }
  }, [map, viewIndiceFN])

  // Setup event handlers
  useEffect(() => {
    if (map.current) {
      const onCommuneClick = (
        event: MapMouseEvent & {
          features?: MapGeoJSONFeature[] | undefined
        },
      ) => {
        if (
          map.current &&
          event.features &&
          event.features.length > 0 &&
          clickedPoint.current !== event.lngLat.toString()
        ) {
          addSelectedState(map.current, 'communes', event.features[0].id)
          onCitySelected(event.features[0].properties.nom as string)
        }
        clickedPoint.current = event.lngLat.toString()
      }

      const onStructureClick = (
        event: MapMouseEvent & {
          features?: MapGeoJSONFeature[] | undefined
        },
      ) => {
        if (map.current && event.features && event.features.length > 0) {
          setSelectedStructure({
            lngLat: (event.features[0].geometry as GeoJSON.Point)
              .coordinates as LngLatLike,
            name: event.features[0].properties.name as string,
          })
        }
        clickedPoint.current = event.lngLat.toString()
      }
      const onStructureClusterClick = (
        event: MapMouseEvent & {
          features?: MapGeoJSONFeature[] | undefined
        },
      ) => {
        if (map.current) {
          map.current.flyTo({
            zoom: map.current.getZoom() + 1,
            center: event.lngLat,
          })
        }
        clickedPoint.current = event.lngLat.toString()
      }

      const onEPCIClick = (
        event: MapMouseEvent & {
          features?: MapGeoJSONFeature[] | undefined
        },
      ) => {
        if (map.current && clickedPoint.current !== event.lngLat.toString()) {
          map.current.flyTo({ zoom: epciMaxZoom + 1, center: event.lngLat })
        }
        clickedPoint.current = event.lngLat.toString()
      }

      map.current.on('click', 'structuresCircle', onStructureClick)
      map.current.on(
        'click',
        'structuresClusterCircle',
        onStructureClusterClick,
      )
      map.current.on('click', 'epcisFilled', onEPCIClick)
      map.current.on('click', 'epcisIFNFilled', onEPCIClick)
      map.current.on('click', 'communesFilled', onCommuneClick)
      map.current.on('click', 'communesIFNFilled', onCommuneClick)
      return () => {
        map.current?.off('click', 'structuresCircle', onStructureClick)
        map.current?.off(
          'click',
          'structuresClusterCircle',
          onStructureClusterClick,
        )
        map.current?.off('click', 'epcisFilled', onEPCIClick)
        map.current?.off('click', 'epcisIFNFilled', onEPCIClick)
        map.current?.off('click', 'communesFilled', onCommuneClick)
        map.current?.off('click', 'communesIFNFilled', onCommuneClick)
      }
    }
  }, [map, onCitySelected])

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainer} className={styles.map} data-testid="detailed-map">
        <div className="maplibregl-ctrl-bottom-right maplibregl-ctrl">
          <div
            className={classNames(
              styles.division,
              'maplibregl-ctrl',
              'maplibregl-ctrl-scale',
            )}
          >
            Découpage : {division}
          </div>
        </div>
      </div>
      {selectedCity && (
        <MapPopup
          city={selectedCity}
          close={() => {
            if (map.current) {
              addSelectedState(map.current, 'communes')
            }
            onCitySelected(null)
          }}
        />
      )}
      <IndiceNumerique
        setViewIndiceFN={setViewIndiceFN}
        viewIndiceFN={viewIndiceFN}
      />
    </div>
  )
}

export default Map
