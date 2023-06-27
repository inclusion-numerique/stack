import { FillLayerSpecification, LineLayerSpecification } from 'maplibre-gl'

export const epciMaxZoom = 9

export const communes = (
  departementCode: string,
): Omit<
  LineLayerSpecification | FillLayerSpecification,
  'paint' | 'type' | 'id'
> => ({
  source: 'decoupage',
  'source-layer': 'communes',
  minzoom: epciMaxZoom,
  filter: ['==', ['get', 'departement'], departementCode],
})

export const epcis: Omit<
  LineLayerSpecification | FillLayerSpecification,
  'paint' | 'type' | 'id'
> = {
  source: 'decoupage',
  'source-layer': 'epcis',
  maxzoom: epciMaxZoom,
}
