import { readFile } from 'node:fs/promises'
import { DataInclusionStructure } from '@app/web/data/dataInclusionSchema'
import { getDataFilePath } from '@app/web/data/dataFiles'
import { mapStructuresBySiret } from '@app/web/data/siret'
import { mapStructuresByKey } from '@app/web/data/mapByKey'

export const CartoInclusionLieuxMediation = {
  schema: 'betagouv/data-inclusion-schema',
  url: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-data-inclusion-1/',
  downloadUrl:
    'https://www.data.gouv.fr/fr/datasets/r/be3323ec-4662-4b3b-b90e-18cf5c97193d',
  dataFile: 'structures-inclusion-20230710-data-inclusion-sans-doublons.json',
}

export type CartoInclusionLieuxMediationStructure = DataInclusionStructure & {
  cnfsPermanenceId?: string
  aidantsConnectStructureId?: string
  conseillerNumeriqueLabel: boolean
  franceServicesLabel: boolean
  aidantsConnectLabel: boolean
}

/**
 * E.g. "mediation-numerique-conseiller-numerique-62ab017b8255a806e299c725-mediation-numerique"
 */
const cnfsIdExtract = /conseiller-numerique-([\dA-Fa-f]{3,})/

/**
 * E.g. "aidants-connect-1539|numi-conseiller-numerique-63d784fce6d6a806f256657a|numinumiconseiller-numerique-63d784fce6d6a806f256657a"
 */
const aidantsConnectIdExtract = /aidants-connect-([\dA-Fa-f]{3,})/

export const extractMetadataFromId = (id: string) => {
  const cnfsPermanenceIdMatch = id.match(cnfsIdExtract)
  const cnfsPermanenceId = cnfsPermanenceIdMatch
    ? cnfsPermanenceIdMatch[1]
    : undefined

  const aidantsConnectStructureIdMatch = id.match(aidantsConnectIdExtract)
  const aidantsConnectStructureId = aidantsConnectStructureIdMatch
    ? aidantsConnectStructureIdMatch[1]
    : undefined
  return {
    cnfsPermanenceId,
    aidantsConnectStructureId,
  }
}

export const refineDataInclusionStructure = (
  structure: DataInclusionStructure,
): CartoInclusionLieuxMediationStructure => ({
  ...structure,
  ...extractMetadataFromId(structure.id),
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
  return structures.map(refineDataInclusionStructure)
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
