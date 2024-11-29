import { NextRequest } from 'next/server'
import { stringify } from 'csv-stringify/sync'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { fetchProconnectUserInfosFromV1 } from '@app/web/app/api/proconnect/users.csv/fetchProconnectUserInfosFromV1'

/**
 * Cette API permet de télécharger les emails et structure autorisées à accéder à la coop
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

  // Will be an array of rows to be exported
  const data = await fetchProconnectUserInfosFromV1()

  const header = [
    'Id',
    'Prénom',
    'Nom',
    'Email pro',
    'Téléphone',
    'Structure id',
    'Structure siret',
    'Structure nom',
  ]

  const usersDataArray = data.users.map((row) => [
    row.id,
    row.prenom,
    row.nom,
    row.emailPro,
    row.telephone,
    row.structureId,
    row.structureSiret,
    row.structureNom,
  ])

  const csvData = stringify([header, ...usersDataArray])

  return new Response(csvData, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="proconnect_users.csv"`,
    },
  })
}
