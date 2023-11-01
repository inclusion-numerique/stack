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

  departement: {
    select: {
      code: true,
      nom: true,
      codeRegion: true,
    },
  },

  v1Perimetre: true,

  noteDeContexte: true,

  v1PorteurRegion: collectiviteSelect,
  v1PorteurDepartement: collectiviteSelect,
  v1PorteurEpci: collectiviteSelect,

  v1PorteurSiretInformations: {
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

export type GouvernancePressentieForForm = Exclude<
  Awaited<ReturnType<typeof getGouvernancePressentieForForm>>,
  null
>
