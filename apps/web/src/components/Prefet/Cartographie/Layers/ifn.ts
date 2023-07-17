/* eslint  @typescript-eslint/ban-ts-comment: 0 */

import { LayerSpecification } from 'maplibre-gl'
import { isHoveredCondition } from '@app/web/components/Prefet/Cartographie/Layers/layersUtils'
import { communes, epcis } from './common'

export const ifnFillColors = [
  'rgb(74, 107, 174)',
  'rgb(95, 142, 199)',
  'rgb(170, 196, 230)',
  'rgb(230, 222, 238)',
  'rgb(235, 181, 189)',
  'rgb(221, 116, 128)',
  'rgb(217, 92, 94)',
]

export const ifnBorderColors = [
  'rgb(74, 107, 174)',
  'rgb(95, 142, 199)',
  'rgb(170, 196, 230)',
  'rgb(208, 195, 224)',
  'rgb(235, 181, 189)',
  'rgb(221, 116, 128)',
  'rgb(217, 92, 94)',
]

export const ifnEpcisBorderLayer = (
  epcisByIndex: string[][],
  epcisCode: string[],
): LayerSpecification => ({
  ...epcis,
  id: 'ifnEpcisBorder',
  type: 'line',
  filter: ['in', ['get', 'code'], ['literal', epcisCode]],
  paint: {
    'line-opacity': 1,
    'line-width': 1,
    'line-color': 'white',
  },
})

export const ifnHoverEpcisBorderLayer = (
  epcisByIndex: string[][],
  epcisCode: string[],
): LayerSpecification => ({
  ...epcis,
  id: 'ifnHoverEpcisBorder',
  type: 'line',
  filter: ['in', ['get', 'code'], ['literal', epcisCode]],
  paint: {
    'line-opacity': ['case', isHoveredCondition, 1, 0],
    'line-width': 3,
    'line-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...ifnBorderColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', epcisByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
})

export const ifnEpcisFillLayer = (
  epcisByIndex: string[][],
  epcisCode: string[],
): LayerSpecification => ({
  ...epcis,
  id: 'ifnEpcisFill',
  type: 'fill',
  filter: ['in', ['get', 'code'], ['literal', epcisCode]],
  paint: {
    'fill-opacity': 0.5,
    'fill-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...ifnFillColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', epcisByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
})

export const ifnCommunesBorderLayer = ({
  departementCode,
}: {
  departementCode: string
}): LayerSpecification => ({
  ...communes(departementCode),
  id: 'ifnCommunesBorder',
  type: 'line',
  paint: {
    'line-width': 1,
    'line-color': ['case', isHoveredCondition, 'transparent', 'white'],
  },
})

export const ifnCommunesFillLayer = ({
  citiesByIndex,
  departementCode,
}: {
  departementCode: string
  citiesByIndex: string[][]
}): LayerSpecification => ({
  ...communes(departementCode),
  id: 'ifnCommunesFill',
  type: 'fill',
  paint: {
    'fill-opacity': 0.5,
    'fill-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...ifnFillColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', citiesByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
})

export const ifnHoverCommunesBorderLayer = ({
  citiesByIndex,
  departementCode,
}: {
  departementCode: string
  citiesByIndex: string[][]
}): LayerSpecification => ({
  ...communes(departementCode),
  id: 'ifnHoverCommunesBorder',
  type: 'line',
  paint: {
    'line-opacity': ['case', isHoveredCondition, 1, 0],
    'line-width': 3,
    'line-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...ifnBorderColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', citiesByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
})

export const ifnSelectedCommunesBorderLayer = ({
  citiesByIndex,
  departementCode,
}: {
  departementCode: string
  citiesByIndex: string[][]
}): LayerSpecification => ({
  ...communes(departementCode),
  id: 'ifnSelectedCommunesBorder',
  type: 'line',
  paint: {
    'line-width': 3,
    'line-color': [
      'case',
      // @ts-ignore: cannot type properly
      ...ifnBorderColors.flatMap((color, index) => [
        ['in', ['get', 'code'], ['literal', citiesByIndex[index]]],
        color,
      ]),
      // @ts-ignore: cannot type properly
      'grey',
    ],
  },
  filter: ['boolean', false],
})
