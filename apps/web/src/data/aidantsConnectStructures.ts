import { createReadStream } from 'node:fs'
import neatCsv from 'neat-csv'
import { getDataFilePath } from '@app/web/data/dataFiles'
import { mapStructuresBySiret } from '@app/web/data/siret'

export const AidantsConnectStructures = {
  url: 'https://metabase.aidantsconnect.beta.gouv.fr/question#eyJkYXRhc2V0X3F1ZXJ5Ijp7ImRhdGFiYXNlIjozLCJxdWVyeSI6eyJzb3VyY2UtdGFibGUiOjMzLCJvcmRlci1ieSI6W1siZGVzYyIsWyJmaWVsZCIsNDc1LG51bGxdXV19LCJ0eXBlIjoicXVlcnkifSwiZGlzcGxheSI6InRhYmxlIiwidmlzdWFsaXphdGlvbl9zZXR0aW5ncyI6eyJ0YWJsZS5jb2x1bW5fd2lkdGhzIjpbbnVsbCxudWxsLDI2NF19LCJvcmlnaW5hbF9jYXJkX2lkIjpudWxsfQ==',
  dataFile: 'query_result_2023-07-03T14_09_41.253331972Z.csv',
}

type StringBoolean = 'true' | 'false'
export const stringBooleanToBoolean = (value: StringBoolean) => {
  switch (value) {
    case 'true': {
      return true
    }
    case 'false': {
      return false
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unexpected chelou boolean value: ${value}`)
    }
  }
}

export type AidantsConnectStructure = {
  ID: string
  Name: string
  Siret: string
  Address: string
  'Zip Code': string
  // TODO Type a mapper ?
  'Type ID': string
  'Data Pass ID': string
  'Is Active': StringBoolean
  City: string
  'City Insee Code': string
  'Department Insee Code': string
  'Is Experiment': StringBoolean
  'France Services Label': StringBoolean
  'France Services Number': string
  UUID: '39adeae1-a7e3-4b35-9088-8213f8c74afc'
}

export const getAidantsConnectStructures = async () => {
  const data = await neatCsv(
    createReadStream(getDataFilePath(AidantsConnectStructures.dataFile)),
  )
  return data as AidantsConnectStructure[]
}

export const mapAidantsConnectStructuresBySiret = (
  structures: AidantsConnectStructure[],
) => mapStructuresBySiret(structures, 'Siret')
