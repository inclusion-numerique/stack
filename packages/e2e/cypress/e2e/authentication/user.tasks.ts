import * as uuid from 'uuid'
import { cypressPrismaClient } from '../../support/cypressPrismaClient'

export type CreateUserInput = Parameters<
  typeof cypressPrismaClient.user.create
>[0]['data']
export const createUser = async (user: CreateUserInput) =>
  cypressPrismaClient.user.create({ data: user })

export const deleteUser = async (user: { email: string }) => {
  const exists = await cypressPrismaClient.user.findUnique({
    where: user,
    select: { id: true },
  })
  if (!exists) {
    return null
  }
  await cypressPrismaClient.user.delete({ where: user })

  return null
}

export const createSession = async ({ email }: { email: string }) => {
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)

  const created = await cypressPrismaClient.session.create({
    data: {
      id: uuid.v4(),
      sessionToken: uuid.v4(),
      expires,
      user: {
        connect: { email },
      },
    },
  })

  return created
}
export const deleteSession = async (sessionToken: string) => {
  const exists = await cypressPrismaClient.session.findUnique({
    where: { sessionToken },
  })
  if (!exists) {
    return null
  }
  await cypressPrismaClient.session.delete({ where: { sessionToken } })
  return null
}
