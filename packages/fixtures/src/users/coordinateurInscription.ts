import type { Prisma } from '@prisma/client'
import { givenUser } from '../givenUser'
import { structureEmployeuse } from '../structures'

export const coordinateurInscription = givenUser({
  id: '0d4e2e67-ac69-4955-b227-8f4f2ef34673',
  firstName: 'Coordinateur',
  lastName: 'Inscription',
  isFixture: true,
  role: 'User',
  coordinateur: {
    connectOrCreate: {
      where: {
        id: '2e4d546c-9312-4ac1-a771-a6ec48180136',
      },
      create: {
        id: '2e4d546c-9312-4ac1-a771-a6ec48180136',
        conseillerNumeriqueId: 'coordinateur-inscription',
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: 'c9501fea-d9de-4020-9763-59e5ccd41275',
      },
      create: {
        id: 'c9501fea-d9de-4020-9763-59e5ccd41275',
        structureId: structureEmployeuse.id,
      },
    },
  },
}) satisfies Prisma.UserCreateInput
