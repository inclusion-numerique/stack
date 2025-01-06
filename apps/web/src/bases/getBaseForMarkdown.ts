import { prismaClient } from '@app/web/prismaClient'

export const getBaseForMarkdown = async (
  input: { slug: string } | { id: string },
) => {
  const base = await prismaClient.base.findUnique({
    where: 'slug' in input ? { slug: input.slug } : { id: input.id },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      department: true,
      email: true,
      emailIsPublic: true,
      website: true,
      facebook: true,
      twitter: true,
      linkedin: true,
      created: true,
      updated: true,
      coverImage: {
        select: {
          id: true,
          altText: true,
          originalHeight: true,
          originalWidth: true,
          cropHeight: true,
          cropWidth: true,
          cropTop: true,
          cropLeft: true,
        },
      },
    },
  })

  return base
}

export type BaseForMarkdown = Exclude<
  Awaited<ReturnType<typeof getBaseForMarkdown>>,
  null
>
