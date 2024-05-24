import { prismaClient } from '@app/web/prismaClient'

export const getResourceSelect = (user: { id: string } | null) =>
  ({
    id: true,
    title: true,
    description: true,
    excerpt: true,
    slug: true,
    published: true,
    lastPublished: true,
    deleted: true,
    created: true,
    updated: true,
    isPublic: true,
    createdById: true,
    legacyId: true,
    publicFeedback: true,
    resourceFeedback: {
      where: {
        deleted: null,
      },
      select: {
        rating: true,
        comment: true,
        created: true,
        updated: true,
        sentById: true,
        resourceId: true,
        sentBy: {
          select: {
            firstName: true,
            lastName: true,
            name: true,
            image: {
              select: {
                id: true,
                altText: true,
              },
            },
          },
        },
      },
    },
    createdBy: {
      select: {
        name: true,
        id: true,
        slug: true,
        isPublic: true,
        firstName: true,
        lastName: true,
        image: {
          select: {
            id: true,
            altText: true,
          },
        },
      },
    },
    baseId: true,
    collections: {
      select: {
        collectionId: true,
      },
      where: {
        collection: {
          createdById: user?.id,
        },
      },
    },
    base: {
      select: {
        id: true,
        title: true,
        slug: true,
        isPublic: true,
        members: {
          select: {
            accepted: true,
            memberId: true,
            isAdmin: true,
          },
        },
        image: {
          select: {
            id: true,
            altText: true,
          },
        },
      },
    },
    contributors: {
      select: {
        contributorId: true,
      },
      orderBy: {
        added: 'asc',
      },
    },
    imageId: true,
    image: {
      select: {
        id: true,
        altText: true,
      },
    },
    themes: true,
    supportTypes: true,
    targetAudiences: true,
    contents: {
      select: {
        id: true,
        title: true,
        type: true,
        caption: true,
        imageId: true,
        imageAltText: true,
        image: {
          select: {
            id: true,
            altText: true,
            width: true,
            height: true,
            upload: {
              select: {
                key: true,
                name: true,
              },
            },
          },
        },
        fileKey: true,
        file: {
          select: {
            mimeType: true,
            key: true,
            name: true,
            size: true,
          },
        },
        order: true,
        showPreview: true,
        url: true,
        linkDescription: true,
        linkTitle: true,
        linkImageUrl: true,
        linkFaviconUrl: true,
        text: true,
      },
      orderBy: { order: 'asc' },
    },
    _count: {
      select: {
        collections: true,
        views: true,
      },
    },
  }) satisfies Parameters<typeof prismaClient.resource.findUnique>[0]['select']

export const getResource = async (
  where: { slug: string } | { id: string },
  user: { id: string } | null,
) => {
  const resource = await prismaClient.resource.findFirst({
    select: getResourceSelect(user),
    where: {
      ...where,
      deleted: null,
      OR: [
        {
          base: {
            deleted: null,
          },
        },
        { base: null },
      ],
    },
  })

  if (resource == null) return resource

  const aggregate = await prismaClient.resourceFeedback.aggregate({
    where: { resourceId: resource.id, deleted: null },
    _avg: { rating: true },
    _count: { rating: true },
  })

  return {
    ...resource,
    feedbackCount: aggregate._count.rating ?? 0,
    feedbackAverage: aggregate._avg.rating ?? 0,
  }
}

export type Resource = Exclude<Awaited<ReturnType<typeof getResource>>, null>
export type ResourceContent = Resource['contents'][number]
