import { Prisma } from '@prisma/client'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const formulairesTerminesWhere = {
  annulation: null,
  demonstration: PublicWebAppConfig.isMain ? undefined : false,
  confirmeEtEnvoye: {
    not: null,
  },
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
      {
        commune: {
          departement: {
            codeRegion,
          },
        },
      },
    ],
  }) satisfies Prisma.FormulaireGouvernanceWhereInput

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
      {
        commune: {
          codeDepartement,
        },
      },
    ],
  }) satisfies Prisma.FormulaireGouvernanceWhereInput
