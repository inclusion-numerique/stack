import { getDataFilePath } from '@app/web/data/dataFiles'
import { parseCsvFile } from '@app/web/data/parseCsvFile'

export const Regions = {
  url: 'https://www.insee.fr/fr/information/6800675',
  updated: '2023-01-01',
  dataFile: 'v_region_2023.csv',
}

export type RegionsRow = {
  REG: string
  CHEFLIEU: string
  TNCC: string
  NCC: string
  NCCENR: string
  LIBELLE: string
}

export const getRegions = () =>
  parseCsvFile<RegionsRow>(getDataFilePath(Regions.dataFile))
