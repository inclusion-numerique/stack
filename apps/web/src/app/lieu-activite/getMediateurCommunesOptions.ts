import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { getDepartementsFromCodesInsee } from '@app/web/utils/getDepartementFromCodeInsee'

export const getMediateurCommunesAndDepartementsOptions = async ({
  mediateurIds,
}: {
  mediateurIds: string[]
}) => {
  const communes = await prismaClient.$queryRaw<
    {
      code: string
      commune: string
      code_postal: string
    }[]
  >`
      WITH calculated_insee AS (
          SELECT
              COALESCE(structures.code_insee, activites.lieu_code_insee) AS code_insee,
              COALESCE(structures.commune, activites.lieu_commune) AS commune,
              COALESCE(structures.code_postal, activites.lieu_code_postal) AS code_postal
          FROM activites
                   LEFT JOIN structures ON structures.id = activites.structure_id
          WHERE activites.mediateur_id = ANY(ARRAY[${Prisma.join(mediateurIds.map((id) => `${id}`))}]::UUID[])
      )
      SELECT
          code_insee AS code,
          MIN(commune) AS commune,
          MIN(code_postal) AS code_postal
      FROM calculated_insee
      WHERE code_insee IS NOT NULL
      GROUP BY code_insee
      ORDER BY commune ASC;
  `

  const communesOptions = communes.map(
    ({ code, code_postal, commune }) =>
      ({
        value: code,
        label: `${commune} · ${code_postal}`,
      }) satisfies SelectOption,
  )

  const departementsOptions: SelectOption[] = getDepartementsFromCodesInsee(
    communes.map(({ code }) => code),
  ).map(({ code, nom }) => ({
    value: code,
    label: `${code} · ${nom}`,
  }))

  return { communesOptions, departementsOptions }
}
