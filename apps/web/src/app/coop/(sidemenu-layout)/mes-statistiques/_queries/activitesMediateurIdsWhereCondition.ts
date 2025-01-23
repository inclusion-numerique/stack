import { Prisma } from '@prisma/client'

/**
 * Créé un filtre sur les mediateurs pour les activites.
 * La requête doit nommer la table activites "activites" exactement.
 */
export const activitesMediateurIdsWhereCondition = (
  mediateurIds?: string[],
) => {
  if (mediateurIds === undefined) {
    return Prisma.sql`1 = 1`
  }

  if (mediateurIds?.length === 0) {
    return Prisma.sql`1 = 0`
  }

  return Prisma.sql`activites.mediateur_id = ANY(ARRAY[${Prisma.join(mediateurIds.map((id) => `${id}`))}]::UUID[])`
}
