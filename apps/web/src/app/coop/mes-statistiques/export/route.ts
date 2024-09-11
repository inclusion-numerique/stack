import { NextRequest } from 'next/server'
import { z } from 'zod'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { ActivitesFilterValidations } from '@app/web/cra/ActivitesFilters'
import { AuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { buildStatistiquesWorksheet } from '@app/web/worksheet/statistiques/buildStatistiquesWorksheet'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getMesStatistiquesPageData } from '../getMesStatistiquesPageData'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ExportActivitesValidation = z
  .object({ mediateur: z.string().uuid().optional() })
  .extend(ActivitesFilterValidations)

const isMediateur = (
  user: SessionUser | null,
): user is AuthenticatedMediateur => user?.mediateur != null

export const GET = async (request: NextRequest) => {
  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  if (!isMediateur(user)) {
    return new Response('Forbidden', { status: 403 })
  }

  const parsedQueryParams = ExportActivitesValidation.safeParse(
    request.nextUrl.searchParams,
  )

  if (parsedQueryParams.error) {
    return new Response('Invalid query params', { status: 400 })
  }

  const { mediateur: exportForMediateurId, ...filters } = parsedQueryParams.data

  if (exportForMediateurId && exportForMediateurId !== user.mediateur.id) {
    return new Response('Cannot export for another mediateur', { status: 403 })
  }

  const statistiques = await getMesStatistiquesPageData({
    mediateurId: user.mediateur.id,
    activitesFilters: filters,
  })

  const workbook = buildStatistiquesWorksheet(new Date())({
    user,
    filters,
    statistiques,
  })

  const data = await workbook.xlsx.writeBuffer()
  const filename = `coop-numerique_statistiques_${dateAsIsoDay(new Date())}.xlsx`

  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
