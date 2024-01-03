import { CreateUserInput } from '@app/e2e/e2e/authentication/user.tasks'
import { v4 } from 'uuid'
import { createSlug } from '@app/web/utils/createSlug'

// Unique per cypress run
const slugHash = v4().split('-')[0]

// Unique per givenUser
let slugSuffix = 1

export const givenUser = (data?: Partial<CreateUserInput>) => {
  const name = `${data?.firstName || 'Jean'} ${data?.lastName || 'Biche'}`
  return {
    id: v4(),
    email: `test-${v4()}@example.com`,
    firstName: 'Jean',
    lastName: 'Biche',
    name,
    // eslint-disable-next-line no-plusplus
    slug: `${createSlug(name)}-${slugHash}-${slugSuffix++}`,
    emailVerified: new Date('2023-04-01'),
    isPublic: false,
    collections: {
      create: {
        id: v4(),
        title: 'Mes favoris',
        isFavorites: true,
      },
    },
    ...data,
  } as CreateUserInput & {
    id: string
    email: string
    firstName: string
    lastName: string
    name: string
  } satisfies CreateUserInput
}
