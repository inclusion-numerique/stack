import type { Departement } from '@prisma/client'
import type { GeoJSONSourceSpecification } from '@maplibre/maplibre-gl-style-spec'

export const getDepartementGeoFeatures = ({
  nom,
  code,
  geometry,
  bounds,
}: Pick<Departement, 'nom' | 'code' | 'geometry' | 'bounds'>) => ({
  nom,
  code,
  source: {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {
        DDEP_C_COD: code,
        DDEP_L_LIB: nom,
      },
      geometry,
    },
  } satisfies GeoJSONSourceSpecification,
  bounds: bounds as [[number, number], [number, number]],
})

export type DepartementGeoFeatures = ReturnType<
  typeof getDepartementGeoFeatures
>
