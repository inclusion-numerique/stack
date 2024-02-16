'use client'

import { useEffect } from 'react'
import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'
import { setLastVisitedGouvernanceScope } from '@app/web/app/setLastVisitedGouvernanceScope.client'

const SetLastVisitedGouvernanceScope = ({
  scope,
}: {
  scope: GouvernanceScope
}) => {
  useEffect(() => {
    console.log('SET LAST VISITED SCOPE', scope)
    setLastVisitedGouvernanceScope(scope)
  }, [scope])

  return null
}

export default SetLastVisitedGouvernanceScope
