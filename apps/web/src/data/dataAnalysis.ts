import {
  getDataInclusionStructures,
  mapDataInclusionStructuresBySiret,
} from '@app/web/data/dataInclusion'
import {
  getCnfsStructures,
  mapCnfsStructuresBySiret,
} from '@app/web/data/cnfsStructures'
import {
  getAidantsConnectStructures,
  mapAidantsConnectStructuresBySiret,
} from '@app/web/data/aidantsConnectStructures'

const valueToString = (value: number) => value.toLocaleString('fr-FR')
const valueToPercentage = (value: number) =>
  `${value.toPrecision(2).toLocaleString()}%`

export const debugDataInclusion = async () => {
  const dataInclusionStructures = await getDataInclusionStructures()
  const dataInclusionInfo = mapDataInclusionStructuresBySiret(
    dataInclusionStructures,
  )
  const totalCount = dataInclusionStructures.length
  const totalCountWithSiret = dataInclusionInfo.bySiret.size
  const totalDuplicatedSirets = dataInclusionInfo.duplicatedSirets.size
  const totalMissingSiret = dataInclusionInfo.missingSiret.length

  return {
    structures: dataInclusionStructures,
    ...dataInclusionInfo,
    analysis: [
      {
        title: 'Nombre de structures inclusion',
        value: totalCount,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures inclusion avec SIRET',
        value: totalCountWithSiret,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures inclusion sans SIRET',
        value: totalMissingSiret,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures inclusion sans SIRET (%)',
        value: (totalMissingSiret / totalCount) * 100,
        stringify: valueToPercentage,
      },
      {
        title: 'Nombre de structures inclusion doublon SIRET',
        value: totalDuplicatedSirets,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures inclusion doublon SIRET (%)',
        value: (totalDuplicatedSirets / totalCount) * 100,
        stringify: valueToPercentage,
      },
    ],
  }
}

export type DataInclusionDebug = Awaited<ReturnType<typeof debugDataInclusion>>

export const debugCnfsStructures = async (
  dataInclusionDebug: DataInclusionDebug,
) => {
  const cnfsStructures = await getCnfsStructures()
  const cnfsInfo = mapCnfsStructuresBySiret(cnfsStructures)
  const totalCount = cnfsStructures.length
  const totalCountWithSiret = cnfsInfo.bySiret.size
  const totalDuplicatedSirets = cnfsInfo.duplicatedSirets.size
  const totalMissingSiret = cnfsInfo.missingSiret.length

  const withInclusionStructure = [...cnfsInfo.bySiret.values()]
    .map((structure) => ({
      structure,
      dataInclusionStructure: dataInclusionDebug.bySiret.get(structure.SIRET),
    }))
    .filter(({ dataInclusionStructure }) => dataInclusionStructure)

  return {
    structures: cnfsStructures,
    ...cnfsInfo,
    analysis: [
      {
        title: 'Nombre de structures CNFS',
        value: totalCount,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures CNFS avec SIRET',
        value: totalCountWithSiret,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures CNFS sans SIRET',
        value: totalMissingSiret,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures CNFS sans SIRET (%)',
        value: (totalMissingSiret / totalCount) * 100,
        stringify: valueToPercentage,
      },
      {
        title: 'Nombre de structures CNFS doublon SIRET',
        value: totalDuplicatedSirets,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures CNFS doublon SIRET (%)',
        value: (totalDuplicatedSirets / totalCount) * 100,
        stringify: valueToPercentage,
      },
      {
        title:
          'Nombre de structures CNFS référencée par SIRET dans data inclusion',
        value: withInclusionStructure.length,
        stringify: valueToString,
      },
      {
        title:
          'Nombre de structures CNFS référencée par SIRET dans data inclusion (%)',
        value: (withInclusionStructure.length / totalCount) * 100,
        stringify: valueToPercentage,
      },
      {
        title:
          'Nombre de structures CNFS non referencée par SIRET dans data inclusion',
        value: totalCount - withInclusionStructure.length,
        stringify: valueToString,
      },
    ],
  }
}

export const debugAidantsConnectStructures = async (
  dataInclusionDebug: DataInclusionDebug,
) => {
  const aidantsConnectStructures = await getAidantsConnectStructures()
  const aidantsConnectInfo = mapAidantsConnectStructuresBySiret(
    aidantsConnectStructures,
  )

  const totalCount = aidantsConnectStructures.length
  const totalCountWithSiret = aidantsConnectInfo.bySiret.size
  const totalDuplicatedSirets = aidantsConnectInfo.duplicatedSirets.size
  const totalMissingSiret = aidantsConnectInfo.missingSiret.length

  const withInclusionStructure = [...aidantsConnectInfo.bySiret.values()]
    .map((structure) => ({
      structure,
      dataInclusionStructure: dataInclusionDebug.bySiret.get(structure.Siret),
    }))
    .filter(({ dataInclusionStructure }) => dataInclusionStructure)

  return {
    structures: aidantsConnectStructures,
    ...aidantsConnectInfo,
    analysis: [
      {
        title: 'Nombre de structures AIDANTSCONNECT',
        value: totalCount,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures AIDANTSCONNECT avec SIRET',
        value: totalCountWithSiret,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures AIDANTSCONNECT sans SIRET',
        value: totalMissingSiret,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures AIDANTSCONNECT sans SIRET (%)',
        value: (totalMissingSiret / totalCount) * 100,
        stringify: valueToPercentage,
      },
      {
        title: 'Nombre de structures AIDANTSCONNECT doublon SIRET',
        value: totalDuplicatedSirets,
        stringify: valueToString,
      },
      {
        title: 'Nombre de structures AIDANTSCONNECT doublon SIRET (%)',
        value: (totalDuplicatedSirets / totalCount) * 100,
        stringify: valueToPercentage,
      },
      {
        title:
          'Nombre de structures AIDANTSCONNECT référencée par SIRET dans data inclusion',
        value: withInclusionStructure.length,
        stringify: valueToString,
      },
      {
        title:
          'Nombre de structures AIDANTSCONNECT référencée par SIRET dans data inclusion (%)',
        value: (withInclusionStructure.length / totalCount) * 100,
        stringify: valueToPercentage,
      },
      {
        title:
          'Nombre de structures AIDANTSCONNECT non referencée par SIRET dans data inclusion',
        value: totalCount - withInclusionStructure.length,
        stringify: valueToString,
      },
    ],
  }
}
