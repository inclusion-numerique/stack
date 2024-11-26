import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { createCommunesClient } from '@app/web/communes/communesClient'

export type CrasConseillerNumeriqueV1FilterOptions = {
  conseillerNumeriqueIds?: string[]
  codeCommune?: string
}

export const whereV1QueryInput = ({
  codeCommune,
  conseillerNumeriqueIds,
}: CrasConseillerNumeriqueV1FilterOptions) => {
  const conditions: string[] = []
  if (!!conseillerNumeriqueIds && conseillerNumeriqueIds.length > 0) {
    conditions.push(
      `v1_conseiller_numerique_id IN (${conseillerNumeriqueIds
        .map((id) => `'${id}'`)
        .join(', ')})`,
    )
  }
  if (codeCommune) {
    conditions.push(`code_commune = '${codeCommune}'`)
  }

  if (conditions.length === 0) {
    return Prisma.raw('1 = 1')
  }

  return Prisma.raw(conditions.join(' AND '))
}

export const getCrasV1MinMaxDateAccompagnement = async (
  input: CrasConseillerNumeriqueV1FilterOptions,
): Promise<{
  min: Date
  max: Date
} | null> => {
  // We need the filtered_cras subquery to avoid scans on the cras_conseiller_numerique_v1 table
  // as postgresql does not use the index on the cras_conseiller_numerique_v1.v1_conseiller_numerique_id
  // for some reason
  const rawResult = await prismaClient.$queryRaw<
    {
      min_date_accompagnement: Date
      max_date_accompagnement: Date
    }[]
  >`
      WITH filtered_cras AS (SELECT date_accompagnement
                             FROM cras_conseiller_numerique_v1
                             WHERE ${whereV1QueryInput(input)})
      SELECT MIN(date_accompagnement) AS min_date_accompagnement,
             MAX(date_accompagnement) AS max_date_accompagnement
      FROM filtered_cras
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

export const getCrasV1Communes = async ({
  conseillerNumeriqueIds,
}: {
  conseillerNumeriqueIds: string[]
}): Promise<
  {
    codeInsee: string
    nom: string
    codePostal: string
  }[]
> => {
  if (conseillerNumeriqueIds.length === 0) return []

  const [rows, communesClient] = await Promise.all([
    prismaClient.$queryRaw<
      { code_commune: string; code_postal: string; nom_commune: string }[]
    >`
        SELECT DISTINCT code_commune,
                        MAX(code_postal) AS code_postal,
                        MAX(nom_commune) AS nom_commune
        FROM cras_conseiller_numerique_v1
        WHERE ${whereV1QueryInput({ conseillerNumeriqueIds })}
        GROUP BY code_commune
    `,
    createCommunesClient(),
  ])

  return rows.map(
    ({ code_commune, nom_commune, code_postal }) =>
      communesClient.findCommuneByInsee(code_commune) ?? {
        codeInsee: code_commune,
        nom: nom_commune,
        codePostal: code_postal,
      },
  )
}
