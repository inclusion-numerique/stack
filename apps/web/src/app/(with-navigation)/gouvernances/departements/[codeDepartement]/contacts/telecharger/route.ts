import { NextRequest } from 'next/server'
import { telechargerContacts } from '@app/web/app/(with-navigation)/gouvernances/telechargerContacts'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const GET = async (
  _request: NextRequest,
  {
    params: { codeDepartement },
  }: {
    params: { codeDepartement: string }
  },
) => {
  const scope: GouvernanceScope = { codeDepartement }

  const { access } = await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { codeDepartement }, user }),
    signinNextPath: `/gouvernances/departements/${codeDepartement}/contacts`,
    redirect: false,
    throwNotFound: false,
  })

  if (!access) {
    return new Response(null, { status: 403 })
  }

  return telechargerContacts(scope)
}
