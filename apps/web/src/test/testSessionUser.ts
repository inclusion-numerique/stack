import { SessionUser } from '@app/web/auth/sessionUser'

export const testSessionUser = {
  id: 'test',
  email: 'jean.biche@example.com',
  firstName: 'Jean',
  lastName: 'Biche',
  name: 'Jean Biche',
  updated: new Date('2023-05-05').toISOString(),
  created: new Date('2023-01-01').toISOString(),
  emailVerified: null,
  role: 'User',
  isFixture: false,
  usurper: null,
  coordinateur: null,
  emplois: [],
  inscriptionValidee: null,
  lieuxActiviteRenseignes: null,
  mediateur: null,
  profilInscription: null,
  structureEmployeuseRenseignee: null,
} satisfies SessionUser
