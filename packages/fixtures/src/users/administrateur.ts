import type { Prisma } from '@prisma/client'
import { givenUser } from '../givenUser'

export const administrateur = givenUser({
  id: 'bd74893d-34fc-4d21-bfea-fe31b99b66a0',
  firstName: 'Administrateur',
  lastName: 'Test',
  isFixture: true,
  role: 'Admin',
}) satisfies Prisma.UserCreateInput
