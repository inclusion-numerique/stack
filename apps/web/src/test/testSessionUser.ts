import { SessionUser } from '@app/web/auth/sessionUser'

export const testSessionUser = {
  id: 'test',
  email: 'jean.biche@example.com',
  firstName: 'Jean',
  lastName: 'Biche',
  name: 'Jean Biche',
  image: null,
  legacyId: null,
  updated: new Date('2023-05-05').toISOString(),
  created: new Date('2023-01-01').toISOString(),
  emailVerified: new Date('2023-01-01').toISOString(),
  isPublic: false,
  ownedBases: [],
  bases: [],
  createdResources: [],
  resources: [],
  collections: [],
  savedCollections: [],
} satisfies SessionUser
