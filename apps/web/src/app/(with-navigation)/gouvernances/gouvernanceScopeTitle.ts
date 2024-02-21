import { cache } from 'react'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'
import { getRegionNameAndCode } from '@app/web/data/getRegionNameAndCode'
import { getDepartementNameAndCode } from '@app/web/data/getDepartementNameAndCode'

export const getGouvernanceScopeTitle = cache((scope: GouvernanceScope) =>
  scope.codeRegion
    ? getRegionNameAndCode(scope.codeRegion).then(({ nom }) => nom)
    : scope.codeDepartement
      ? getDepartementNameAndCode(scope.codeDepartement).then(({ nom }) => nom)
      : 'National',
)
