import * as uuid from 'uuid'
import { prismaClient } from '@app/web/prismaClient'

export type CreateUserInput = Parameters<
  typeof prismaClient.user.create
>[0]['data']
export const createUser = async (user: CreateUserInput) =>
  prismaClient.user.create({ data: user })

export const createCoordinateurFor = async ({ email }: { email: string }) => {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: { email },
    select: { id: true },
  })

  return prismaClient.coordinateur.create({
    data: {
      id: uuid.v4(),
      userId: user.id,
    },
  })
}

export const deleteUser = async (user: { email: string }) => {
  const exists = await prismaClient.user.findUnique({
    where: user,
    select: { id: true },
  })
  if (!exists) {
    return null
  }
  await prismaClient.user.delete({ where: user })

  return null
}

export const createSession = async ({ email }: { email: string }) => {
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)

  const created = await prismaClient.session.create({
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
  const exists = await prismaClient.session.findUnique({
    where: { sessionToken },
  })
  if (!exists) {
    return null
  }
  await prismaClient.session.delete({ where: { sessionToken } })
  return null
}
