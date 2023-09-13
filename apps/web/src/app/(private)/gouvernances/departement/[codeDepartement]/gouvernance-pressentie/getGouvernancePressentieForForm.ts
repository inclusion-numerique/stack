import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

const collectiviteSelect = {
  select: {
    nom: true,
    code: true,
  },
}

export const gouvernanceSelect = {
  id: true,

  createur: {
    select: {
      id: true,
      email: true,
      name: true,
    },
  },
  derniereModificationPar: {
    select: {
      id: true,
      email: true,
      name: true,
    },
  },

  creation: true,
  modification: true,

  departement: collectiviteSelect,

  perimetre: true,

  noteDeContexte: true,

  porteurRegion: collectiviteSelect,
  porteurDepartement: collectiviteSelect,
  porteurEpci: collectiviteSelect,

  porteurSiretInformations: {
    select: {
      siret: true,
    },
  },

  organisationsRecruteusesCoordinateurs: {
    select: {
      id: true,
      siretInformations: {
        select: {
          siret: true,
        },
      },
    },
  },
} satisfies Prisma.GouvernanceSelect

export const getGouvernancePressentieForForm = (id: string) =>
  prismaClient.gouvernance.findUnique({
    where: {
      id,
      supression: null,
    },
    select: gouvernanceSelect,
  })
