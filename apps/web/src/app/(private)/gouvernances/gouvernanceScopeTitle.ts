import { cache } from 'react'
import { prismaClient } from '@app/web/prismaClient'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

export const getGouvernanceScopeTitle = cache((scope: GouvernanceScope) =>
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
          .then(({ nom }) => nom),
)
