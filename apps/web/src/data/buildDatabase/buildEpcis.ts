import { output } from '@app/cli/output'
import axios from 'axios'
import type { Prisma } from '@prisma/client'
import { DomainDataForDataIntegrity } from '@app/web/data/buildDatabase/getDomainDataForDataIntegrity'
import { transformStringToSearchableString } from '@app/web/search/transformStringToSearchableString'
import { arrayToMap } from '@app/web/utils/arrayToMap'
import { epts } from '@app/web/data/buildDatabase/epts'

export const buildEpcis = async ({
  domainData,
}: {
  domainData: DomainDataForDataIntegrity
}) => {
  output('-- Downloading from https://geo.api.gouv.fr...')

  const geoEpcis = await axios.get<
    { nom: string; code: string; population: number }[]
  >('https://geo.api.gouv.fr/epcis?fields=nom,code,population')

  output('-- Add Epts to EPCI dataset...')
  const epcis = arrayToMap([...geoEpcis.data, ...epts.values()], 'code')

  output(`-- Preparing data... (${epcis.size})`)

  // First we check if rows need to be deleted
  const toDelete = new Set<string>()

  for (const existing of domainData.epcis.values()) {
    // Do not delete special epcis (EPTs)
    if (!epcis.has(existing.code) && !epts.has(existing.code)) {
      toDelete.add(existing.code)
    }
  }

  const toCreate: Prisma.EpciCreateManyInput[] = []
  const toUpdate: Prisma.EpciUpdateArgs[] = []

  for (const epci of epcis.values()) {
    const existing = domainData.epcis.get(epci.code)

    if (!existing) {
      toCreate.push({
        code: epci.code,
        nom: epci.nom,
        searchable: transformStringToSearchableString(epci.nom),
        population: epci.population,
      })
      continue
    }

    // Check if need to update
    if (
      existing.code === epci.code &&
      existing.nom === epci.nom &&
      existing.population === epci.population
    ) {
      continue
    }

    toUpdate.push({
      select: { code: true },
      where: { code: epci.code },
      data: {
        nom: epci.nom,
        searchable: transformStringToSearchableString(epci.nom),
        population: epci.population,
      },
    })
  }
  output(
    `-- ${toCreate.length} to create, ${toUpdate.length} to update, ${toDelete.size} to delete`,
  )

  output('-- Checking integrity...')
  const missingEpciCodesInFormulaires = domainData.formulaires.filter(
    ({ epciCode }) => !!epciCode && !epcis.has(epciCode),
  )

  if (missingEpciCodesInFormulaires.length > 0) {
    console.warn(
      `Missing epci codes in formulaires: ${missingEpciCodesInFormulaires
        .map(({ epciCode, id }) => `${id}: ${epciCode ?? 'null'}`)
        .join(', ')}`,
    )
  }

  const missingEpciCodesInParticipants = domainData.epciParticipants.filter(
    ({ epciCode }) => !!epciCode && !epcis.has(epciCode),
  )

  if (missingEpciCodesInParticipants.length > 0) {
    console.warn(
      `Missing epci codes in participants: ${missingEpciCodesInParticipants
        .map(
          ({ epciCode, id, formulaireGouvernanceId }) =>
            `${formulaireGouvernanceId} / ${id}: ${epciCode ?? 'null'}`,
        )
        .join(', ')}`,
    )
  }

  return { epcis, toCreate, toDelete, toUpdate }
}

export type BuildEpcisOutput = Awaited<ReturnType<typeof buildEpcis>>
