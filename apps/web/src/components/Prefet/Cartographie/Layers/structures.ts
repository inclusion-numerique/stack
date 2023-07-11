import { LayerSpecification } from 'maplibre-gl'

export const structuresIconLayer: LayerSpecification = {
  id: 'structureIcon',
  source: 'structures',
  type: 'symbol',
  filter: ['!=', 'cluster', true],
  layout: {
    'icon-size': 0.5,
    'icon-allow-overlap': true,
    // https://maplibre.org/maplibre-style-spec/expressions/#case
    'icon-image': [
      'case',
      ['==', ['get', 'type'], 'publique'],
      'structure-publique',

      ['==', ['get', 'type'], 'association'],
      'structure-association',

      ['==', ['get', 'type'], 'privee'],
      'structure-privee',

      'structure-nonDefini',
    ],
  },
}
//
// export const structuresCircleLayer: LayerSpecification = {
//   id: 'structuresCircle',
//   source: 'structures',
//   type: 'circle',
//   filter: ['all', ['!=', 'cluster', true]],
//   paint: {
//     'circle-color': 'transparent',
//     'circle-stroke-color': 'white',
//     'circle-stroke-width': [
//       'case',
//       ['boolean', ['feature-state', 'hover'], false],
//       3,
//       0,
//     ],
//     'circle-radius': 13,
//   },
// }

export const structuresCircleLayer: LayerSpecification = {
  id: 'structureIconHover',
  source: 'structures',
  type: 'symbol',
  filter: ['!=', 'cluster', true],
  layout: {
    'icon-size': 0.5,
    'icon-allow-overlap': true,
    // https://maplibre.org/maplibre-style-spec/expressions/#case
    'icon-image': [
      'case',
      ['==', ['get', 'type'], 'publique'],
      'structure-publique-hover',

      ['==', ['get', 'type'], 'association'],
      'structure-association-hover',

      ['==', ['get', 'type'], 'privee'],
      'structure-privee-hover',

      'structure-nonDefini-hover',
    ],
  },
  paint: {
    'icon-opacity': [
      'case',
      [
        'any',
        ['boolean', ['feature-state', 'hover'], false],
        ['boolean', ['feature-state', 'selected'], false],
      ],
      1,
      0,
    ],
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
