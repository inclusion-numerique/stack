import type { Prisma } from '@prisma/client'
import { givenUser } from '@app/fixtures/givenUser'
import {
  centreSocial,
  mediateque,
  structureEmployeuse,
} from '@app/fixtures/structures'

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
        conseillerNumeriqueId: 'coordinateur-inscription',
      },
    },
  },
  mediateur: {
    connectOrCreate: {
      where: {
        id: '5bf9e0e4-aefd-48da-a1c5-b1d575422c6f',
      },
      create: {
        id: '5bf9e0e4-aefd-48da-a1c5-b1d575422c6f',
        conseillerNumerique: {
          connectOrCreate: {
            where: {
              id: 'fixture-coordinateur-inscription',
            },
            create: {
              id: 'fixture-coordinateur-inscription',
            },
          },
        },
      },
    },
  },
  checkConseillerNumeriqueInscription: new Date(),
}) satisfies Prisma.UserCreateInput

export const coordinateur = givenUser({
  id: '8c8824f0-a10d-4e30-baf0-8d4fab5c7a74',
  profilInscription: 'Coordinateur',
  firstName: 'Coordinateur',
  lastName: 'Inscrit',
  isFixture: true,
  role: 'User',
  checkConseillerNumeriqueInscription: new Date(),
  inscriptionValidee: new Date(),
  lieuxActiviteRenseignes: new Date(),
  structureEmployeuseRenseignee: new Date(),
  coordinateur: {
    connectOrCreate: {
      where: {
        id: '02f9e2f6-61ba-4179-b96d-934b58d6b15e',
      },
      create: {
        id: '02f9e2f6-61ba-4179-b96d-934b58d6b15e',
        conseillerNumeriqueId: 'coordinateur',
      },
    },
  },
  mediateur: {
    connectOrCreate: {
      where: {
        id: 'beb2c7fb-3149-4913-ab3d-67b441616531',
      },
      create: {
        id: 'beb2c7fb-3149-4913-ab3d-67b441616531',
        conseillerNumerique: {
          connectOrCreate: {
            where: {
              id: 'fixture-coordinateur',
            },
            create: {
              id: 'fixture-coordinateur',
            },
          },
        },
      },
    },
  },
})

export const mediateurInscription = givenUser({
  id: '1c8a6a72-c912-4eff-a45f-1252fa09f1b9',
  firstName: 'Médiateur',
  lastName: 'Inscription',
  isFixture: true,
  role: 'User',
  checkConseillerNumeriqueInscription: new Date(),
  mediateur: {
    connectOrCreate: {
      where: {
        id: '77ae444f-574c-4fcc-87cb-4f792725a496',
      },
      create: {
        id: '77ae444f-574c-4fcc-87cb-4f792725a496',
      },
    },
  },
})

export const mediateurSansActivites = givenUser({
  id: 'd3378267-18cf-4b5f-ae1e-9f63c7093ac2',
  firstName: 'Médiateur',
  lastName: 'Sans activités',
  isFixture: true,
  role: 'User',
  checkConseillerNumeriqueInscription: new Date(),
  inscriptionValidee: new Date(),
  lieuxActiviteRenseignes: new Date(),
  structureEmployeuseRenseignee: new Date(),
  mediateur: {
    connectOrCreate: {
      where: {
        id: 'c513c349-46dc-461a-a3dc-a81d53c459b6',
      },
      create: {
        id: 'c513c349-46dc-461a-a3dc-a81d53c459b6',
        enActivite: {
          connectOrCreate: {
            where: {
              id: '10a8ef22-2b40-41cb-a093-ae82686f24b1',
            },
            create: {
              id: '10a8ef22-2b40-41cb-a093-ae82686f24b1',
              structureId: mediateque.id,
            },
          },
        },
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: 'b32c0dea-0ca7-4a52-917a-77663ecc65f9',
      },
      create: {
        id: 'b32c0dea-0ca7-4a52-917a-77663ecc65f9',
        structureId: structureEmployeuse.id,
      },
    },
  },
})

