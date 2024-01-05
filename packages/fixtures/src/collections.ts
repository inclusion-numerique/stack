import type { Prisma } from '@prisma/client'
import { users } from '@app/fixtures/users'

const favoritesCollections = users.map(
  (user) =>
    ({
      id: user.id,
      title: 'Mes favoris',
      ownerId: user.id,
      isPublic: false,
      isFavorites: true,
    }) satisfies Prisma.CollectionCreateManyInput,
)

export const collections = [...favoritesCollections]
