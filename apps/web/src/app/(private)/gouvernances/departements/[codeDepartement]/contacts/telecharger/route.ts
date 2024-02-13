import { NextRequest } from 'next/server'
import { telechargerContacts } from '@app/web/app/(private)/gouvernances/telechargerContacts'
import { checkUserAccessToGouvernanceScopeForApiResponse } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeForApiResponse'
import { GouvernanceScope } from '@app/web/app/(private)/gouvernances/gouvernancePaths'

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

  const check = await checkUserAccessToGouvernanceScopeForApiResponse(scope)

  if (!check) {
    return new Response(null, { status: 403 })
  }

  return telechargerContacts(scope)
}
