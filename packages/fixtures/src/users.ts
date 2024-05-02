import type { Prisma } from '@prisma/client'
import { givenUser } from '@app/fixtures/givenUser'

export const administrateur = givenUser({
  id: 'bd74893d-34fc-4d21-bfea-fe31b99b66a0',
  firstName: 'Administrateur',
  lastName: 'Test',
  isFixture: true,
  role: 'Admin',
}) satisfies Prisma.UserCreateInput

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
        conseillerNumeriqueId: 'conseiller-numerique-id-1',
      },
    },
  },
}) satisfies Prisma.UserCreateInput

export const conseillerInscription = givenUser({
  id: '0658cfe9-93aa-4de8-96a1-613452ac82ea',
  firstName: 'Conseiller Num',
  lastName: 'Inscription',
  isFixture: true,
  role: 'User',
  mediateur: {
    connectOrCreate: {
      where: {
        id: 'b119ef9d-5732-4429-8138-5452fe248497',
      },
      create: {
        id: 'b119ef9d-5732-4429-8138-5452fe248497',
        conseillerNumerique: {
          connectOrCreate: {
            where: {
              id: 'conseiller-numerique-id-2',
            },
            create: {
              id: 'conseiller-numerique-id-2',
            },
          },
        },
      },
    },
  },
})

export const mediateurInscription = givenUser({
  id: '1c8a6a72-c912-4eff-a45f-1252fa09f1b9',
  firstName: 'Mediateur',
  lastName: 'Inscription',
  isFixture: true,
  role: 'User',
  mediateur: {
    connectOrCreate: {
      where: {
        id: '2b4046b4-ed67-4605-922e-5c084953a9a1',
      },
      create: {
        id: '2b4046b4-ed67-4605-922e-5c084953a9a1',
      },
    },
  },
})

export const coordinateurEtConseillerInscription = givenUser({
  id: '79dd751a-2dad-4ced-8b20-4caf7773cbe7',
  firstName: 'Coordinateur & Conseiller',
  lastName: 'Inscription',
  isFixture: true,
  role: 'User',
  coordinateur: {
    connectOrCreate: {
      where: {
        id: 'af997779-e3ff-41d0-b8bc-ecb41b1913da',
      },
      create: {
        id: 'af997779-e3ff-41d0-b8bc-ecb41b1913da',
        conseillerNumeriqueId: 'conseiller-numerique-id-3',
      },
    },
  },
  mediateur: {
    connectOrCreate: {
      where: {
        id: '77fa489e-f6cb-4d37-9a84-9f0e359490a2',
      },
      create: {
        id: '77fa489e-f6cb-4d37-9a84-9f0e359490a2',
        conseillerNumerique: {
          connectOrCreate: {
            where: {
              id: 'conseiller-numerique-id-4',
            },
            create: {
              id: 'conseiller-numerique-id-4',
            },
          },
        },
      },
    },
  },
})

export const teamAdministrateurs = [
  givenUser({
    id: '99afd613-9d54-4110-9062-065c627eda8a',
    firstName: 'Hugues',
    lastName: 'Maignol',
    email: 'hugues.maignol@beta.gouv.fr',
    role: 'Admin',
  }),
  givenUser({
    id: 'eecac657-f415-47e1-8087-c4508ea16191',
    firstName: 'Marc',
    lastName: 'Gavanier',
    email: 'marc.gavanier@beta.gouv.fr',
    role: 'Admin',
  }),
  givenUser({
    id: '8e3c9cdc-3125-4c2e-a49e-796903e9989e',
    firstName: 'Thibault',
    lastName: 'Rouveyrol',
    email: 'thibault.rouveyrol@beta.gouv.fr',
    role: 'Admin',
  }),
  givenUser({
    id: '50439602-1437-443e-b6d0-25d96e21d60c',
    firstName: 'Manon',
    lastName: 'Galle',
    email: 'manon.galle@anct.gouv.fr',
    role: 'Admin',
  }),
  givenUser({
    id: '7d4ca05b-369b-4b3b-b42b-fc01a64c62d0',
    email: 'vincent.jarrige@beta.gouv.fr',
    firstName: 'Vincent',
    lastName: 'Jarrige',
    role: 'Admin',
  }),
  givenUser({
    id: '7faedd26-8603-4309-a614-062bba9161d8',
    email: 'sylvain.aubry@beta.gouv.fr',
    firstName: 'Sylvain',
    lastName: 'Aubry',
    role: 'Admin',
  }),
] satisfies Prisma.UserCreateInput[]

export const fixtureUsers = [
  administrateur,
  coordinateurInscription,
  conseillerInscription,
  mediateurInscription,
  coordinateurEtConseillerInscription,
]
