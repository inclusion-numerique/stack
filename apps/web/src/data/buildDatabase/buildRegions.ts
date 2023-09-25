import { output } from '@app/cli/output'
import axios from 'axios'
import type { Prisma } from '@prisma/client'
import { DomainDataForDataIntegrity } from '@app/web/data/buildDatabase/getDomainDataForDataIntegrity'
import { transformStringToSearchableString } from '@app/web/search/transformStringToSearchableString'
import { arrayToMap } from '@app/web/utils/arrayToMap'

export const buildRegions = async ({
  domainData,
}: {
  domainData: DomainDataForDataIntegrity
}) => {
  output('-- Downloading from https://geo.api.gouv.fr...')
  const regions = await axios
    .get<
      {
        nom: string
        code: string
      }[]
    >('https://geo.api.gouv.fr/regions')
    .then(({ data }) => arrayToMap(data, 'code'))

  output(`-- Preparing data... (${regions.size})`)

  // First we check if rows need to be deleted
  const toDelete = new Set<string>()

  for (const existing of domainData.regions.values()) {
    if (!regions.has(existing.code)) {
      toDelete.add(existing.code)
    }
  }

  const toCreate: Prisma.RegionCreateManyInput[] = []
  const toUpdate: Prisma.RegionUpdateArgs[] = []

  for (const region of regions.values()) {
    const existing = domainData.regions.get(region.code)

    if (!existing) {
      toCreate.push({
        code: region.code,
        nom: region.nom,
        searchable: transformStringToSearchableString(region.nom),
      })
      continue
    }

    // Check if need to update
    if (existing.code === region.code && existing.nom === region.nom) {
      continue
    }

    toUpdate.push({
      select: { code: true },
      where: { code: region.code },
      data: {
        nom: region.nom,
        searchable: transformStringToSearchableString(region.nom),
      },
    })
  }

  output(
    `-- ${toCreate.length} to create, ${toUpdate.length} to update, ${toDelete.size} to delete`,
  )

  output('-- Checking integrity...')
  const missingRegionCodesInFormulaires = domainData.formulaires.filter(
    ({ regionCode }) => !!regionCode && !regions.has(regionCode),
  )

  if (missingRegionCodesInFormulaires.length > 0) {
    console.warn(
      `Missing region codes in formulaires: ${missingRegionCodesInFormulaires
        .map(({ regionCode, id }) => `${id}: ${regionCode ?? 'null'}`)
        .join(', ')}`,
    )
  }

  return { toCreate, toUpdate, toDelete }
}

export type BuildRegionOutput = Awaited<ReturnType<typeof buildRegions>>
