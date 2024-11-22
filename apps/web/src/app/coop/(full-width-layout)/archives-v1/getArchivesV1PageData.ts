import { getCrasConseillerNumeriqueV1 } from '@app/web/v1/v1CraQueries'
import {
  CrasConseillerNumeriqueV1FilterOptions,
  getCrasV1MinMaxDateAccompagnement,
} from '@app/web/app/coop/(full-width-layout)/archives-v1/crasConseillerNumeriqueV1Queries'

export const getArchivesV1PageData = async (
  input: CrasConseillerNumeriqueV1FilterOptions,
) => {
  const dates = await getCrasV1MinMaxDateAccompagnement(input)

  if (!dates) {
    return {
      empty: true,
      input,
      firstDate: null,
      lastDate: null,
    }
  }

  const { min, max } = dates

  return {
    empty: false,
    input,
    firstDate: min,
    lastDate: max,
  }
}

export type ArchivesV1PageData = Awaited<
  ReturnType<typeof getArchivesV1PageData>
>

export const getArchivesV1PageDataWithCras = async (
  input: CrasConseillerNumeriqueV1FilterOptions,
) => {
  const v1Cras = await getCrasConseillerNumeriqueV1(input)

  if (v1Cras.length === 0) {
    return {
      v1Cras: [],
      empty: true,
      input,
    }
  }

  // They are ordered by date asc. we find first and last date
  const firstDate = v1Cras.at(0)?.dateAccompagnement ?? null
  const lastDate = v1Cras.at(-1)?.dateAccompagnement ?? null

  if (!firstDate || !lastDate) {
    throw new Error('Missing dates in non empty cras list')
  }

  return {
    v1Cras,
    empty: false,
    input,
    firstDate,
    lastDate,
  }
}

export type ArchivesV1PageDataWithCras = Awaited<
  ReturnType<typeof getArchivesV1PageDataWithCras>
>
