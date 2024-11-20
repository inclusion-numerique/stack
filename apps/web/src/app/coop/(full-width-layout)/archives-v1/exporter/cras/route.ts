import { NextRequest } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { buildArchivesCrasV1Worksheet } from '@app/web/worksheet/archivesCrasV1/buildArchivesCrasV1Worksheet'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { getArchivesV1PageData } from '@app/web/app/coop/(full-width-layout)/archives-v1/getArchivesV1PageData'
import { GetCrasConseillerNumeriqueV1InputValidation } from '@app/web/v1/GetCrasConseillerNumeriqueV1Input'

export const GET = async (request: NextRequest) => {
  // parse url search params as object with zod
  const parsedInput = GetCrasConseillerNumeriqueV1InputValidation.safeParse(
    Object.fromEntries(request.nextUrl.searchParams.entries()),
  )

  if (!parsedInput.success) {
    return new Response(JSON.stringify(parsedInput.error), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const input = parsedInput.data

  if (input.conseillerNumeriqueV1Id) {
    const conseillerNumerique =
      await prismaClient.conseillerNumerique.findUnique({
        where: {
          id: input.conseillerNumeriqueV1Id,
        },
        include: {
          mediateur: {
            include: {
              user: true,
            },
          },
        },
      })

    if (!conseillerNumerique) {
      return new Response('Conseiller numerique not found', { status: 404 })
    }
  }

  if (input.coordinateurV1Id) {
    const coordinateur = await prismaClient.coordinateur.findUnique({
      where: {
        conseillerNumeriqueId: input.coordinateurV1Id,
      },
    })

    if (!coordinateur) {
      return new Response('Coordinateur not found', { status: 404 })
    }
  }

  // TODO Security rule for this access for coordo/admins/support etc
  // Can only access own CRAs
  if (
    input.conseillerNumeriqueV1Id &&
    user.mediateur?.conseillerNumerique?.id !== input.conseillerNumeriqueV1Id
  ) {
    return new Response('Forbidden', { status: 403 })
  }
  if (
    input.coordinateurV1Id &&
    user.coordinateur?.conseillerNumeriqueId !== input.coordinateurV1Id
  ) {
    return new Response('Forbidden', { status: 403 })
  }

  const data = await getArchivesV1PageData(input)

  if (data.empty) {
    return new Response('No CRAs found', { status: 404 })
  }

  const workbook = buildArchivesCrasV1Worksheet(data)

  const workbookData = await workbook.xlsx.writeBuffer()

  const filename = `coop-numerique_archives-cras-v1_${dateAsIsoDay(new Date())}.xlsx`

  return new Response(workbookData, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
