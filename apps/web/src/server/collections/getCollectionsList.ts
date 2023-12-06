import type { Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const computeCollectionsListWhereForUser = (
  user?: Pick<SessionUser, 'id'> | null,
  where: Prisma.CollectionWhereInput = {},
): Prisma.CollectionWhereInput => {
  const whereCollectionIsPublic = {
    isPublic: true,
  }

  return {
    deleted: null,
    AND: [
      user
        ? {
            OR: [
              // Public
              whereCollectionIsPublic,
              // Created by user
              { ownerId: user.id },
            ],
          }
        : whereCollectionIsPublic,
      where,
    ],
  }
}

const getWhereCollectionsProfileList = (
  profileId: string,
  user?: Pick<SessionUser, 'id'> | null,
) =>
  computeCollectionsListWhereForUser(user, {
    ownerId: profileId,
  })

export const getProfileCollectionsCount = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = getWhereCollectionsProfileList(profileId, user)

  return prismaClient.collection.count({
    where,
  })
}

export const collectionSelect = {
  id: true,
  title: true,
  description: true,
  isPublic: true,
  image: {
    select: {
      id: true,
      altText: true,
    },
  },
  owner: {
    select: {
      id: true,
      name: true,
      firstName: true,
      lastName: true,
      image: { select: { altText: true, id: true } },
    },
  },
  // Resources only for image previews
  resources: {
    select: {
      resource: {
        select: {
          image: { select: { id: true, altText: true } },
        },
      },
    },
    where: {
      resource: {
        deleted: null,
        image: {
          isNot: null,
        },
      },
    },
    take: 3,
  },
  _count: {
    select: {
      resources: {
        where: {
          resource: {
            deleted: null,
          },
        },
      },
    },
  },
} satisfies Prisma.CollectionSelect

export const getProfileCollections = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = getWhereCollectionsProfileList(profileId, user)
  return prismaClient.collection.findMany({
    select: collectionSelect,
    where,
    orderBy: {
      title: 'asc',
    },
  })
}

export type CollectionListItem = Exclude<
  Awaited<ReturnType<typeof getProfileCollections>>,
  null
>[number]