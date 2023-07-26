import { output } from '@app/cli/output'
import axios from 'axios'
import type { Prisma } from '@prisma/client'

export const buildRegions = async () => {
  output('-- Downloading from https://geo.api.gouv.fr...')
  const regions = await axios.get<{ nom: string; code: string }[]>(
    'https://geo.api.gouv.fr/regions',
  )
  output('-- Preparing data...')
  const data: Prisma.RegionCreateManyInput[] = regions.data.map(
    ({ code, nom }) => ({
      code,
      nom,
    }),
  )

  return { data }
}

export type BuildRegionOutput = Awaited<ReturnType<typeof buildRegions>>
