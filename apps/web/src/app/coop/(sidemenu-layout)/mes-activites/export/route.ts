import type { NextRequest } from 'next/server'
import { z } from 'zod'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { ActivitesFilterValidations } from '@app/web/cra/ActivitesFilters'
import { buildActivitesWorksheet } from '@app/web/worksheet/activites/buildActivitesWorksheet'
import { getActivitesWorksheetInput } from '@app/web/worksheet/activites/getActivitesWorksheetInput'
import type { MediateurUser } from '@app/web/auth/userTypeGuards'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ExportActivitesValidation = z
  .object({
    // If you want to filter by a specific mediateur, you can add it here
    // By default this will export for current user if he is a mediateur
    mediateur: z.string().uuid().optional(),
  })
  .extend(ActivitesFilterValidations)

export const GET = async (request: NextRequest) => {
  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  if (!user.mediateur) {
    return new Response('Forbidden', {
      status: 403,
    })
  }

  // Do not know why but TS does not understand user.mediateur is not null after previous check
  const typedUser = user as MediateurUser

  const parsedQueryParams = ExportActivitesValidation.safeParse(
    Object.fromEntries(request.nextUrl.searchParams.entries()),
  )

  if (parsedQueryParams.error) {
    return new Response('Invalid query params', {
      status: 400,
    })
  }

  const { mediateur: exportForMediateurId, ...filters } = parsedQueryParams.data

  // For now we only support exporting for current user
  if (exportForMediateurId && exportForMediateurId !== user.mediateur.id) {
    return new Response('Cannot export for another mediateur', {
      status: 403,
    })
  }

  const activitesWorksheetInput = await getActivitesWorksheetInput({
    user: typedUser,
    filters,
  })

  const workbook = buildActivitesWorksheet(activitesWorksheetInput)

  const data = await workbook.xlsx.writeBuffer()

  const filename = `coop-numerique_activites_${dateAsIsoDay(new Date())}.xlsx`

  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
