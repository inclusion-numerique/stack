import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  ActivitesFilterValidations,
  ActivitesFilters,
} from '@app/web/cra/ActivitesFilters'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { buildStatistiquesWorksheet } from '@app/web/worksheet/statistiques/buildStatistiquesWorksheet'
import { getStatistiquesWorksheetInput } from '@app/web/worksheet/statistiques/getStatistiquesWorksheetInput'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ExportActivitesValidation = z.object(ActivitesFilterValidations)

const toMediateurId = ({ mediateurId }: { mediateurId: string }) => mediateurId

const disallowExportFor =
  (user: SessionUser) => (exportForMediateurIds?: string[]) =>
    exportForMediateurIds &&
    user.mediateur?.id &&
    !exportForMediateurIds.includes(user.mediateur.id) &&
    !exportForMediateurIds.some((id) =>
      user.coordinateur?.mediateursCoordonnes.map(toMediateurId).includes(id),
    )

export const GET = async (request: NextRequest) => {
  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  if (!user.mediateur && !user.coordinateur) {
    return new Response('Forbidden', { status: 403 })
  }

  const parsedQueryParams = ExportActivitesValidation.safeParse(
    Object.fromEntries(request.nextUrl.searchParams.entries()),
  )

  if (parsedQueryParams.error) {
    return new Response('Invalid query params', { status: 400 })
  }

  const filters = parsedQueryParams.data as ActivitesFilters

  if (disallowExportFor(user)(filters.mediateurs)) {
    return new Response('Cannot export for another mediateur', { status: 403 })
  }

  const statistiquesWorksheetInput = await getStatistiquesWorksheetInput({
    user,
    filters,
  })

  const workbook = buildStatistiquesWorksheet(statistiquesWorksheetInput)

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
