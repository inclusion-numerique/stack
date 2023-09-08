import { Prisma } from '@prisma/client'

export const formulairesTerminesWhere = {
  annulation: null,
  demonstration: false,
  confirmeEtEnvoye: {
    not: null,
  },
  intention: 'Porter',
} satisfies Prisma.FormulaireGouvernanceWhereInput

export const formulairesPorteurTerminesWhere = {
  ...formulairesTerminesWhere,
  intention: 'Porter',
} satisfies Prisma.FormulaireGouvernanceWhereInput

export const formulairesParticiperTerminesWhere = {
  ...formulairesTerminesWhere,
  intention: 'Participer',
} satisfies Prisma.FormulaireGouvernanceWhereInput

export const formulairesDansRegionWhere = (codeRegion: string) =>
  ({
    OR: [
      {
        departement: {
          codeRegion,
        },
      },
      {
        regionCode: codeRegion,
      },
      {
        epci: {
          communes: {
            some: {
              departement: {
                codeRegion,
              },
            },
          },
        },
      },
    ],
  } satisfies Prisma.FormulaireGouvernanceWhereInput)

export const formulairesDansDepartementWhere = (codeDepartement: string) =>
  ({
    OR: [
      {
        departementCode: codeDepartement,
      },
      {
        region: {
          departements: {
            some: {
              code: codeDepartement,
            },
          },
        },
      },
      {
        epci: {
          communes: {
            some: {
              codeDepartement,
            },
          },
        },
      },
    ],
  } satisfies Prisma.FormulaireGouvernanceWhereInput)
