import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const getFirstAndLastActiviteDate = async ({
  mediateurIds,
}: {
  mediateurIds: string[]
}): Promise<ActiviteDates> => {
  const firstDate = await prismaClient.$queryRaw<{ date: Date }[]>`
      SELECT MIN(date) AS date
      FROM activites
      WHERE mediateur_id = ANY(ARRAY[${Prisma.join(mediateurIds.map((id) => `${id}`))}]::UUID[])
  `

  const lastDate = await prismaClient.$queryRaw<{ date: Date }[]>`
      SELECT MAX(date) AS date
      FROM activites
      WHERE mediateur_id = ANY(ARRAY[${Prisma.join(mediateurIds.map((id) => `${id}`))}]::UUID[])
  `

  return {
    first: firstDate.at(0)?.date ?? undefined,
    last: lastDate.at(0)?.date ?? undefined,
  }
}

export type ActiviteDates = {
  first: Date | undefined
  last: Date | undefined
}
