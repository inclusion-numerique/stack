import type { CreateUserInput } from '@app/e2e/tasks/handlers/user.tasks'
import { v4 } from 'uuid'

export const appUrl = (path: string) =>
  `${Cypress.config().baseUrl}${encodeURI(path)}`

export const createTestUser = () =>
  ({
    id: v4(),
    email: `test-${v4()}@example.com`,
    firstName: 'Jean',
    lastName: 'Biche',
    name: 'Jean Biche',
    emailVerified: new Date('2023-04-01'),
  }) satisfies CreateUserInput
