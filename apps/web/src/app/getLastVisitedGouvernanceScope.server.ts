import { cookies } from 'next/headers'
import { lastVisitedGouvernanceScopeCookie } from '@app/web/app/lastVisitedGouvernanceScopeCookie'
import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

export const getLastVisitedGouvernanceScopeServer = () => {
  const cookie = cookies().get(lastVisitedGouvernanceScopeCookie)

  if (!cookie) {
    return null
  }
  try {
    return JSON.parse(cookie.value) as GouvernanceScope
  } catch {
    return null
  }
}
