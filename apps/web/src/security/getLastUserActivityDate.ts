import { prismaClient } from '@app/web/prismaClient'

export const getLastUserActivityDate = async ({
  userId,
}: {
  userId: string
}) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      created: true,
      lastLogin: true,
      mutations: {
        select: {
          id: true,
          timestamp: true,
          nom: true,
        },
        orderBy: { timestamp: 'desc' },
        take: 1,
      },
    },
  })

  if (!user) {
    throw new Error('User not found, cannot compute last activity')
  }

  return {
    created: user.created,
    lastLogin: user.lastLogin ?? user.created,
    lastMutation: user.mutations
      ? (user.mutations[0]?.timestamp ?? null)
      : null,
  }
}
