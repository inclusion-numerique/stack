import { v4 } from 'uuid'

export const appUrl = (path: string) => `${Cypress.config().baseUrl}${path}`

export const createTestUser = () => ({
  email: `test-${v4()}@example.com`,
  firstName: 'Jean',
  lastName: 'Biche',
  name: 'Jean Biche',
})
