import { output } from '@app/cli/output'
import type { Prisma } from '@prisma/client'
import { BuildCommunesOutput } from '@app/web/data/buildDatabase/buildCommunes'
import { BuildEpcisOutput } from '@app/web/data/buildDatabase/buildEpcis'
import { parseCsvFileWithMapper } from '@app/web/data/parseCsvFile'
import { getDataFilePath } from '@app/web/data/dataFiles'

export const buildIfn = async ({
  communes,
  epcis,
}: {
  communes: BuildCommunesOutput
  epcis: BuildEpcisOutput
}) => {
  output('-- Getting data from epci csv...')

  // name,division,code,no_thd_coverage_rate,no_4g_coverage_rate,poverty_rate,older_65_rate,nscol15p_rate,total

  const epciIfns = await parseCsvFileWithMapper(
    getDataFilePath('ifn-epci-all-variation.csv'),
    (row: {
      name: string
      division: string
      code: string
      no_thd_coverage_rate: string
      no_4g_coverage_rate: string
      poverty_rate: string
      older_65_rate: string
      nscol15p_rate: string
      total: string
    }) => ({
      code: row.code,
      noThdCoverageRate: Number.parseFloat(row.no_thd_coverage_rate),
      no4gCoverageRate: Number.parseFloat(row.no_4g_coverage_rate),
      povertyRate: Number.parseFloat(row.poverty_rate),
      older65Rate: Number.parseFloat(row.older_65_rate),
      nscol15pRate: Number.parseFloat(row.nscol15p_rate),
      total: Number.parseFloat(row.total),
    }),
  )

  output('-- Getting data from communes csv...')

  const communeIfns = await parseCsvFileWithMapper(
    getDataFilePath('ifn-city-all-variation.csv'),
    (row: {
      name: string
      division: string
      code: string
      no_thd_coverage_rate: string
      no_4g_coverage_rate: string
      poverty_rate: string
      older_65_rate: string
      nscol15p_rate: string
      total: string
    }) => ({
      code: row.code,
      noThdCoverageRate: Number.parseFloat(row.no_thd_coverage_rate),
      no4gCoverageRate: Number.parseFloat(row.no_4g_coverage_rate),
      povertyRate: Number.parseFloat(row.poverty_rate),
      older65Rate: Number.parseFloat(row.older_65_rate),
      nscol15pRate: Number.parseFloat(row.nscol15p_rate),
      total: Number.parseFloat(row.total),
    }),
  )

  output(`-- Prepare data for insert...`)

  const communesData: Prisma.IfnCommuneCreateManyInput[] = []
  const epcisData: Prisma.IfnEpciCreateManyInput[] = []

  /**
   * They are for the most part "Communes déléguées"
   * Also 2 cases of missing ifn data
   */
  const invalidIfnCommunes: typeof communeIfns = []

  for (const communeIfn of communeIfns) {
    const codeCommune = communes.codes.has(communeIfn.code)
      ? communeIfn.code
      : null

    if (!codeCommune) {
      // Communes déléguées
      invalidIfnCommunes.push(communeIfn)
      continue
    }

    if (Number.isNaN(communeIfn.total)) {
      invalidIfnCommunes.push(communeIfn)
      // Missing IFN data (I only saw 2 cases in all ifn cities dataset)
      continue
    }

    communesData.push({
      codeCommune,
      total: communeIfn.total,
      noThdCoverageRate: communeIfn.noThdCoverageRate,
      no4gCoverageRate: communeIfn.no4gCoverageRate,
      povertyRate: communeIfn.povertyRate,
      older65Rate: communeIfn.older65Rate,
      nscol15pRate: communeIfn.nscol15pRate,
    })
  }

  const invalidIfnEpcis: typeof epciIfns = []

  for (const epciIfn of epciIfns) {
    const codeEpci = epcis.codes.has(epciIfn.code) ? epciIfn.code : null

    if (!codeEpci) {
      // Invalid data
      invalidIfnEpcis.push(epciIfn)
      continue
    }

    if (Number.isNaN(epciIfn.total)) {
      invalidIfnEpcis.push(epciIfn)
      // Missing IFN data
      continue
    }

    epcisData.push({
      codeEpci,
      total: epciIfn.total,
      noThdCoverageRate: epciIfn.noThdCoverageRate,
      no4gCoverageRate: epciIfn.no4gCoverageRate,
      povertyRate: epciIfn.povertyRate,
      older65Rate: epciIfn.older65Rate,
      nscol15pRate: epciIfn.nscol15pRate,
    })
  }

  return {
    invalidIfnCommunes,
    invalidIfnEpcis,
    ifnCommuneData: communesData,
    ifnEpciData: epcisData,
  }
}

export type BuildIfnOutput = Awaited<ReturnType<typeof buildIfn>>
