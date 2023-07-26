import { output } from '@app/cli/output'
import axios from 'axios'
import type { Prisma } from '@prisma/client'

export const buildEpcis = async () => {
  output('-- Downloading from https://geo.api.gouv.fr...')

  const { data: epcis } = await axios.get<
    { nom: string; code: string; population: number }[]
  >('https://geo.api.gouv.fr/epcis?fields=nom,code,population')

  output('-- Preparing data...')

  const data: Prisma.EpciCreateManyInput[] = epcis.map(
    ({ code, nom, population }) => ({
      code,
      nom,
      population,
    }),
  )

  return { codes: new Set(epcis.map(({ code }) => code)), data }
}

export type BuildEpcisOutput = Awaited<ReturnType<typeof buildEpcis>>
