import { output } from '@app/cli/output'
import axios from 'axios'
import type { Prisma } from '@prisma/client'
import { DomainDataForDataIntegrity } from '@app/web/data/buildDatabase/getDomainDataForDataIntegrity'
import { transformStringToSearchableString } from '@app/web/search/transformStringToSearchableString'

export const buildRegions = async ({
  domainData,
}: {
  domainData: DomainDataForDataIntegrity
}) => {
  output('-- Downloading from https://geo.api.gouv.fr...')
  const regions = await axios.get<
    {
      nom: string
      code: string
    }[]
  >('https://geo.api.gouv.fr/regions')
  output('-- Preparing data...')
  const data: Prisma.RegionCreateManyInput[] = regions.data.map(
    ({ code, nom }) => ({
      code,
      nom,
      searchable: transformStringToSearchableString(nom),
    }),
  )
  output('-- Checking integrity...')
  const regionCodes = new Set(data.map(({ code }) => code))
  const missingRegionCodesInFormulaires = domainData.formulaires.filter(
    ({ regionCode }) => !!regionCode && !regionCodes.has(regionCode),
  )

  if (missingRegionCodesInFormulaires.length > 0) {
    console.warn(
      `Missing region codes in formulaires: ${missingRegionCodesInFormulaires
        .map(({ regionCode, id }) => `${id}: ${regionCode ?? 'null'}`)
        .join(', ')}`,
    )
  }

  return { data }
}

export type BuildRegionOutput = Awaited<ReturnType<typeof buildRegions>>
