import { prismaClient } from '@app/web/prismaClient'
import type { GouvernanceScope } from '@app/web/app/(private)/gouvernances/gouvernancePaths'

export const getGouvernanceScopeTitle = (scope: GouvernanceScope) =>
  scope.national
    ? 'National'
    : scope.codeRegion
      ? prismaClient.region
          .findUniqueOrThrow({
            where: { code: scope.codeRegion },
            select: {
              nom: true,
            },
          })
          .then(({ nom }) => nom)
      : prismaClient.departement
          .findUniqueOrThrow({
            where: { code: scope.codeDepartement },
            select: {
              nom: true,
            },
          })
          .then(({ nom }) => nom)
