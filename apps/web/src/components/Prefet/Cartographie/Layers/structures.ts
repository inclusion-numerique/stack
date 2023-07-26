import { LayerSpecification } from 'maplibre-gl'
import {
  isHoveredCondition,
  isSelectedCondition,
} from '@app/web/components/Prefet/Cartographie/Layers/layersUtils'

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

export const structuresIconHoverLayer: LayerSpecification = {
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
    'icon-halo-color': 'red',
    'icon-halo-width': 10,
    'icon-opacity': [
      'case',
      ['any', isHoveredCondition, isSelectedCondition],
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
    'text-size': 16,
    'text-allow-overlap': true,
    'text-font': ['Noto Sans Bold'],
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
