import { output } from '@app/cli/output'
import axios from 'axios'
import type { Prisma } from '@prisma/client'
import { DomainDataForDataIntegrity } from '@app/web/data/buildDatabase/getDomainDataForDataIntegrity'
import { transformStringToSearchableString } from '@app/web/search/transformStringToSearchableString'

export const buildEpcis = async ({
  domainData,
}: {
  domainData: DomainDataForDataIntegrity
}) => {
  output('-- Downloading from https://geo.api.gouv.fr...')

  const { data: epcis } = await axios.get<
    { nom: string; code: string; population: number }[]
  >('https://geo.api.gouv.fr/epcis?fields=nom,code,population')

  output('-- Preparing data...')

  const data: Prisma.EpciCreateManyInput[] = epcis.map(
    ({ code, nom, population }) => ({
      code,
      nom,
      searchable: transformStringToSearchableString(`${code}${nom}`),
      population,
    }),
  )

  output('-- Checking integrity...')
  const epciCodes = new Set(data.map(({ code }) => code))
  const missingEpciCodesInFormulaires = domainData.formulaires.filter(
    ({ epciCode }) => !!epciCode && !epciCodes.has(epciCode),
  )

  if (missingEpciCodesInFormulaires.length > 0) {
    console.warn(
      `Missing epci codes in formulaires: ${missingEpciCodesInFormulaires
        .map(({ epciCode, id }) => `${id}: ${epciCode ?? 'null'}`)
        .join(', ')}`,
    )
  }

  const missingEpciCodesInParticipants = domainData.epciParticipants.filter(
    ({ epciCode }) => !!epciCode && !epciCodes.has(epciCode),
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

  return { codes: new Set(epcis.map(({ code }) => code)), data }
}

export type BuildEpcisOutput = Awaited<ReturnType<typeof buildEpcis>>
