import { LngLatBounds, LngLatBoundsLike } from 'maplibre-gl'

export const getBounds = (
  coordinates: number[][][] | number[][][][],
): [[number, number], [number, number]] => {
  const bounds = new LngLatBounds()
  for (const coord of coordinates.flat()) {
    if (coord.length > 2) {
      for (const subCoord of coord as number[][]) {
        bounds.extend([subCoord[0], subCoord[1]])
      }
    } else {
      bounds.extend([coord[0] as number, coord[1] as number])
    }
  }

  return [
    bounds.getNorthEast().toArray(),
    bounds.getSouthWest().toArray(),
  ] satisfies LngLatBoundsLike
}
