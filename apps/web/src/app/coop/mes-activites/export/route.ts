import { NextRequest } from 'next/server'
import { z } from 'zod'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { ActivitesFilterValidations } from '@app/web/cra/ActivitesFilters'
import { buildActivitesWorksheet } from '@app/web/worksheet/buildActivitesWorksheet'
import { getActivitesWorksheetInput } from '@app/web/worksheet/getActivitesWorksheetInput'
import { AuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ExportActivitesValidation = z
  .object({
    // If you want to filter by a specific mediateur, you can add it here
    // By default this will export for current user if he is a mediateur
    mediateur: z.string().uuid().optional(),
  })
  .extend(ActivitesFilterValidations)

// We resize and convert images to webp on the fly and cache the result.
export const GET = async (request: NextRequest) => {
  // Log all query params
  console.log(request.nextUrl.searchParams)

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
  const typedUser = user as AuthenticatedMediateur

  // Validate zod safe parese the query params into an object using ExportActivitesValidation
  const parsedQueryParams = ExportActivitesValidation.safeParse(
    request.nextUrl.searchParams,
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
