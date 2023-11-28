import { SessionUser } from '@app/web/auth/sessionUser'

export const testSessionUser = {
  id: '06c3d44c-264a-40f5-b122-21b5592eb784',
  email: 'jean.biche@example.com',
  firstName: 'Jean',
  lastName: 'Biche',
  name: 'Jean Biche',
  role: 'Demo',
  roleScope: null,
  updated: new Date('2023-05-05').toISOString(),
  created: new Date('2023-01-01').toISOString(),
  emailVerified: new Date('2023-01-01').toISOString(),
  gouvernancePersona: null,
  formulaireGouvernance: null,
} satisfies SessionUser
