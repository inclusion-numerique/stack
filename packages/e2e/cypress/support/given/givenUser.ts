import { CreateUserInput } from '@app/e2e/e2e/authentication/user.tasks'
import { v4 } from 'uuid'

export const givenUser = (data?: Partial<CreateUserInput>) =>
  ({
    id: v4(),
    email: `test-${v4()}@example.com`,
    firstName: 'Jean',
    lastName: 'Biche',
    name: `${data?.firstName || 'Jean'} ${data?.lastName || 'Biche'}`,
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
  }) as CreateUserInput & {
    id: string
    email: string
    firstName: string
    lastName: string
    name: string
  } satisfies CreateUserInput
