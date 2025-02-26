import { fetchProconnectUserInfosFromV1 } from '@app/web/app/api/proconnect/users.csv/fetchProconnectUserInfosFromV1'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { stringify } from 'csv-stringify/sync'
import { NextRequest } from 'next/server'
import { fetchAccompagnements } from '@app/cli/fetchAccompagnement'
import { fetchAccompagnement } from '@app/web/app/api/ppg/fetchAccompagnement'

/**
 * Cette API permet de télécharger les accompagnements réalisés sur la Coop par les Conums et les médiateurs à une date donnée
 * Cette API est accessible uniquement par un administrateur
 */
export const GET = async (request: NextRequest) => {
  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (user?.role !== 'Admin') {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const searchParams = request.nextUrl.searchParams
  const dateParam = searchParams.get('date')
  const date = dateParam ?? undefined

  const data_conum = await fetchAccompagnement('conseiller-numerique', date)
  const data_mediateur = await fetchAccompagnement('mediateur', date)

  if (!data_conum || !data_mediateur) {
    return new Response('No data available', {
      status: 500,
    })
  }

  const header = [
    'Département',
    'Accompagnements conum',
    'Accompagnements médiateur',
  ]
  //add in rows the data from the fetchAccompagnement conseiller-numerique and mediateur on the same row
  const rows = data_conum.map(({ departement, count }) => {
    const mediateur = data_mediateur.find((d) => d.departement === departement)
    return [departement, count, mediateur?.count || 0]
  })

  const csvData = stringify([header, ...rows])

  const filename = date ? `accompagnements-${date}.csv` : 'accompagnements.csv'

  return new Response(csvData, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
