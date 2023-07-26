import { readFile } from 'node:fs/promises'
import { DataInclusionStructure } from '@app/web/data/dataInclusionSchema'
import { getDataFilePath } from '@app/web/data/dataFiles'
import { mapStructuresBySiret } from '@app/web/data/siret'
import { mapStructuresByKey } from '@app/web/data/mapByKey'
import { getDepartementCodeFromPostalCode } from '@app/web/data/getDepartementCodeFromPostalCode'
import { extractMetadataFromId } from '@app/web/data/buildDatabase/buildStructuresCartographieNationale'

export const CartoInclusionLieuxMediation = {
  schema: 'betagouv/data-inclusion-schema',
  url: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-data-inclusion-1/',
  downloadUrl:
    'https://www.data.gouv.fr/fr/datasets/r/be3323ec-4662-4b3b-b90e-18cf5c97193d',
  dataFile: 'structures-inclusion-20230717-data-inclusion-sans-doublons.json',
}

export type CartoInclusionLieuxMediationStructure = DataInclusionStructure & {
  cnfsPermanenceId?: string
  aidantsConnectStructureId?: string
  conseillerNumeriqueLabel: boolean
  franceServicesLabel: boolean
  aidantsConnectLabel: boolean
}
export const refineDataInclusionStructure = (
  structure: DataInclusionStructure,
): CartoInclusionLieuxMediationStructure => ({
  ...structure,
  ...extractMetadataFromId(structure.id),
  code_departement: getDepartementCodeFromPostalCode(structure.code_postal),
  code_insee: structure.code_insee,
  conseillerNumeriqueLabel:
    structure.labels_nationaux?.includes('conseiller-numerique') ?? false,
  franceServicesLabel:
    structure.labels_nationaux?.includes('france-service') ?? false,
  aidantsConnectLabel:
    structure.labels_nationaux?.includes('aidants-connect') ?? false,
})

export const getDataInclusionStructures = async () => {
  const data = await readFile(
    getDataFilePath(CartoInclusionLieuxMediation.dataFile),
    'utf8',
  )
  const structures = JSON.parse(data) as DataInclusionStructure[]

  return structures.map((structure) => refineDataInclusionStructure(structure))
}

export const mapDataInclusionStructuresBySiret = (
  structures: CartoInclusionLieuxMediationStructure[],
) => mapStructuresBySiret(structures, 'siret')

export const mapDataInclusionStructuresByCnfsPermanenceId = (
  structures: CartoInclusionLieuxMediationStructure[],
) => mapStructuresByKey(structures, 'cnfsPermanenceId')

export const mapDataInclusionStructuresByAidantsConnectStructureId = (
  structures: CartoInclusionLieuxMediationStructure[],
) => mapStructuresByKey(structures, 'aidantsConnectStructureId')
