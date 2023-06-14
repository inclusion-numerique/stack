import { LngLatBounds } from 'maplibre-gl'
import ardennes from './departements/ardennes.json'

// Could be cached
export const ardennesBounds =
  ardennes.features[0].geometry.coordinates[0].reduce(
    (accumulator, coord) =>
      accumulator.extend([coord[0], coord[1]]) as LngLatBounds,
    new LngLatBounds([
      ardennes.features[0].geometry.coordinates[0][0][0],
      ardennes.features[0].geometry.coordinates[0][0][1],
    ]),
  )
