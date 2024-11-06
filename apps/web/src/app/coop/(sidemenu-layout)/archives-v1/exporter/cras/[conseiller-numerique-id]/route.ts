import { NextRequest } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { getConseillerNumeriqueCras } from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'
import { buildArchivesCrasV1Worksheet } from '@app/web/worksheet/archivesCrasV1/buildArchivesCrasV1Worksheet'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'

export const GET = async (request: NextRequest) => {
  const conseillerNumeriqueId = request.nextUrl.pathname.split('/').pop()

  if (!conseillerNumeriqueId) {
    return new Response('Missing conseiller numerique id', { status: 400 })
  }

  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const conseillerNumerique = await prismaClient.conseillerNumerique.findUnique(
    {
      where: {
        id: conseillerNumeriqueId,
      },
      include: {
        mediateur: {
          include: {
            user: true,
          },
        },
      },
    },
  )

  if (!conseillerNumerique) {
    return new Response('Conseiller numerique not found', { status: 404 })
  }

  // TODO Security rule for this access for admins/support etc ?
  // Can only access own CRAs
  if (user.id !== conseillerNumerique.mediateur?.user?.id) {
    return new Response('Forbidden', { status: 403 })
  }

  const v1Cras = await getConseillerNumeriqueCras({
    conseillerNumeriqueId,
  })

  if (v1Cras.empty) {
    return new Response('No CRAs found', { status: 404 })
  }

  const workbook = buildArchivesCrasV1Worksheet({
    v1Cras,
  })

  const data = await workbook.xlsx.writeBuffer()

  const filename = `coop-numerique_archives-cras-v1_${dateAsIsoDay(new Date())}.xlsx`

  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
