import { output } from '@app/cli/output'
import axios from 'axios'
import { chunk } from 'lodash'
import type { Prisma } from '@prisma/client'
import { BuildCommunesOutput } from '@app/web/data/buildDatabase/buildCommunes'
import { BuildEpcisOutput } from '@app/web/data/buildDatabase/buildEpcis'
import { parseCsvFileWithMapper } from '@app/web/data/parseCsvFile'
import { getDataFilePath } from '@app/web/data/dataFiles'

export type IFNResponse = Record<
  string,
  {
    score: {
      total: number
      no_thd_coverage_rate: number
      no_4g_coverage_rate: number
      poverty_rate: number
      older_65_rate: number
      nscol15p_rate: number
    }
  }
>

const useApiForCommunes = false

export const buildIfn = async ({
  communes,
  epcis,
}: {
  communes: BuildCommunesOutput
  epcis: BuildEpcisOutput
}) => {
  output('-- Getting data from communes csv...')

  // name,division,code,no_thd_coverage_rate,no_4g_coverage_rate,poverty_rate,older_65_rate,nscol15p_rate,total

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

  if (useApiForCommunes) {
    /**
     * This is a bit slow, we disable api fetching for now and use csv file given by mednum team
     */
    output('-- Getting data for communes from api...')

    const communeCodes = [...communes.codes.values()]

    const communeScores = await Promise.all(
      chunk(communeCodes, 400).map(async (communeCodesChunk) => {
        const communeIfnsResponse = await axios.get<IFNResponse>(
          `https://preprod.fragilite-numerique.tlscp.fr/api/scoring/city?${communeCodesChunk
            .map((commune) => `codes[]=${commune}`)
            .join(
              '&',
            )}&filters[]=no_thd_coverage_rate&filters[]=no_4g_coverage_rate&filters[]=older_65_rate&filters[]=nscol15p_rate&filters[]=poverty_rate`,
        )
        return Object.entries(communeIfnsResponse.data)
      }),
    ).then((responses) => responses.flat())

    output(`---- Got data for communes from api ${communeScores.length}`)
  }

  output('-- Getting data for epci from api...')

  const epciCodes = [...epcis.codes.values()]

  const epciScores = await Promise.all(
    chunk(epciCodes, 100).map(async (epciCodesChunk) => {
      const epciIfnsResponse = await axios.get<IFNResponse>(
        `https://preprod.fragilite-numerique.tlscp.fr/api/scoring/epci?${epciCodesChunk
          .map((epci) => `codes[]=${epci}`)
          .join(
            '&',
          )}&filters[]=no_thd_coverage_rate&filters[]=no_4g_coverage_rate&filters[]=older_65_rate&filters[]=nscol15p_rate&filters[]=poverty_rate`,
      )
      return Object.entries(epciIfnsResponse.data)
    }),
  ).then((responses) => responses.flat())

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

  for (const [code, ifn] of epciScores) {
    epcisData.push({
      codeEpci: code,
      total: ifn.score.total,
      noThdCoverageRate: ifn.score.no_thd_coverage_rate,
      no4gCoverageRate: ifn.score.no_4g_coverage_rate,
      povertyRate: ifn.score.poverty_rate,
      older65Rate: ifn.score.older_65_rate,
      nscol15pRate: ifn.score.nscol15p_rate,
    })
  }

  return {
    invalidIfnCommunes,
    ifnCommuneData: communesData,
    ifnEpciData: epcisData,
  }
}

export type BuildIfnOutput = Awaited<ReturnType<typeof buildIfn>>
