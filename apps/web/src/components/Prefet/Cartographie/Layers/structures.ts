import { LayerSpecification } from 'maplibre-gl'

export const structuresCircleLayer: LayerSpecification = {
  id: 'structuresCircle',
  source: 'structures',
  type: 'circle',
  filter: ['!=', 'cluster', true],
  paint: {
    'circle-color': '#000091',
    'circle-stroke-color': 'white',
    'circle-stroke-width': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      3,
      0,
    ],
    'circle-radius': 13,
  },
}

export const structuresClusterSymbolLayer: LayerSpecification = {
  id: 'structuresClusterSymbol',
  source: 'structures',
  type: 'symbol',
  filter: ['==', 'cluster', true],
  layout: {
    'text-field': ['get', 'count'],
    'text-size': 18,
    'text-allow-overlap': true,
  },
  paint: {
    'text-color': 'white',
  },
}

export const structuresClusterCircleLayer: LayerSpecification = {
  id: 'structuresClusterCircle',
  source: 'structures',
  type: 'circle',
  filter: ['==', 'cluster', true],
  paint: {
    'circle-color': '#000091',
    'circle-radius': 20,
  },
}
