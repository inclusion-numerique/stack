import { prismaClient } from '@app/web/prismaClient'

export const getFirstAndLastActiviteDate = async ({
  mediateurId,
}: {
  mediateurId: string
}): Promise<ActiviteDates> => {
  const firstDate = await prismaClient.$queryRaw<{ date: Date }[]>`
      SELECT MIN(date) AS date
      FROM activites
      WHERE mediateur_id = ${mediateurId}::UUID
  `

  const lastDate = await prismaClient.$queryRaw<{ date: Date }[]>`
      SELECT MAX(date) AS date
      FROM activites
      WHERE mediateur_id = ${mediateurId}::UUID
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
