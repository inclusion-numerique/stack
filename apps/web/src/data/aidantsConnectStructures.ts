import { getDataFilePath } from '@app/web/data/dataFiles'
import { mapStructuresBySiret } from '@app/web/data/siret'
import { parseCsvFileWithMapper } from '@app/web/data/parseCsvFile'

type AidantsConnectCsvRow = {
  name: string
  id: string
  isActive: StringBoolean
  cityCode: string
  address: string
  zipCode: string
  siret: string
  franceServicesLabel: StringBoolean
  city: string
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
  dataFile: '20230718-aidants-connect-structures.csv',
  // Headers are not pretty from metabase export, we redefine them here
  // Check with csv file when updating file

  // Name,ID,Is Active,City Insee Code,Address,Zip Code,France Services Label,City,Nombre d'aidants,Question 110 → Nombre D'usagers Uniques,Question 109 → Nombre De Demarche Par Structure,Question 99 → Nombre Demarche Argent,Question 107 → Nombre Demarche Etranger,Question 103 → Nombre Demarche Famille,Question 106 → Nombre Demarche Justice,Question 108 → Nombre Demarche Loisirs,Question 102 → Nombre Demarche Papier,Question 104 → Nombre Demarche Social,Question 105 → Nombre Demarche Transport,Question 113 → Nombre Demarche Travail,Question 114 → Nombre Demarche Logement
  headers: [
    'name',
    'id',
    'isActive',
    'cityCode',
    'address',
    'zipCode',
    'franceServicesLabel',
    'city',
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

export const AidantsConnectDemarcheLabels = {
  argent: 'Argent',
  etranger: 'Étranger',
  famille: 'Famille',
  justice: 'Justice',
  loisirs: 'Loisirs',
  papier: 'Papier',
  social: 'Social',
  transport: 'Transport',
  travail: 'Travail',
  logement: 'Logement',
} as const

export type AidantsConnectStructure = {
  id: string
  name: string
  isActive: boolean
  cityCode: string | null
  address: string
  zipCode: string
  siret: string
  city: string
  isFranceServices: boolean
  aidants: number
  usagersUniques: number
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

export const getAidantsConnectStructures = () =>
  parseCsvFileWithMapper(
    getDataFilePath(AidantsConnectStructures.dataFile),
    (row: AidantsConnectCsvRow): AidantsConnectStructure => {
      const {
        cityCode,
        isActive,
        franceServicesLabel,
        aidants,
        usagersUniques,
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
      } = row

      return {
        ...rest,
        cityCode: cityCode || null,
        isActive: stringBooleanToBoolean(isActive),
        isFranceServices: stringBooleanToBoolean(franceServicesLabel),
        aidants: toNumber(aidants),
        usagersUniques: toNumber(usagersUniques),
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
      }
    },
    {
      // Headers are not pretty from metabase export, we redefine them here
      // Keep in sync with csv file
      headers: AidantsConnectStructures.headers,
      skipLines: 1,
    },
  )

export const mapAidantsConnectStructuresBySiret = (
  structures: AidantsConnectStructure[],
) => mapStructuresBySiret(structures, 'siret')
