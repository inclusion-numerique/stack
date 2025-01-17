import { SessionUser } from '@app/web/auth/sessionUser'
import {
  createAccount,
  getUserRdvApiData,
  userToRdvApiInput,
} from '@app/web/external-apis/rdv/rdvApi'
import { prismaClient } from '@app/web/prismaClient'

export const createRdvServicePublicAccount = async ({
  user,
}: {
  user: Pick<SessionUser, 'id' | 'rdvAccount'>
}) => {
  console.log('creating rdv service public account for user', user)

  const userData = await getUserRdvApiData({
    userId: user.id,
  })

  if (!userData) {
    throw new Error('User data not found for rdv account creation')
  }

  const accountApiInput = userToRdvApiInput(userData)

  const account = await createAccount({
    input: accountApiInput,
  })

  const userRdvAccount = user.rdvAccount
    ? await prismaClient.rdvAccount.update({
        where: {
          id: user.rdvAccount.id,
        },
        data: {
          id: account.id,
        },
      })
    : await prismaClient.rdvAccount.create({
        data: {
          id: account.id,
          userId: user.id,
        },
      })

  return userRdvAccount
}
