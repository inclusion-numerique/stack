import { NextRequest } from 'next/server'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import { telechargerConvention } from '@app/web/app/(with-navigation)/administration/beneficiaires-subventions/[membreGouvernanceId]/convention.odt/telechargerConvention'
import { getMembreBeneficiaireDataForConvention } from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const GET = async (
  _request: NextRequest,
  {
    params: { membreGouvernanceId },
  }: {
    params: { membreGouvernanceId: string }
  },
) => {
  const conventionData =
    await getMembreBeneficiaireDataForConvention(membreGouvernanceId)

  if (!conventionData) {
    return new Response('Not found', { status: 404 })
  }

  const { access } = await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({
        scope: {
          codeDepartement: conventionData.membre.gouvernance.departement.code,
        },
        user,
      }),
    signinNextPath: `/gouvernances/national/contacts`,
    redirect: false,
    throwNotFound: false,
  })

  if (!access) {
    return new Response(null, { status: 403 })
  }

  return telechargerConvention(conventionData)
}
