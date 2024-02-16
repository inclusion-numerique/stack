import Cookies from 'js-cookie'
import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'
import { lastVisitedGouvernanceScopeCookie } from '@app/web/app/lastVisitedGouvernanceScopeCookie'

let lastVisitedGouvernanceScope: GouvernanceScope | null = null

export const setLastVisitedGouvernanceScope = (
  scope: GouvernanceScope | null,
) => {
  lastVisitedGouvernanceScope = scope
  Cookies.set(lastVisitedGouvernanceScopeCookie, JSON.stringify(scope), {
    sameSite: 'strict',
  })
}
