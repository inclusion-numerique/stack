import type { Departement } from '@prisma/client'
import { GeoJSONSourceSpecification } from '@maplibre/maplibre-gl-style-spec'
import { getDataFilePath } from '@app/web/data/dataFiles'
import { parseCsvFile } from '@app/web/data/parseCsvFile'

export const Departements = {
  url: 'https://www.insee.fr/fr/information/6800675',
  updated: '2023-01-01',
  dataFile: 'v_departement_2023.csv',
}

export type DepartementsRow = {
  DEP: string
  REG: string
  CHEFLIEU: string
  TNCC: string
  NCC: string
  NCCENR: string
  LIBELLE: string
}

export const getDepartements = () =>
  parseCsvFile<DepartementsRow>(getDataFilePath(Departements.dataFile))

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
