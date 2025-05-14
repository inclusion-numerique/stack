import { deleteAll, seed } from '@app/fixtures/seeds'
import { prismaClient } from '@app/web/prismaClient'

export const resetFixtures = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _emptyParametersNeededForTypesafety: Record<string, string>,
) => {
  await deleteAll(prismaClient)
  await seed(prismaClient)

  return {
    done: true,
  }
}
