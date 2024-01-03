import { CreateUserInput } from '@app/e2e/e2e/authentication/user.tasks'
import { v4 } from 'uuid'
import { createSlug } from '@app/web/utils/createSlug'

export const givenUser = (data?: Partial<CreateUserInput>) => {
  const name = `${data?.firstName || 'Jean'} ${data?.lastName || 'Biche'}`
  return {
    id: v4(),
    email: `test-${v4()}@example.com`,
    firstName: 'Jean',
    lastName: 'Biche',
    name,
    slug: createSlug(name),
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
