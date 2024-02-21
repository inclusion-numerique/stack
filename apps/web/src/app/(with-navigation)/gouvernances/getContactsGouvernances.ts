import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import {
  formulairesDansDepartementWhere,
  formulairesDansRegionWhere,
  formulairesTerminesWhere,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernanceQueryHelpers'

const collectiviteSelect = {
  select: {
    code: true,
    nom: true,
  },
}

const contactSelect = {
  select: {
    nom: true,
    prenom: true,
    email: true,
    fonction: true,
  },
}

const communeSelect = {
  select: {
    code: true,
    nom: true,
    codesPostaux: {
      select: {
        codePostal: {
          select: {
            code: true,
          },
        },
      },
    },
  },
}

const selectId = {
  select: {
    id: true,
  },
}

const queryContacts = (where?: Prisma.FormulaireGouvernanceWhereInput) =>
  prismaClient.contactFormulaireGouvernance.findMany({
    where: {
      formulaireGouvernance: {
        ...formulairesTerminesWhere,
        intention: {
          not: null,
        },
        ...where,
      },
    },
    select: {
      id: true,
      ...contactSelect.select,
      contactPolitique: selectId,
      contactTechnique: selectId,
      contactStructure: selectId,
      contactDepartementParticipant: {
        select: {
          departement: collectiviteSelect,
        },
      },
      contactEpciParticipant: {
        select: {
          epci: collectiviteSelect,
        },
      },
      contactCommuneParticipante: {
        select: {
          commune: communeSelect,
        },
      },
      contactStructureParticipante: {
        select: {
          nomStructure: true,
        },
      },
      formulaireGouvernance: {
        select: {
          id: true,
          confirmeEtEnvoye: true,
          gouvernancePersona: true,
          nomStructure: true,
          intention: true,
          siretStructure: true,
          region: collectiviteSelect,
          departement: collectiviteSelect,
          epci: collectiviteSelect,
          commune: communeSelect,
        },
      },
    },
    orderBy: {
      formulaireGouvernance: {
        confirmeEtEnvoye: 'desc',
      },
    },
  })

export type ContactsGouvernance = Awaited<ReturnType<typeof queryContacts>>

export const getContactsGouvernanceNational = async () => queryContacts()

export const getContactsGouvernanceRegion = async (codeRegion: string) =>
  queryContacts(formulairesDansRegionWhere(codeRegion))

export const getContactsGouvernanceDepartement = async (
  codeDepartement: string,
) => queryContacts(formulairesDansDepartementWhere(codeDepartement))
