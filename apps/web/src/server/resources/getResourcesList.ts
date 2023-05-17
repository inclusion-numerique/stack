import { prismaClient } from '@app/web/prismaClient'

export const getResourcesList = async (take?: number, skip?: number) =>
  prismaClient.resource.findMany({
    select: {
      title: true,
      slug: true,
      created: true,
      updated: true,
      description: true,
      image: {
        select: {
          id: true,
          altText: true,
        },
      },
      createdBy: {
        select: {
          name: true,
          id: true,
        },
      },
      base: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
    orderBy: [
      {
        created: 'desc',
      },
    ],
    skip,
    take,
  })

export type ResourceListItem = Exclude<
  Awaited<ReturnType<typeof getResourcesList>>,
  null
>[number]
