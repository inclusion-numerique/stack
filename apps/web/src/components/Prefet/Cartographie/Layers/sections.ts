import {
  FillLayerSpecification,
  LayerSpecification,
  LineLayerSpecification,
} from 'maplibre-gl'
import { isHoveredCondition } from '@app/web/components/Prefet/Cartographie/Layers/layersUtils'
import { communes, epcis } from './common'

export const greyLinePaint: LineLayerSpecification['paint'] = {
  'line-color': '#161616',
  'line-opacity': ['case', isHoveredCondition, 1, 0.2],
}

export const greyFillPaint: FillLayerSpecification['paint'] = {
  'fill-color': '#161616',
  'fill-opacity': ['case', isHoveredCondition, 0.08, 0],
}
export const departementLayer = (
  departementCode: string,
): LineLayerSpecification => ({
  id: 'departements',
  source: 'decoupage',
  'source-layer': 'departements',
  type: 'line',
  filter: ['==', ['get', 'code'], departementCode],
  paint: { 'line-color': '#161616', 'line-width': 2 },
})

export const baseEpcisBorderLayer = (
  epcisCode: string[],
): LayerSpecification => ({
  ...epcis,
  id: 'baseEpcis',
  type: 'line',
  paint: greyLinePaint,
  filter: ['in', ['get', 'code'], ['literal', epcisCode]],
  layout: { visibility: 'none' },
})

export const baseEpcisFillLayer = (
  epcisCode: string[],
): LayerSpecification => ({
  ...epcis,
  id: 'baseEpcisFill',
  type: 'fill',
  paint: greyFillPaint,
  filter: ['in', ['get', 'code'], ['literal', epcisCode]],
  layout: { visibility: 'none' },
})

export const baseCommunesBorderLayer = (
  departementCode: string,
): LayerSpecification => ({
  ...communes(departementCode),
  id: 'baseCommunesBorder',
  type: 'line',
  paint: greyLinePaint,
  layout: { visibility: 'none' },
})

export const baseCommunesFillLayer = (
  departementCode: string,
): LayerSpecification => ({
  ...communes(departementCode),
  id: 'baseCommunesFill',
  type: 'fill',
  paint: greyFillPaint,
  layout: { visibility: 'none' },
})

export const baseSelectedCommunesBorderLayer = (
  departementCode: string,
): LayerSpecification => ({
  ...communes(departementCode),
  id: 'baseSelectedCommunesBorder',
  type: 'line',
  paint: { 'line-color': '#161616' },
  filter: ['boolean', false],
  layout: { visibility: 'none' },
})

export const baseSelectedCommunesFillLayer = (
  departementCode: string,
): LayerSpecification => ({
  ...communes(departementCode),
  id: 'baseSelectedCommunesFill',
  type: 'fill',
  paint: { 'fill-color': '#161616', 'fill-opacity': 0.08 },
  filter: ['boolean', false],
  layout: { visibility: 'none' },
})
