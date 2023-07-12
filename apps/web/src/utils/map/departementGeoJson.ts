import { LngLatBounds, LngLatBoundsLike } from 'maplibre-gl'
import { GeoJSONSourceSpecification } from '@maplibre/maplibre-gl-style-spec'
import dataFile from './departements.json'

type JsonDataFeature = {
  type: 'Feature'
  geometry: {
    type: 'Polygon'
    coordinates: number[][][] | number[][][][]
  }
  properties: { DDEP_C_COD: string; DDEP_L_LIB: string }
}

const data = dataFile as {
  type: 'FeatureCollection'
  features: JsonDataFeature[]
}

export type DepartementGeoJson = {
  code: string
  name: string
  // north East and south West coordinates
  bounds: [[number, number], [number, number]]
  source: GeoJSONSourceSpecification & { data: JsonDataFeature }
}

/*
  Returns north East and south West coordinates.
 */
const getBounds = (
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

const constructIndexedDepartementGeoJson = () => {
  const departements = data.features.map((departementFeature) => {
    const bounds = getBounds(departementFeature.geometry.coordinates)

    const source = {
      type: 'geojson',
      data: departementFeature,
    } satisfies GeoJSONSourceSpecification

    return {
      code: departementFeature.properties.DDEP_C_COD,
      name: departementFeature.properties.DDEP_L_LIB,
      bounds,
      source,
    }
  })

  const byCode = new Map(
    departements.map((departement) => [departement.code, departement]),
  )
  const byName = new Map(
    departements.map((departement) => [departement.name, departement]),
  )

  return { departements, byCode, byName }
}

type IndexedDepartementsGeoJson = ReturnType<
  typeof constructIndexedDepartementGeoJson
>

let departementsGeoJson: IndexedDepartementsGeoJson

export const getDepartementGeoJson = (
  departement:
    | { code: string; name?: undefined }
    | { name: string; code?: undefined },
): DepartementGeoJson | null => {
  if (!departementsGeoJson) {
    departementsGeoJson = constructIndexedDepartementGeoJson()
  }

  const result =
    typeof departement.name === 'string'
      ? departementsGeoJson.byName.get(departement.name)
      : departementsGeoJson.byCode.get(departement.code)

  if (!result) {
    return null
  }

  return result
}
