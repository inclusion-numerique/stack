// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { LayerSpecification } from 'maplibre-gl'
import { communes, epcis } from './common'

export const ifnColors = [
  'rgb(74, 107, 174)',
  'rgb(95, 142, 199)',
  'rgb(170, 196, 230)',
  'rgb(230, 222, 238)',
  'rgb(235, 181, 189)',
  'rgb(221, 116, 128)',
  'rgb(217, 92, 94)',
]

export const infHoverColors = [
  'rgb(74, 107, 174)',
  'rgb(95, 142, 199)',
  'rgb(170, 196, 230)',
  '#D0C3E0',
  'rgb(235, 181, 189)',
  'rgb(221, 116, 128)',
  'rgb(217, 92, 94)',
]

export const epcisIFNLayer = (
  epcisByIndex: string[][],
  epcisCode: string[],
): LayerSpecification => ({
  ...epcis,
  id: 'epcisIFN',
  type: 'line',
  filter: ['in', ['get', 'code'], ['literal', epcisCode]],
  paint: {
    'line-width': [
      'case',
      ['any', ['boolean', ['feature-state', 'hover'], false]],
      0,
      1,
    ],
    'line-color': 'white',
  },
})

export const epcisIFNHoverLayer = (
  epcisByIndex: string[][],
  epcisCode: string[],
): LayerSpecification => ({
  ...epcis,
  id: 'epcisIFNHover',
  type: 'line',
  filter: ['in', ['get', 'code'], ['literal', epcisCode]],
  paint: {
    'line-width': [
      'case',
      ['any', ['boolean', ['feature-state', 'hover'], false]],
      3,
      0,
    ],
    'line-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...infHoverColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', epcisByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
})

export const epcisIFNFilledLayer = (
  epcisByIndex: string[][],
  epcisCode: string[],
): LayerSpecification => ({
  ...epcis,
  id: 'epcisIFNFilled',
  type: 'fill',
  filter: ['in', ['get', 'code'], ['literal', epcisCode]],
  paint: {
    'fill-opacity': 0.7,
    'fill-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...ifnColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', epcisByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
})

export const communesIFNLayer = ({
  departementCode,
}: {
  departementCode: string
}): LayerSpecification => ({
  ...communes(departementCode),
  id: 'communesIFN',
  type: 'line',
  paint: {
    'line-opacity': [
      'case',
      ['any', ['boolean', ['feature-state', 'hover'], false]],
      0,
      1,
    ],
    'line-width': 1,
    'line-color': 'white',
  },
})

export const communesIFNHoverLayer = ({
  citiesByIndex,
  departementCode,
}: {
  departementCode: string
  citiesByIndex: string[][]
}): LayerSpecification => ({
  ...communes(departementCode),
  id: 'communesIFNHover',
  type: 'line',
  paint: {
    'line-opacity': [
      'case',
      ['any', ['boolean', ['feature-state', 'hover'], false]],
      1,
      0,
    ],
    'line-width': 3,
    'line-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...infHoverColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', citiesByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
})

export const communesIFNFilledLayer = ({
  citiesByIndex,
  departementCode,
}: {
  departementCode: string
  citiesByIndex: string[][]
}): LayerSpecification => ({
  ...communes(departementCode),
  id: 'communesIFNFilled',
  type: 'fill',
  paint: {
    'fill-opacity': 0.7,
    'fill-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...ifnColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', citiesByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
})

export const selectedCommunesIFNLayer = ({
  citiesByIndex,
  departementCode,
}: {
  departementCode: string
  citiesByIndex: string[][]
}): LayerSpecification => ({
  ...communes(departementCode),
  id: 'selectedCommunesIFN',
  type: 'line',
  paint: {
    'line-width': 3,
    'line-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...ifnColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', citiesByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
  filter: ['boolean', false],
})

export const formatIfnScore = (score: number | null): string => {
  if (score === null) {
    return ''
  }
  const fixed = Number.parseFloat(score.toFixed(1))
  return `${Number.isInteger(fixed) ? fixed.toString() : fixed.toFixed(1)}/10`
}
