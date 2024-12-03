import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { prismaClient } from '@app/web/prismaClient'
import { dureeAccompagnementParDefautLabels } from '@app/web/cra/cra'
import { dureeAsString } from '@app/web/utils/dureeAsString'

export const getAdaptiveDureeOptions = async ({
  mediateurId,
  include,
}: {
  mediateurId: string
  include?: string | null // Add one option with this value to the list
}) => {
  const frequentlyUsedDurees = await prismaClient.$queryRaw<
    { count: number; duree_text: string; duree: number }[]
  >`
      SELECT duree::TEXT as duree_text,
             duree       as duree,
             count(*)    AS count
      FROM "activites"
      WHERE mediateur_id = ${mediateurId}::UUID
      GROUP BY duree
      HAVING count(*) > 5
      ORDER BY count(*) DESC
      LIMIT 10`

  const dureesMap = new Map(
    [
      ...frequentlyUsedDurees.map(({ duree_text, duree }): [string, string] => [
        duree_text,
        dureeAsString(duree),
      ]),
      ...Object.entries(dureeAccompagnementParDefautLabels),
      ...(include
        ? [
            [
              include,
              include === 'personnaliser'
                ? dureeAccompagnementParDefautLabels.personnaliser
                : dureeAsString(Number.parseInt(include, 10)),
            ] satisfies [string, string],
          ]
        : []),
    ].sort((a, b) => {
      // if [0] is "personnaliser" it should be last
      // else sort by [0] casted as int
      const aInt = Number.parseInt(a[0], 10)
      const bInt = Number.parseInt(b[0], 10)

      if (aInt === 0 && bInt !== 0) return 1
      if (aInt !== 0 && bInt === 0) return -1

      return aInt - bInt
    }),
  )

  console.log('DUREES MAP', dureesMap)

  return labelsToOptions(Object.fromEntries(dureesMap))
}
