'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import maplibregl, {
  Map as MapType,
  MapGeoJSONFeature,
  MapMouseEvent,
  StyleSpecification,
  Popup,
} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import {
  FilterSpecification,
  GeoJSONSourceSpecification,
} from '@maplibre/maplibre-gl-style-spec'
import { City } from '@app/web/types/City'
import type {
  Structure,
  StructuresData,
} from '@app/web/components/Prefet/structuresData'
import { DepartementData } from '@app/web/utils/map/departement'
import {
  structureTypeImage,
  structureTypes,
  structureTypeSelectedImage,
} from '@app/web/components/Prefet/structuresTypes'
import { Spinner } from '@app/web/ui/Spinner'
import IndiceNumerique from './IndiceNumerique'
import {
  addHoverState,
  setSelectedDecoupageState,
  setSelectedStructureState,
} from './MapUtils'
import MapPopup from './MapPopup'
import styles from './Map.module.css'
import { mapStyle } from './mapStyle'
import {
  ifnCommunesFillLayer,
  ifnCommunesBorderLayer,
  ifnEpcisFillLayer,
  ifnEpcisBorderLayer,
  ifnSelectedCommunesBorderLayer,
  ifnFillColors,
  ifnHoverCommunesBorderLayer,
  ifnHoverEpcisBorderLayer,
} from './Layers/ifn'
import {
  baseCommunesFillLayer,
  baseCommunesBorderLayer,
  departementLayer,
  baseEpcisFillLayer,
  baseEpcisBorderLayer,
  baseSelectedCommunesFillLayer,
  baseSelectedCommunesBorderLayer,
} from './Layers/sections'
import {
  structuresIconHoverLayer,
  structuresClusterCircleLayer,
  structuresClusterSymbolLayer,
  structuresIconLayer,
} from './Layers/structures'
import { epciMaxZoom } from './Layers/common'
import { placesLayer } from './Layers/places'

const getColorIndexFromIfn = (ifn: number) =>
  Math.floor(((ifn - 1) * ifnFillColors.length) / 10)

const mapPopupWidthWithMargin = 448 + 16

