import { givenUser } from '../givenUser'
import { structureEmployeuse } from '../structures'

export const conseillerSansLieuInscription = givenUser({
  id: 'be15e33d-e07d-4d17-85fb-48dddbad9a5d',
  firstName: 'Conseiller Num',
  lastName: 'Sans Lieu Inscription',
  isFixture: true,
  role: 'User',
  mediateur: {
    connectOrCreate: {
      where: {
        id: '01b4db6b-457f-4fa3-a1b2-3a78c9db60d5',
      },
      create: {
        id: '01b4db6b-457f-4fa3-a1b2-3a78c9db60d5',
        conseillerNumerique: {
          connectOrCreate: {
            where: {
              id: 'conseiller-numerique-sans-lieu-inscription',
            },
            create: {
              id: 'conseiller-numerique-sans-lieu-inscription',
            },
          },
        },
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: '3e45dfd3-a73d-4e52-acc1-892283642e07',
      },
      create: {
        id: '3e45dfd3-a73d-4e52-acc1-892283642e07',
        structureId: structureEmployeuse.id,
      },
    },
  },
})