export const mediateurAvecActivite = givenUser({
  id: 'd10844c6-b6de-402a-a68d-f8328b1d1b0c',
  firstName: 'Médiateur',
  lastName: 'Avec activités',
  isFixture: true,
  role: 'User',
  checkConseillerNumeriqueInscription: new Date(),
  inscriptionValidee: new Date(),
  lieuxActiviteRenseignes: new Date(),
  structureEmployeuseRenseignee: new Date(),
  mediateur: {
    connectOrCreate: {
      where: {
        id: '303381cc-3da7-433d-a553-1a5f76465989',
      },
      create: {
        id: '303381cc-3da7-433d-a553-1a5f76465989',
        enActivite: {
          connectOrCreate: {
            where: {
              id: '4bad4ee5-f446-4739-ae93-9974d81aa0c0',
            },
            create: {
              id: '4bad4ee5-f446-4739-ae93-9974d81aa0c0',
              structureId: mediateque.id,
            },
          },
        },
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: '057b286d-ece5-41a7-b770-756cae8b9353',
      },
      create: {
        id: '057b286d-ece5-41a7-b770-756cae8b9353',
        structureId: structureEmployeuse.id,
      },
    },
  },
})

export const mediateurAvecActiviteMediateurId =
  mediateurAvecActivite.mediateur.connectOrCreate.where.id

export const conseillerInscription = givenUser({
  id: '0658cfe9-93aa-4de8-96a1-613452ac82ea',
  firstName: 'Conseiller Num',
  lastName: 'Inscription',
  isFixture: true,
  role: 'User',
  checkConseillerNumeriqueInscription: new Date(),
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
              id: 'conseiller-numerique-inscription',
            },
            create: {
              id: 'conseiller-numerique-inscription',
            },
          },
        },
        enActivite: {
          connectOrCreate: [
            {
              where: {
                id: 'ed40a144-bae0-43fe-9694-3621779d2eca',
              },
              create: {
                id: 'ed40a144-bae0-43fe-9694-3621779d2eca',
                structureId: mediateque.id,
              },
            },
            {
              where: {
                id: '9050bc28-8c5e-46fc-ae21-2be797c6fb73',
              },
              create: {
                id: '9050bc28-8c5e-46fc-ae21-2be797c6fb73',
                structureId: centreSocial.id,
              },
            },
          ],
        },
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: '17a2868d-a690-4004-b4cc-7fe132706ae6',
      },
      create: {
        id: '17a2868d-a690-4004-b4cc-7fe132706ae6',
        structureId: structureEmployeuse.id,
      },
    },
  },
})

export const conseillerNumerique = givenUser({
  id: 'b66d2370-4245-4492-a630-02749a98237d',
  firstName: 'Conseiller Num',
  lastName: 'Inscrit',
  isFixture: true,
  role: 'User',
  profilInscription: 'ConseillerNumerique',
  checkConseillerNumeriqueInscription: new Date(),
  structureEmployeuseRenseignee: new Date(),
  lieuxActiviteRenseignes: new Date(),
  inscriptionValidee: new Date(),
  mediateur: {
    connectOrCreate: {
      where: {
        id: '1ae07d95-316c-489f-893a-d17052c883b7',
      },
      create: {
        id: '1ae07d95-316c-489f-893a-d17052c883b7',
        conseillerNumerique: {
          connectOrCreate: {
            where: {
              id: 'conseiller-numerique-inscrit',
            },
            create: {
              id: 'conseiller-numerique-inscrit',
            },
          },
        },
        enActivite: {
          connectOrCreate: [
            {
              where: {
                id: '86643b16-de10-421e-b056-d820994572d1',
              },
              create: {
                id: '86643b16-de10-421e-b056-d820994572d1',
                structureId: mediateque.id,
              },
            },
            {
              where: {
                id: 'ef672b71-807b-41a6-9aca-3fac76478616',
              },
              create: {
                id: 'ef672b71-807b-41a6-9aca-3fac76478616',
                structureId: centreSocial.id,
              },
            },
          ],
        },
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: '4ee97bab-74eb-4776-b222-0ac40ed0f445',
      },
      create: {
        id: '4ee97bab-74eb-4776-b222-0ac40ed0f445',
        structureId: structureEmployeuse.id,
      },
    },
  },
})

export const conseillerSansLieuInscription = givenUser({
  id: 'be15e33d-e07d-4d17-85fb-48dddbad9a5d',
  firstName: 'Conseiller Num',
  lastName: 'Sans Lieu Inscription',
  isFixture: true,
  role: 'User',
  checkConseillerNumeriqueInscription: new Date(),
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

export const fixtureUsers = [
  administrateur,
  coordinateurInscription,
  coordinateur,
  conseillerInscription,
  conseillerSansLieuInscription,
  conseillerNumerique,
  mediateurInscription,
  mediateurSansActivites,
  mediateurAvecActivite,
]

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
