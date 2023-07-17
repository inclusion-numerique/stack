import { createReadStream } from 'node:fs'
import neatCsv from 'neat-csv'
import { getDataFilePath } from '@app/web/data/dataFiles'
import { mapStructuresBySiret } from '@app/web/data/siret'

type AidantsConnectCsvRow = {
  id: string
  name: string
  isActive: StringBoolean
  cityCode: string
  address: string
  zipCode: string
  siret: string
  isFranceServices: StringBoolean
  aidants: string
  usagersUniques: string
  demarches: string
  dArgent: string
  dEtranger: string
  dFamille: string
  dJustice: string
  dLoisirs: string
  dPapier: string
  dSocial: string
  dTransport: string
  dTravail: string
  dLogement: string
}

export const AidantsConnectStructures = {
  url: 'https://metabase.aidantsconnect.beta.gouv.fr/',
  dataFile: 'liste_des_structures_avec_leurs_stats_2023-07-13T15 51 45.csv',
  // Headers are not pretty from metabase export, we redefine them here
  // Check with csv file when updating file
  headers: [
    'id',
    'name',
    'isActive',
    'cityCode',
    'address',
    'zipCode',
    'siret',
    'isFranceServices',
    'aidants',
    'usagersUniques',
    'demarches',
    'dArgent',
    'dEtranger',
    'dFamille',
    'dJustice',
    'dLoisirs',
    'dPapier',
    'dSocial',
    'dTransport',
    'dTravail',
    'dLogement',
  ] satisfies (keyof AidantsConnectCsvRow)[],
  updated: '2021-07-13',
}

type StringBoolean = 'TRUE' | 'FALSE'
export const stringBooleanToBoolean = (value: StringBoolean) => {
  switch (value) {
    case 'TRUE': {
      return true
    }
    case 'FALSE': {
      return false
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unexpected chelou boolean value: ${value}`)
    }
  }
}

export type AidantsConnectStructure = {
  id: string
  name: string
  isActive: boolean
  cityCode: string | null
  address: string
  zipCode: string
  siret: string
  isFranceServices: boolean
  aidants: string
  usagersUniques: string
  demarches: {
    total: number
    argent: number
    etranger: number
    famille: number
    justice: number
    loisirs: number
    papier: number
    social: number
    transport: number
    travail: number
    logement: number
  }
}

const toNumber = (value: string) => {
  if (!value) {
    return 0
  }
  return Number.parseInt(value, 10)
}

export const getAidantsConnectStructures = async () => {
  const data: AidantsConnectCsvRow[] = await neatCsv(
    createReadStream(getDataFilePath(AidantsConnectStructures.dataFile)),
    {
      // Headers are not pretty from metabase export, we redefine them here
      // Keep in sync with csv file
      headers: AidantsConnectStructures.headers,
      separator: ';',
      skipLines: 1,
    },
  )

  return data.map(
    ({
      cityCode,
      isActive,
      isFranceServices,
      demarches,
      dArgent,
      dEtranger,
      dFamille,
      dJustice,
      dLoisirs,
      dPapier,
      dSocial,
      dTransport,
      dTravail,
      dLogement,
      ...rest
    }): AidantsConnectStructure => ({
      ...rest,
      cityCode: cityCode || null,
      isActive: stringBooleanToBoolean(isActive),
      isFranceServices: stringBooleanToBoolean(isFranceServices),
      demarches: {
        total: toNumber(demarches),
        argent: toNumber(dArgent),
        etranger: toNumber(dEtranger),
        famille: toNumber(dFamille),
        justice: toNumber(dJustice),
        loisirs: toNumber(dLoisirs),
        papier: toNumber(dPapier),
        social: toNumber(dSocial),
        transport: toNumber(dTransport),
        travail: toNumber(dTravail),
        logement: toNumber(dLogement),
      },
    }),
  )
}

export const mapAidantsConnectStructuresBySiret = (
  structures: AidantsConnectStructure[],
) => mapStructuresBySiret(structures, 'siret')
