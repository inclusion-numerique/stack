import type { Prisma } from '@prisma/client'
import { mergeUuids } from './mergeUuids'

export type Coordination = {
  coordinateurId: string
  mediateurIds: string[]
}

export const upsertCoordinationFixtures =
  (transaction: Prisma.TransactionClient) =>
  async (coordinations: Coordination[]) => {
    await Promise.all(
      coordinations.map(async ({ coordinateurId, mediateurIds }) =>
        Promise.all(
          mediateurIds.map((mediateurId) => {
            const id = mergeUuids(coordinateurId, mediateurId)

            return transaction.mediateurCoordonne.upsert({
              where: { id },
              create: { id, coordinateurId, mediateurId },
              update: { id, coordinateurId, mediateurId },
            })
          }),
        ),
      ),
    )
  }
