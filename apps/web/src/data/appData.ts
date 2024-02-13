import { prismaClient } from '@app/web/prismaClient'

/**
 * Get global app data
 */
export const getAppData = () =>
  prismaClient.appData.findUniqueOrThrow({
    where: {
      id: 'app-data',
    },
  })
