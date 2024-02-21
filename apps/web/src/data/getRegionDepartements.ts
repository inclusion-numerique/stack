import { cache } from 'react'
import { notFound } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'

/**
 * Small cached getter for region basic info for layouts and pages
 */
export const getRegionDepartements = cache((codeRegion: string) =>
  prismaClient.region
    .findUnique({
      where: {
        code: codeRegion,
      },
      select: {
        nom: true,
        departements: {
          select: {
            code: true,
            nom: true,
          },
        },
      },
    })
    .then((region) => {
      if (!region) {
        notFound()
      }
      return region
    }),
)
