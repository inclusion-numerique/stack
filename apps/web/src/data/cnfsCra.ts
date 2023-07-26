import { createReadStream } from 'node:fs'
import neatCsv from 'neat-csv'
import { getDataFilePath } from '@app/web/data/dataFiles'

type ConumCraCsvRow = {
  codePostal: string
  moins12ans: string
  de12a18ans: string
  de18a35ans: string
  de35a60ans: string
  plus60ans: string
  etudiant: string
  sansEmploi: string
  enEmploi: string
  retraite: string
  heterogene: string
}

export const ConumCras = {
  url: '',
  dataFile: '2023-07-17 - conum - cra  par code postaux.csv',
  // Headers are not pretty from metabase export, we redefine them here
  // Check with csv file when updating file
  headers: [
    'codePostal',
    'moins12ans',
    'de12a18ans',
    'de18a35ans',
    'de35a60ans',
    'plus60ans',
    'etudiant',
    'sansEmploi',
    'enEmploi',
    'retraite',
    'heterogene',
  ] satisfies (keyof ConumCraCsvRow)[],
  updated: '2023-07-13',
}

export type ConumCra = {
  codePostal: string
  moins12ans: number
  de12a18ans: number
  de18a35ans: number
  de35a60ans: number
  plus60ans: number
  etudiant: number
  sansEmploi: number
  enEmploi: number
  retraite: number
  heterogene: number
}

export type ConumCraSummary = Omit<ConumCra, 'codePostal'>

const toNumber = (value: string) => {
  if (!value) {
    return 0
  }
  return Number.parseInt(value, 10)
}

export const getConumCrasByCodePostal = async () => {
  const data: ConumCraCsvRow[] = await neatCsv(
    createReadStream(getDataFilePath(ConumCras.dataFile)),
    {
      // Headers are not pretty from metabase export, we redefine them here
      // Keep in sync with csv file
      headers: ConumCras.headers,
      separator: ',',
      skipLines: 1,
    },
  )

  return data
    .filter(
      ({ codePostal }) =>
        codePostal !== 'undef' &&
        // Intentional space after null
        codePostal !== 'null ',
    )
    .map(
      ({
        moins12ans,
        de12a18ans,
        de18a35ans,
        de35a60ans,
        plus60ans,
        enEmploi,
        sansEmploi,
        etudiant,
        heterogene,
        retraite,
        codePostal,
      }): ConumCra => {
        // There is malformed data in the csv file, we trim it
        const trimmedCodePostal = codePostal.trim()

        return {
          codePostal:
            trimmedCodePostal.length < 5
              ? trimmedCodePostal.padEnd(5, '0')
              : trimmedCodePostal,
          moins12ans: toNumber(moins12ans),
          de12a18ans: toNumber(de12a18ans),
          de18a35ans: toNumber(de18a35ans),
          de35a60ans: toNumber(de35a60ans),
          plus60ans: toNumber(plus60ans),
          etudiant: toNumber(etudiant),
          sansEmploi: toNumber(sansEmploi),
          enEmploi: toNumber(enEmploi),
          retraite: toNumber(retraite),
          heterogene: toNumber(heterogene),
        }
      },
    )
}
