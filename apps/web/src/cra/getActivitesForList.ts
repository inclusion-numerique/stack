import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { activitesMediateurWithCrasSelect } from '@app/web/cra/activitesQueries'

export const queryActivitesForList = async ({
  orderBy,
  skip,
  take,
  where,
}: {
  where: Prisma.ActiviteMediateurWhereInput
  orderBy: Prisma.ActiviteMediateurOrderByWithRelationInput[]
  skip?: number
  take?: number
}) =>
  prismaClient.activiteMediateur.findMany({
    where,
    take,
    skip,
    select: activitesMediateurWithCrasSelect,
    orderBy,
  })

export type ActiviteForListQueryResult = Awaited<
  ReturnType<typeof queryActivitesForList>
>[number]
