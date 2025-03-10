import { prismaClient } from '@app/web/prismaClient'

export const updateUserData = async ({
  userId,
  firstName,
  lastName,
  phone,
}: {
  userId: string
  firstName: string
  lastName: string
  phone: string | null
}) => {
  await prismaClient.user.update({
    data: {
      firstName,
      lastName,
      phone,
      name: `${firstName} ${lastName}`,
    },
    where: {
      id: userId,
    },
  })
}
