import { cache } from 'react'
import { notFound } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'

/**
 * Small cached getter for departement basic info for layouts and pages
 */
export const getDepartementNameAndCode = cache((codeDepartement: string) =>
  prismaClient.departement
    .findUnique({
      where: {
        code: codeDepartement,
      },
      select: {
        code: true,
        nom: true,
      },
    })
    .then((departement) => {
      if (!departement) {
        notFound()
      }
      return departement
    }),
)
