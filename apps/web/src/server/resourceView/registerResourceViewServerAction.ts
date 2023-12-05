'use server'

import { v4 } from 'uuid'
import * as Sentry from '@sentry/nextjs'
import { prismaClient } from '@app/web/prismaClient'
import { getOrCreateVisitHashFromCookies } from '@app/web/server/visitHash/getOrCreateVisitHashFromCookies'

export const registerResourceViewServerAction = async ({
  resourceId,
  userId,
}: {
  resourceId: string
  userId?: string
}) => {
  const visitHash = getOrCreateVisitHashFromCookies()
  console.log('REGISTERING', { visitHash })

  const existingView = await prismaClient.resourceView.findFirst({
    where: { hash: visitHash, resourceId },
    select: { id: true },
  })
  if (existingView) {
    return
  }
  await prismaClient.resourceView.create({
    data: {
      id: v4(),
      hash: visitHash,
      userId,
      resourceId,
      timestamp: new Date(),
    },
    select: {
      id: true,
    },
  })
}

export const nonBlockingRegisterResourceViewServerAction = ({
  resourceId,
  userId,
}: {
  resourceId: string
  userId?: string
}) => {
  registerResourceViewServerAction({ resourceId, userId }).catch((error) => {
    console.error('Error registering resource view', error)
    Sentry.captureException(error)
  })
}
