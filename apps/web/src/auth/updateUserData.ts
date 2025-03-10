import { prismaClient } from '@app/web/prismaClient'

export const updateUserData = async ({
  userId,
  firstName,
  lastName,
}: {
  userId: string
  firstName: string
  lastName: string
}) => {
  await prismaClient.user.update({
    data: {
      firstName,
      lastName,
    },
    where: {
      id: userId,
    },
  })
}