const Map = ({
  departement,
  selectedCity,
  onCitySelected,
  structuresData,
  selectedStructure,
  filteredStructures,
  onStructureSelected,
}: {
  departement: DepartementData
  structuresData: StructuresData
  selectedCity?: City | null
  onCitySelected: (city: string | null | undefined) => void
  selectedStructure?: Structure | null
  filteredStructures: Structure[]
  onStructureSelected: (structure: string | null | undefined) => void
}) => {
  const { cities, epcis, bounds, code: departementCode } = departement
  const structurePopup = useRef<Popup | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<MapType>()
  const [viewIndiceFN, setViewIndiceFN] = useState(true)
  const [division, setDivision] = useState('EPCI')
  const clickedPoint = useRef<string>()
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [isMapStyleLoaded, setIsMapStyleLoaded] = useState(false)

  const citiesByIndex: string[][] = useMemo(() => {
    const result: string[][] = ifnFillColors.map(() => [])
    for (const city of cities) {
      if (!city.ifnTotal) {
        continue
      }
      result[getColorIndexFromIfn(city.ifnTotal)].push(city.code)
    }

    return result
  }, [cities])

  const epcisByIndex: string[][] = useMemo(() => {
    const result: string[][] = ifnFillColors.map(() => [])
    for (const epci of epcis) {
      if (epci.ifn === null || epci.ifn === undefined) {
        continue
      }
      result[getColorIndexFromIfn(epci.ifn)].push(epci.code)
    }
    return result
  }, [epcis])

  const onMapPopupClose = () => {
    if (map.current) {
      setSelectedDecoupageState(map.current, 'baseCommunesBorder')
      setSelectedStructureState(map.current, 'structureIconHover')
    }
    onCitySelected(null)
    onStructureSelected(null)
  }

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

    map.current.on('style.load', () => {
      setIsMapStyleLoaded(true)
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
        ifnCommunesFillLayer({ departementCode, citiesByIndex }),
      )
      map.current.addLayer(ifnCommunesBorderLayer({ departementCode }))
      map.current.addLayer(
        ifnSelectedCommunesBorderLayer({ departementCode, citiesByIndex }),
      )
      map.current.addLayer(
        ifnHoverCommunesBorderLayer({ departementCode, citiesByIndex }),
      )
      map.current.addLayer(ifnEpcisFillLayer(epcisByIndex, epciCodes))
      map.current.addLayer(ifnEpcisBorderLayer(epcisByIndex, epciCodes))
      map.current.addLayer(ifnHoverEpcisBorderLayer(epcisByIndex, epciCodes))

      map.current.addLayer(departementLayer(departementCode))
      map.current.addLayer(baseCommunesFillLayer(departementCode))
      map.current.addLayer(baseCommunesBorderLayer(departementCode))
      map.current.addLayer(baseSelectedCommunesFillLayer(departementCode))
      map.current.addLayer(baseSelectedCommunesBorderLayer(departementCode))

      map.current.addLayer(baseEpcisFillLayer(epciCodes))
      map.current.addLayer(baseEpcisBorderLayer(epciCodes))

      placesLayer.map((placeLayer) => map.current?.addLayer(placeLayer))
      map.current.addSource('structures', {
        type: 'geojson',
        generateId: true,
        data: {
          type: 'FeatureCollection',
          features: structuresData.structures,
        },
        clusterMaxZoom: 11,
        cluster: true,
        clusterRadius: 25,
        clusterProperties: { count: ['+', 1] },
      })

      for (const type of structureTypes) {
        const structureImageFile = structureTypeImage[type]
        const structureHoverImageFile = structureTypeSelectedImage[type]
        map.current?.loadImage(structureImageFile, (error, image) => {
          if (error) {
            console.error('Could not load structure image', error)
            return
          }
          if (map.current && image) {
            map.current.addImage(`structure-${type}`, image)
          }
        })
        map.current?.loadImage(structureHoverImageFile, (error, image) => {
          if (error) {
            console.error('Could not load structure hover image', error)
            return
          }
          if (map.current && image) {
            map.current.addImage(`structure-${type}-hover`, image)
          }
        })
      }
      map.current?.addLayer(structuresIconLayer)

      map.current.addLayer(structuresIconHoverLayer)

      map.current.addLayer(structuresClusterCircleLayer)
      map.current.addLayer(structuresClusterSymbolLayer)

      addHoverState(map.current, 'decoupage', 'ifnCommunesFill', 'communes')
      addHoverState(map.current, 'decoupage', 'baseCommunesFill', 'communes')
      addHoverState(map.current, 'decoupage', 'baseEpcisFill', 'epcis')
      addHoverState(map.current, 'decoupage', 'ifnEpcisFill', 'epcis')
      addHoverState(map.current, 'structures', 'structureIconHover')

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

      setIsMapLoaded(true)
    })
  }, [])

  // Fly to selected city
  useEffect(() => {
    if (selectedStructure) {
      return
    }
    if (map.current && map.current.isStyleLoaded()) {
      if (selectedCity) {
        map.current.flyTo({
          center: selectedCity.centre.coordinates,
          zoom: 11,
          padding: { left: mapPopupWidthWithMargin },
        })
        map.current.setFilter('baseSelectedCommunesFill', [
          '==',
          ['get', 'nom'],
          selectedCity.nom,
        ])
        map.current.setFilter('baseSelectedCommunesBorder', [
          '==',
          ['get', 'nom'],
          selectedCity.nom,
        ])
        map.current.setFilter('ifnSelectedCommunesBorder', [
          '==',
          ['get', 'nom'],
          selectedCity.nom,
        ])
      } else {
        map.current.setFilter('baseSelectedCommunesFill', ['boolean', false])
        map.current.setFilter('baseSelectedCommunesBorder', ['boolean', false])
        map.current.setFilter('ifnSelectedCommunesBorder', ['boolean', false])
      }
    }
  }, [map, selectedCity, selectedStructure])

  // Fly to selected structure
  useEffect(() => {
    if (selectedCity) {
      return
    }
    if (map.current && map.current.isStyleLoaded() && selectedStructure) {
      map.current.flyTo({
        center: selectedStructure.geometry.coordinates,
        zoom: 12.9,
        padding: { left: mapPopupWidthWithMargin },
      })
    }
  }, [map, selectedCity, selectedStructure])

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      if (viewIndiceFN) {
        map.current.setLayoutProperty(
          'ifnCommunesFill',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty(
          'ifnCommunesBorder',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty(
          'ifnHoverCommunesBorder',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty(
          'ifnSelectedCommunesBorder',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty('ifnEpcisBorder', 'visibility', 'visible')
        map.current.setLayoutProperty(
          'ifnHoverEpcisBorder',
          'visibility',
          'visible',
        )

        map.current.setLayoutProperty('ifnEpcisFill', 'visibility', 'visible')

        map.current.setLayoutProperty(
          'baseCommunesBorder',
          'visibility',
          'none',
        )
        map.current.setLayoutProperty('baseCommunesFill', 'visibility', 'none')
        map.current.setLayoutProperty(
          'baseSelectedCommunesBorder',
          'visibility',
          'none',
        )
        map.current.setLayoutProperty(
          'baseSelectedCommunesFill',
          'visibility',
          'none',
        )
        map.current.setLayoutProperty('baseEpcis', 'visibility', 'none')
        map.current.setLayoutProperty('baseEpcisFill', 'visibility', 'none')
      } else {
        map.current.setLayoutProperty('ifnCommunesFill', 'visibility', 'none')
        map.current.setLayoutProperty('ifnCommunesBorder', 'visibility', 'none')
        map.current.setLayoutProperty(
          'ifnSelectedCommunesBorder',
          'visibility',
          'none',
        )
        map.current.setLayoutProperty(
          'ifnHoverCommunesBorder',
          'visibility',
          'none',
        )
        map.current.setLayoutProperty('ifnEpcisBorder', 'visibility', 'none')
        map.current.setLayoutProperty(
          'ifnHoverEpcisBorder',
          'visibility',
          'none',
        )

        map.current.setLayoutProperty('ifnEpcisFill', 'visibility', 'none')

        map.current.setLayoutProperty(
          'baseCommunesBorder',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty(
          'baseCommunesFill',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty(
          'ifnHoverCommunesBorderLayer',
          'visibility',
          'none',
        )
        map.current.setLayoutProperty(
          'baseSelectedCommunesBorder',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty(
          'baseSelectedCommunesFill',
          'visibility',
          'visible',
        )
        map.current.setLayoutProperty('baseEpcis', 'visibility', 'visible')
        map.current.setLayoutProperty('baseEpcisFill', 'visibility', 'visible')
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
          setSelectedDecoupageState(
            map.current,
            'baseCommunesBorder',
            event.features[0].id,
          )
          onCitySelected(event.features[0].properties.nom as string)
        }
        clickedPoint.current = event.lngLat.toString()
      }

      const onStructureHover = (
        event: MapMouseEvent & {
          features?: MapGeoJSONFeature[] | undefined
        },
      ) => {
        if (map.current && event.features && event.features.length > 0) {
          if (structurePopup.current) {
            structurePopup.current.remove()
            structurePopup.current = null
          }
          structurePopup.current = new maplibregl.Popup({
            closeButton: false,
            className: styles.popup,
          })
            .setLngLat([
              event.features[0].properties.lng as number,
              event.features[0].properties.lat as number,
            ])
            .setHTML(`<b>${event.features[0].properties.name as string}</b>`)
            .addTo(map.current)
        }
      }

      const onStructureUnhover = () => {
        if (structurePopup.current) {
          structurePopup.current.remove()
          structurePopup.current = null
        }
      }

      const onStructureClick = (
        event: MapMouseEvent & {
          features?: MapGeoJSONFeature[] | undefined
        },
      ) => {
        const structureFeature = event.features && event.features[0]
        if (!structureFeature) {
          return
        }
        if (map.current && event.features && event.features.length > 0) {
          onStructureSelected(event.features[0].properties.id as string)
        }
        clickedPoint.current = event.lngLat.toString()
        if (map.current) {
          setSelectedStructureState(
            map.current,
            'structureIconHover',
            structureFeature.id,
          )
        }
      }
      const onStructureClusterClick = (
        event: MapMouseEvent & {
          features?: MapGeoJSONFeature[] | undefined
        },
      ) => {
        if (map.current) {
          map.current.flyTo({
            zoom: 12.9,
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

      map.current.on('mousemove', 'structureIcon', onStructureHover)
      map.current.on('mouseleave', 'structureIcon', onStructureUnhover)

      map.current.on('click', 'structuresCircle', onStructureClick)
      map.current.on('click', 'structureIcon', onStructureClick)

      map.current.on(
        'click',
        'structuresClusterCircle',
        onStructureClusterClick,
      )
      map.current.on('click', 'baseEpcisFill', onEPCIClick)
      map.current.on('click', 'ifnEpcisFill', onEPCIClick)
      map.current.on('click', 'baseCommunesFill', onCommuneClick)
      map.current.on('click', 'ifnCommunesFill', onCommuneClick)
      return () => {
        map.current?.off('mousemove', 'structureIcon', onStructureHover)
        map.current?.off('mouseleave', 'structureIcon', onStructureUnhover)

        map.current?.off('click', 'structuresCircle', onStructureClick)
        map.current?.off(
          'click',
          'structuresClusterCircle',
          onStructureClusterClick,
        )
        map.current?.off('click', 'baseEpcisFill', onEPCIClick)
        map.current?.off('click', 'ifnEpcisFill', onEPCIClick)
        map.current?.off('click', 'baseCommunesFill', onCommuneClick)
        map.current?.off('click', 'ifnCommunesFill', onCommuneClick)
      }
    }
  }, [map, onCitySelected, onStructureSelected])

  // Display structures depending on filters
  useEffect(() => {
    if (!isMapLoaded || !isMapStyleLoaded) {
      return
    }

    // We cannot use setFilter() because of clusters
    // See https://github.com/mapbox/mapbox-gl-js/issues/2613

    const mapStyles = map.current?.getStyle()
    if (!mapStyles) {
      return
    }

    const selectedStructureFilter: FilterSpecification = [
      'match',
      ['get', 'id'],
      filteredStructures.map((structure) => structure.properties.id),
      true,
      false,
    ]
    ;(mapStyles.sources.structures as GeoJSONSourceSpecification).filter =
      selectedStructureFilter
    map.current?.setStyle(mapStyles)
  }, [structuresData, filteredStructures, isMapLoaded, isMapStyleLoaded])

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
      <MapPopup
        city={selectedCity}
        structure={selectedStructure}
        close={onMapPopupClose}
      />
      <IndiceNumerique
        setViewIndiceFN={setViewIndiceFN}
        viewIndiceFN={viewIndiceFN}
      />
      <div
        className={classNames(
          styles.mapLoadingOverlay,
          isMapStyleLoaded && isMapLoaded
            ? styles.hiddenMapLoadingOverlay
            : null,
        )}
      >
        <div className={styles.mapLoader}>
          <Spinner size="small" />{' '}
          <p className="fr-mb-0 fr-ml-1w">Chargement</p>
        </div>
      </div>
    </div>
  )
}

export default Map
