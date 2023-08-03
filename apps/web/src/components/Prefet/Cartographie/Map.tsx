'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import maplibregl, {
  Map as MapType,
  MapGeoJSONFeature,
  MapMouseEvent,
  Popup,
  StyleSpecification,
} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import {
  FilterSpecification,
  GeoJSONSourceSpecification,
} from '@maplibre/maplibre-gl-style-spec'
import {
  DepartementCartographieData,
  DepartementCartographieDataCommune,
  DepartementCartographieDataStructure,
} from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'
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
  setStructureSelectedState,
} from './MapUtils'
import MapPopup from './MapPopup'
import styles from './Map.module.css'
import { mapStyle } from './mapStyle'
import {
  ifnCommunesBorderLayer,
  ifnCommunesFillLayer,
  ifnEpcisBorderLayer,
  ifnEpcisFillLayer,
  ifnFillColors,
  ifnHoverCommunesBorderLayer,
  ifnHoverEpcisBorderLayer,
  ifnSelectedCommunesBorderLayer,
} from './Layers/ifn'
import {
  baseCommunesBorderLayer,
  baseCommunesFillLayer,
  baseEpcisBorderLayer,
  baseEpcisFillLayer,
  baseSelectedCommunesBorderLayer,
  baseSelectedCommunesFillLayer,
  departementLayer,
} from './Layers/sections'
import {
  structuresClusterCircleLayer,
  structuresClusterSymbolLayer,
  structuresIconHoverLayer,
  structuresIconLayer,
} from './Layers/structures'
import { epciMaxZoom } from './Layers/common'
import { placesLayer } from './Layers/places'

const getColorIndexFromIfn = (ifn: number) =>
  Math.floor(((ifn - 1) * ifnFillColors.length) / 10)

const mapPopupWidthWithMargin = 448 + 16

