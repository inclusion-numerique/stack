import { cache } from 'react'
import { prismaClient } from '@app/web/prismaClient'

/**
 * Get global app data
 */
export const getAppData = cache(() =>
  prismaClient.appData.findUniqueOrThrow({
    where: {
      id: 'app-data',
    },
  }),
)
