import { prismaClient } from '@app/web/prismaClient'
import { Prisma } from '@prisma/client'

export type ConseillerNumeriqueV1QueryInput = {
  conseillerNumeriqueIds: string[]
}

export const whereV1ConseillerNumeriqueIds = (
  conseillerNumeriqueIds: string[],
) =>
  Prisma.raw(
    conseillerNumeriqueIds.length > 0
      ? `v1_conseiller_numerique_id IN (${conseillerNumeriqueIds
          .map((id) => `'${id}'`)
          .join(', ')})`
      : `1 = 1`,
  )

export const getMinMaxDateAccompagnement = async ({
  conseillerNumeriqueIds,
}: ConseillerNumeriqueV1QueryInput): Promise<{
  min: Date
  max: Date
} | null> => {
  if (conseillerNumeriqueIds.length === 0) {
    return null
  }
  const rawResult = await prismaClient.$queryRaw<
    {
      min_date_accompagnement: Date
      max_date_accompagnement: Date
    }[]
  >`
        SELECT MIN(date_accompagnement) AS min_date_accompagnement,
               MAX(date_accompagnement) AS max_date_accompagnement
        FROM cras_conseiller_numerique_v1
        WHERE ${whereV1ConseillerNumeriqueIds(conseillerNumeriqueIds)}
    `

  const result = rawResult.at(0)
  if (
    !result ||
    !result.min_date_accompagnement ||
    !result.max_date_accompagnement
  ) {
    // No CRAs found
    return null
  }

  return {
    min: result.min_date_accompagnement,
    max: result.max_date_accompagnement,
  }
}
