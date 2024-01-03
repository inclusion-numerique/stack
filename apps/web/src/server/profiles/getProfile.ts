import { prismaClient } from '@app/web/prismaClient'
import { imageCropSelect } from '@app/web/server/image/imageCropSelect'

export const getProfilePageQuery = async (
  id: string,
  user: { id: string } | null,
) =>
  prismaClient.user.findUnique({
    select: {
      id: true,
      slug: true,
      name: true,
      firstName: true,
      lastName: true,
      image: {
        select: {
          id: true,
          altText: true,
          ...imageCropSelect,
          upload: {
            select: {
              name: true,
              size: true,
              mimeType: true,
            },
          },
        },
      },
      followedBy: {
        where: {
          followerId: user?.id,
        },
        select: {
          id: true,
        },
      },
      isPublic: true,
      email: true,
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
    where: { id },
  })

export type ProfilePageData = Exclude<
  Awaited<ReturnType<typeof getProfilePageQuery>>,
  null
>
