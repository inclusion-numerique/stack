import Cookies from 'js-cookie'
import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'
import { lastVisitedGouvernanceScopeCookie } from '@app/web/app/lastVisitedGouvernanceScopeCookie'

export const setLastVisitedGouvernanceScope = (
  scope: GouvernanceScope | null,
) => {
  Cookies.set(lastVisitedGouvernanceScopeCookie, JSON.stringify(scope), {
    sameSite: 'strict',
  })
}
