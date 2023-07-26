import { getDataFilePath } from '@app/web/data/dataFiles'
import { parseJsonFile } from '@app/web/data/parseJsonFile'

export const GeoDepartements = {
  url: 'https://geo.api.gouv.fr',
  updated: '2023-01-01',
  dataFile: 'departements.json',
}

export type GeoDepartementJson = {
  type: 'FeatureCollection'
  name: 'Departements'
  features: {
    type: 'Feature'
    properties: {
      DDEP_C_COD: string
      DDEP_L_LIB: string
    }
    geometry: {
      type: 'Polygon'
      coordinates: number[][][]
    }
  }[]
}

export const getGeoDepartements = () =>
  parseJsonFile<GeoDepartementJson>(getDataFilePath(GeoDepartements.dataFile))
