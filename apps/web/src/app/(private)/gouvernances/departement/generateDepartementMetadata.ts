import { notFound } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'

export const generateDepartementMetadata =
  (pageTitle: string) =>
  async ({
    params: { codeDepartement },
  }: {
    params: { codeDepartement: string }
  }) => {
    const departement = await prismaClient.departement.findUnique({
      where: {
        code: codeDepartement,
      },
      select: {
        code: true,
        nom: true,
      },
    })
    if (!departement) {
      notFound()
    }

    return {
      title: `${departement.nom} - ${pageTitle}`,
    }
  }
