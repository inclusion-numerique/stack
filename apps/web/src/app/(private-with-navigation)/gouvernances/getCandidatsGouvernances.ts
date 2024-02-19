import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import {
  formulairesDansDepartementWhere,
  formulairesDansRegionWhere,
  formulairesParticiperTerminesWhere,
  formulairesPorteurTerminesWhere,
} from '@app/web/app/(private-with-navigation)/gouvernances/gouvernanceQueryHelpers'

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

const candidatsGouvernancePorteurSelect = {
  id: true,
  schemaOuGouvernanceLocale: true,
  confirmeEtEnvoye: true,
  gouvernancePersona: true,
  region: collectiviteSelect,
  departement: collectiviteSelect,
  epci: collectiviteSelect,
  contactPolitique: contactSelect,
  contactTechnique: contactSelect,
  departementsParticipants: {
    select: {
      id: true,
      departement: collectiviteSelect,
      contact: contactSelect,
    },
  },
  epcisParticipantes: {
    select: {
      id: true,
      epci: collectiviteSelect,
      contact: contactSelect,
    },
  },
  communesParticipantes: {
    select: {
      id: true,
      commune: communeSelect,
      contact: contactSelect,
    },
  },
  structuresParticipantes: {
    select: {
      id: true,
      nomStructure: true,
      contact: contactSelect,
    },
  },
} satisfies Prisma.FormulaireGouvernanceSelect

const candidatsGouvernanceParticipantSelect = {
  id: true,
  confirmeEtEnvoye: true,
  gouvernancePersona: true,
  nomStructure: true,
  siretStructure: true,
  region: collectiviteSelect,
  departement: collectiviteSelect,
  epci: collectiviteSelect,
  commune: communeSelect,
  contactPolitique: contactSelect,
  contactTechnique: contactSelect,
  contactStructure: contactSelect,
} satisfies Prisma.FormulaireGouvernanceSelect

const queryCandidats = (where?: Prisma.FormulaireGouvernanceWhereInput) =>
  Promise.all([
    // Candidats pour les porteurs
    prismaClient.formulaireGouvernance.findMany({
      where: {
        ...formulairesPorteurTerminesWhere,
        ...where,
      },
      select: candidatsGouvernancePorteurSelect,
      orderBy: {
        confirmeEtEnvoye: 'desc',
      },
    }),
    // Candidats pour les "souhaite participer"
    prismaClient.formulaireGouvernance.findMany({
      where: {
        ...formulairesParticiperTerminesWhere,
        ...where,
      },
      select: candidatsGouvernanceParticipantSelect,
      orderBy: {
        confirmeEtEnvoye: 'desc',
      },
    }),
  ]).then(([porteurs, participer]) => ({
    porteurs,
    souhaitentParticiper: {
      collectivites: participer.filter(
        ({ gouvernancePersona }) => gouvernancePersona !== 'structure',
      ),
      structures: participer.filter(
        ({ gouvernancePersona }) => gouvernancePersona === 'structure',
      ),
    },
  }))

export type CandidatsGouvernance = Awaited<ReturnType<typeof queryCandidats>>

export const getCandidatsGouvernanceNational = async () => queryCandidats()

export const getCandidatsGouvernanceRegion = async (codeRegion: string) =>
  queryCandidats(formulairesDansRegionWhere(codeRegion))

export const getCandidatsGouvernanceDepartement = async (
  codeDepartement: string,
) => queryCandidats(formulairesDansDepartementWhere(codeDepartement))
