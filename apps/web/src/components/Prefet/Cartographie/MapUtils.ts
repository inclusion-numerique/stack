import { LayerSpecification, Map } from 'maplibre-gl'

export const communesLayer: LayerSpecification = {
  id: 'communes',
  type: 'fill',
  source: 'decoupage',
  'source-layer': 'communes',
  paint: {
    'fill-outline-color': 'white',
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      1,
      0.7,
    ],
    'fill-color': [
      'case',
      ['<', ['length', ['get', 'nom']], 3],
      'red',
      ['<', ['length', ['get', 'nom']], 5],
      'yellow',
      ['<', ['length', ['get', 'nom']], 7],
      'blue',
      ['<', ['length', ['get', 'nom']], 9],
      'orange',
      'green',
    ],
  },
}

let hoveredStateId: string | number | undefined
const setHoveringState = (map: Map, layer: string, hover: boolean) => {
  if (hoveredStateId) {
    map.setFeatureState(
      {
        source: 'decoupage',
        id: hoveredStateId,
        sourceLayer: layer,
      },
      { hover },
    )
    if (!hover) {
      hoveredStateId = undefined
    }
  }
}

export const addHoverState = (map: Map, layer: string) => {
  map.on('mousemove', layer, (event) => {
    if (map && event.features && event.features.length > 0) {
      setHoveringState(map, layer, false)
      hoveredStateId = event.features[0].id
      setHoveringState(map, layer, true)
    }
  })

  map.on('mouseleave', layer, (event) => {
    if (map && event.features && event.features.length > 0) {
      setHoveringState(map, layer, false)
    }
  })
}
