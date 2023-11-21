import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

const collectiviteSelect = {
  select: {
    nom: true,
    code: true,
  },
}

const siretInfoSelect = {
  select: {
    siret: true,
    nom: true,
    modification: true,
    creation: true,
  },
}

const membreSelect = {
  select: {
    id: true,
    modification: true,
    creation: true,
    region: collectiviteSelect,
    departement: collectiviteSelect,
    epci: collectiviteSelect,
    nomStructure: true,
    siret: true,
    siretInformations: siretInfoSelect,
    coporteur: true,
    formulaireGouvernanceId: true,
  },
}

export const gouvernanceListSelect = {
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

  v2Enregistree: true,
  noteDeContexte: true,

  organisationsRecruteusesCoordinateurs: {
    select: {
      id: true,
      siretInformations: siretInfoSelect,
    },
  },

  besoinsEnIngenierieFinanciere: {
    select: {
      id: true,
      creation: true,
      modification: true,
      selectionEnregistree: true,
      priorisationEnregistree: true,
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
    },
  },

  // V1 Fields
  v1Perimetre: true,

  v1PorteurRegion: collectiviteSelect,
  v1PorteurDepartement: collectiviteSelect,
  v1PorteurEpci: collectiviteSelect,

  v1PorteurSiretInformations: {
    select: {
      siret: true,
    },
  },
} satisfies Prisma.GouvernanceSelect

export const gouvernanceSelect = {
  ...gouvernanceListSelect,

  comites: {
    select: {
      id: true,
      modification: true,
      creation: true,
      type: true,
      typeAutrePrecisions: true,
      frequence: true,
      commentaire: true,
    },
    orderBy: {
      creation: 'asc',
    },
  },

  membres: {
    select: membreSelect.select,
    orderBy: {
      creation: 'asc',
    },
  },
  pasDeCoporteurs: true,

  feuillesDeRoute: {
    select: {
      id: true,
      modification: true,
      creation: true,
      nom: true,
      contratPreexistant: true,
      typeContrat: true,
      typeContratAutreDescription: true,

      membres: {
        select: {
          role: true,
          membre: membreSelect,
        },
      },

      perimetreRegion: collectiviteSelect,
      perimetreDepartement: collectiviteSelect,
      perimetreEpcis: {
        select: {
          epci: collectiviteSelect,
        },
        orderBy: {
          epciCode: 'asc',
        },
      },
    },
    orderBy: {
      creation: 'asc',
    },
  },

  sousPrefetReferentPrenom: true,
  sousPrefetReferentNom: true,
  sousPrefetReferentEmail: true,
} satisfies Prisma.GouvernanceSelect

export const getGouvernanceForForm = (id: string) =>
  prismaClient.gouvernance.findUnique({
    where: {
      id,
      supression: null,
    },
    select: gouvernanceSelect,
  })

export type GouvernanceForForm = Exclude<
  Awaited<ReturnType<typeof getGouvernanceForForm>>,
  null
>

export const getBesoinsIngenierieFinanciereForForm = ({
  gouvernanceId,
}: {
  gouvernanceId: string
}) =>
  prismaClient.gouvernance.findUnique({
    where: {
      id: gouvernanceId,
      supression: null,
    },
    select: {
      id: true,
      departement: {
        select: {
          nom: true,
          code: true,
        },
      },
      besoinsEnIngenierieFinanciere: true,
    },
  })

export type BesoinsIngenierieFinanciereForForm = Exclude<
  Awaited<ReturnType<typeof getBesoinsIngenierieFinanciereForForm>>,
  null
>
