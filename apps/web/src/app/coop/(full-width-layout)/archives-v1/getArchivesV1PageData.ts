import { getCrasConseillerNumeriqueV1 } from '@app/web/v1/v1CraQueries'
import type { GetCrasConseillerNumeriqueV1Input } from '@app/web/v1/GetCrasConseillerNumeriqueV1Input'

export const getArchivesV1PageData = async (
  input: GetCrasConseillerNumeriqueV1Input,
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

export type ArchivesV1PageData = Awaited<
  ReturnType<typeof getArchivesV1PageData>
>
