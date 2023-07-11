import { Map } from 'maplibre-gl'

const stateId: Record<string, string | number | undefined> = {}
const setState = (
  map: Map,
  source: string,
  layer: string | undefined,
  stateKey: string,
  key: string,
  value: boolean,
) => {
  if (stateId[stateKey] !== undefined) {
    map.setFeatureState(
      {
        source,
        id: stateId[stateKey],
        sourceLayer: layer,
      },
      { [key]: value },
    )
    if (!value) {
      stateId[stateKey] = undefined
    }
  }
}

export const setSelectedDecoupageState = (
  map: Map,
  layer: string,
  selectedId?: string | number,
) => {
  setState(map, 'decoupage', layer, 'selected', 'selected', false)
  if (selectedId) {
    stateId.selected = selectedId
    setState(map, 'decoupage', layer, 'selected', 'selected', true)
  }
}

export const setSelectedStructureState = (
  map: Map,
  layer: string,
  selectedId?: string | number,
) => {
  setState(map, 'structures', undefined, 'selected', 'selected', false)
  if (selectedId) {
    stateId.selected = selectedId
    setState(map, 'structures', undefined, 'selected', 'selected', true)
  }
}

export const addHoverState = (
  map: Map,
  source: string,
  id: string,
  layer?: string,
) => {
  const key = `${source}-hover`
  map.on('mousemove', id, (event) => {
    if (map && event.features && event.features.length > 0) {
      // eslint-disable-next-line no-param-reassign
      map.getCanvas().style.cursor = 'pointer'
      setState(map, source, layer, key, 'hover', false)
      stateId[key] = event.features[0].id
      setState(map, source, layer, key, 'hover', true)
    }
  })

  map.on('mouseleave', id, () => {
    if (map) {
      setState(map, source, layer, key, 'hover', false)
    }
  })
}
