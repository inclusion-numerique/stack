'use server'

import { redirect } from 'next/navigation'
import { getSessionToken } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { serverAction403 } from '@app/web/app/serverActionHelpers'

export const terminerUsurpation = async () => {
  const sessionToken = getSessionToken()
  if (!sessionToken) {
    return serverAction403()
  }
  const session = await prismaClient.session.findUnique({
    where: { sessionToken },
  })

  if (!session || !session.usurperId) {
    return serverAction403()
  }

  const usurper = await prismaClient.user.findUnique({
    where: { id: session.usurperId },
    select: {
      id: true,
      role: true,
    },
  })

  if (!usurper || usurper?.role !== 'Admin') {
    return serverAction403()
  }

  await prismaClient.session.update({
    where: {
      sessionToken,
    },
    data: {
      userId: usurper.id,
      usurperId: null,
    },
  })

  redirect('/administration/usurpation')
}
