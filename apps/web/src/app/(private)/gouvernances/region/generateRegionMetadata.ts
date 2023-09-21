import { notFound } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'

export const generateRegionMetadata =
  (pageTitle: string) =>
  async ({ params: { codeRegion } }: { params: { codeRegion: string } }) => {
    const region = await prismaClient.region.findUnique({
      where: {
        code: codeRegion,
      },
      select: {
        code: true,
        nom: true,
      },
    })
    if (!region) {
      notFound()
    }

    return {
      title: `${region.nom} - ${pageTitle}`,
    }
  }