const Map = ({
  departement,
  selectedCommune,
  onCommuneSelected,
  structures,
  communes,
  epcis,
  selectedStructure,
  filteredStructures,
  onStructureSelected,
}: {
  departement: DepartementCartographieData['departement']
  epcis: DepartementCartographieData['epcis']
  structures: DepartementCartographieDataStructure[]
  communes: DepartementCartographieDataCommune[]
  selectedCommune?: DepartementCartographieDataCommune | null
  onCommuneSelected: (commune: string | null | undefined) => void
  selectedStructure?: DepartementCartographieDataStructure | null
  filteredStructures: DepartementCartographieDataStructure[]
  // Argument is the map auto generated id (sequencial) of structure
  onStructureSelected: (structure: string | null | undefined) => void
}) => {
  const { bounds, code: departementCode } = departement
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
    for (const commune of communes) {
      if (!commune.ifn?.total) {
        continue
      }
      result[getColorIndexFromIfn(commune.ifn.total)].push(commune.code)
    }

    return result
  }, [communes])

  const epcisByIndex: string[][] = useMemo(() => {
    const result: string[][] = ifnFillColors.map(() => [])
    for (const epci of epcis) {
      if (!epci.ifn?.total) {
        continue
      }
      result[getColorIndexFromIfn(epci.ifn?.total)].push(epci.code)
    }
    return result
  }, [epcis])

  const onMapPopupClose = () => {
    if (map.current) {
      setSelectedDecoupageState(map.current, 'baseCommunesBorder')
      setStructureSelectedState(map.current, null)
    }
    onCommuneSelected(null)
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
        promoteId: 'id',
        data: {
          type: 'FeatureCollection',
          features: structures,
        },
        clusterMaxZoom: 11,
        cluster: true,
        clusterRadius: 25,
        clusterProperties: { count: ['+', 1] },
      })

      // Load images, THEN add structure layers to avoid missing image error in UI
      new Promise((resolve) => {
        if (!map.current) {
          // Do not hang on edge cases
          resolve(null)
          return
        }
        let imagesToLoad = structureTypes.length * 2
        for (const type of structureTypes) {
          const structureImageFile = structureTypeImage[type]
          const structureHoverImageFile = structureTypeSelectedImage[type]
          if (!map.current) {
            imagesToLoad -= 1
            return
          }
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          map.current.loadImage(structureImageFile, (error, image) => {
            if (error) {
              console.error('Could not load structure image', error)
              return
            }
            if (map.current && image) {
              map.current.addImage(`structure-${type}`, image)
            }
            imagesToLoad -= 1
            if (imagesToLoad === 0) resolve(null)
          })
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          map.current.loadImage(structureHoverImageFile, (error, image) => {
            if (error) {
              console.error('Could not load structure hover image', error)
              return
            }
            if (map.current && image) {
              map.current.addImage(`structure-${type}-hover`, image)
            }
            imagesToLoad -= 1
            if (imagesToLoad === 0) resolve(null)
          })
        }
      })
        .catch((error) => {
          console.error('Could not load structure images', error)
        })
        .then(() => {
          map.current?.addLayer(structuresIconLayer)
          map.current?.addLayer(structuresIconHoverLayer)
          return null
        })
        .catch((error) => {
          console.error('Could not load structure layers', error)
        })

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

  // Fly to selected commune
  useEffect(() => {
    if (selectedStructure) {
      return
    }
    if (map.current && map.current.isStyleLoaded()) {
      if (selectedCommune) {
        const currentZoom = map.current.getZoom()
        map.current.flyTo({
          center: selectedCommune.centre.coordinates as [number, number],
          zoom: Math.max(epciMaxZoom, currentZoom),
          padding: { left: mapPopupWidthWithMargin },
        })
        map.current.setFilter('baseSelectedCommunesFill', [
          '==',
          ['get', 'nom'],
          selectedCommune.nom,
        ])
        map.current.setFilter('baseSelectedCommunesBorder', [
          '==',
          ['get', 'nom'],
          selectedCommune.nom,
        ])
        map.current.setFilter('ifnSelectedCommunesBorder', [
          '==',
          ['get', 'nom'],
          selectedCommune.nom,
        ])
      } else {
        map.current.setFilter('baseSelectedCommunesFill', ['boolean', false])
        map.current.setFilter('baseSelectedCommunesBorder', ['boolean', false])
        map.current.setFilter('ifnSelectedCommunesBorder', ['boolean', false])
      }
    }
  }, [map, selectedCommune, selectedStructure])

  // Fly to and update selected style to selected structure
  useEffect(() => {
    if (map.current && selectedStructure) {
      setStructureSelectedState(map.current, selectedStructure.properties.id)
      setSelectedDecoupageState(map.current, 'baseCommunesBorder')
    }
    if (map.current && map.current.isStyleLoaded() && selectedStructure) {
      map.current.flyTo({
        center: selectedStructure.geometry.coordinates,
        zoom: 12.9,
        padding: { left: mapPopupWidthWithMargin },
      })
    }
  }, [map, selectedStructure])

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
          'ifnHoverCommunesBorder',
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
          onCommuneSelected(
            event.features[0]?.properties.code as string | undefined,
          )
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
            .setLngLat(
              (
                event.features[0].geometry as {
                  type: 'Point'
                  coordinates: [number, number]
                }
              ).coordinates,
            )
            .setHTML(`<b>${event.features[0]?.properties.nom as string}</b>`)
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
          onStructureSelected(event.features[0].id as string)
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
  }, [map, onCommuneSelected, onStructureSelected])

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
  }, [structures, filteredStructures, isMapLoaded, isMapStyleLoaded])

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
        commune={selectedCommune}
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
        <div className={styles.mapLoader} data-testid="map-loader">
          <Spinner size="small" />{' '}
          <p className="fr-mb-0 fr-ml-1w">Chargement</p>
        </div>
      </div>
    </div>
  )
}

export default Map
