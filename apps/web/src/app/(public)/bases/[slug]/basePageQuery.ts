import { prismaClient } from '@app/web/prismaClient'

export const basePageQuery = async (slug: string) =>
  prismaClient.base.findUnique({
    where: { slug },
  })

export type BasePageData = Exclude<
  Awaited<ReturnType<typeof basePageQuery>>,
  null
>
