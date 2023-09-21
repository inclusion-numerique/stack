// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */

// From https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json

import { LayerSpecification } from 'maplibre-gl'

export const placesLayer: LayerSpecification[] = [
  {
    id: 'place-village',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    filter: ['==', 'class', 'village'],
    layout: {
      'text-field': '{name:latin}\n{name:nonlatin}',
      'text-font': ['Noto Sans Regular'],
      'text-max-width': 8,
      'text-size': {
        // @ts-ignore: from base json
        base: 1.2,
        stops: [
          [10, 12],
          [15, 22],
        ],
      },
      visibility: 'visible',
    },
    paint: {
      'text-color': '#333',
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 1.2,
    },
  },
  {
    id: 'place-town',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    filter: ['==', 'class', 'town'],
    layout: {
      'text-field': '{name:latin}\n{name:nonlatin}',
      'text-font': ['Noto Sans Regular'],
      'text-max-width': 8,
      'text-size': {
        // @ts-ignore: from base json
        base: 1.2,
        stops: [
          [10, 14],
          [15, 24],
        ],
      },
      visibility: 'visible',
    },
    paint: {
      'text-color': '#333',
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 1.2,
    },
  },
  {
    id: 'place-city',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city']],
    layout: {
      'text-field': '{name:latin}\n{name:nonlatin}',
      'text-font': ['Noto Sans Regular'],
      'text-max-width': 8,
      'text-size': {
        // @ts-ignore: from base json
        base: 1.2,
        stops: [
          [7, 14],
          [11, 24],
        ],
      },
      visibility: 'visible',
    },
    paint: {
      'text-color': '#333',
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 1.2,
    },
  },
  {
    id: 'place-city-capital',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city']],
    layout: {
      'icon-image': 'star_11',
      'icon-size': 0.8,
      'text-anchor': 'left',
      'text-field': '{name:latin}\n{name:nonlatin}',
      'text-font': ['Noto Sans Regular'],
      'text-max-width': 8,
      'text-offset': [0.4, 0],
      'text-size': {
        // @ts-ignore: from base json

        base: 1.2,
        stops: [
          [7, 14],
          [11, 24],
        ],
      },
      visibility: 'visible',
    },
    paint: {
      'text-color': '#333',
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 1.2,
    },
  },
  {
    id: 'place-state',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    filter: ['in', 'class', 'state'],
    layout: {
      'text-field': '{name:latin}',
      'text-font': ['Noto Sans Bold'],
      'text-letter-spacing': 0.1,
      'text-max-width': 9,
      'text-size': {
        // @ts-ignore: from base json

        base: 1.2,
        stops: [
          [12, 10],
          [15, 14],
        ],
      },
      'text-transform': 'uppercase',
      visibility: 'visible',
    },
    paint: {
      'text-color': '#633',
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 1.2,
    },
  },
  {
    id: 'place-country-other',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    filter: [
      'all',
      ['==', 'class', 'country'],
      ['>=', 'rank', 3],
      ['!has', 'iso_a2'],
    ],
    layout: {
      'text-field': '{name:latin}',
      'text-font': ['Noto Sans Italic'],
      'text-max-width': 6.25,
      // @ts-ignore: from base json
      'text-size': {
        stops: [
          [3, 11],
          [7, 17],
        ],
      },
      'text-transform': 'uppercase',
      visibility: 'visible',
    },
    paint: {
      'text-color': '#334',
      'text-halo-blur': 1,
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 2,
    },
  },
  {
    id: 'place-country-3',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    filter: [
      'all',
      ['==', 'class', 'country'],
      ['>=', 'rank', 3],
      ['has', 'iso_a2'],
    ],
    layout: {
      'text-field': '{name:latin}',
      'text-font': ['Noto Sans Bold'],
      'text-max-width': 6.25,
      // @ts-ignore: from base json
      'text-size': {
        stops: [
          [3, 11],
          [7, 17],
        ],
      },
      'text-transform': 'uppercase',
      visibility: 'visible',
    },
    paint: {
      'text-color': '#334',
      'text-halo-blur': 1,
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 2,
    },
  },
  {
    id: 'place-country-2',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    filter: [
      'all',
      ['==', 'class', 'country'],
      ['==', 'rank', 2],
      ['has', 'iso_a2'],
    ],
    layout: {
      'text-field': '{name:latin}',
      'text-font': ['Noto Sans Bold'],
      'text-max-width': 6.25,
      // @ts-ignore: from base json
      'text-size': {
        stops: [
          [2, 11],
          [5, 17],
        ],
      },
      'text-transform': 'uppercase',
      visibility: 'visible',
    },
    paint: {
      'text-color': '#334',
      'text-halo-blur': 1,
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 2,
    },
  },
  {
    id: 'place-country-1',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    filter: [
      'all',
      ['==', 'class', 'country'],
      ['==', 'rank', 1],
      ['has', 'iso_a2'],
    ],
    layout: {
      'text-field': '{name:latin}',
      'text-font': ['Noto Sans Bold'],
      'text-max-width': 6.25,
      // @ts-ignore: from base json
      'text-size': {
        stops: [
          [1, 11],
          [4, 17],
        ],
      },
      'text-transform': 'uppercase',
      visibility: 'visible',
    },
    paint: {
      'text-color': '#334',
      'text-halo-blur': 1,
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 2,
    },
  },
  {
    id: 'place-continent',
    type: 'symbol',
    metadata: {
      'mapbox:group': '1444849242106.713',
    },
    source: 'openmaptiles',
    'source-layer': 'place',
    maxzoom: 1,
    filter: ['==', 'class', 'continent'],
    layout: {
      'text-field': '{name:latin}',
      'text-font': ['Noto Sans Bold'],
      'text-max-width': 6.25,
      'text-size': 14,
      'text-transform': 'uppercase',
      visibility: 'visible',
    },
    paint: {
      'text-color': '#334',
      'text-halo-blur': 1,
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 2,
    },
  },
]
