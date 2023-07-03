import { readFile } from 'node:fs/promises'
import { DataInclusionStructure } from '@app/web/data/dataInclusionSchema'
import { getDataFilePath } from '@app/web/data/dataFiles'
import { mapStructuresBySiret } from '@app/web/data/siret'

export const CartoInclusionLieuxMediation = {
  schema: 'betagouv/data-inclusion-schema',
  url: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-data-inclusion-1/',
  downloadUrl:
    'https://www.data.gouv.fr/fr/datasets/r/be3323ec-4662-4b3b-b90e-18cf5c97193d',
  dataFile: 'structures-inclusion-20230628-data-inclusion-sans-doublons.json',
}

export type CartoInclusionLieuxMediationStructure = DataInclusionStructure

export const getDataInclusionStructures = async () => {
  const data = await readFile(
    getDataFilePath(CartoInclusionLieuxMediation.dataFile),
    'utf8',
  )
  return JSON.parse(data) as CartoInclusionLieuxMediationStructure[]
}

export const mapDataInclusionStructuresBySiret = (
  structures: CartoInclusionLieuxMediationStructure[],
) => mapStructuresBySiret(structures, 'siret')
