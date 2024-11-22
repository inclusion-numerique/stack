import { NextRequest } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { GetCrasConseillerNumeriqueV1QueryParamsValidation } from '@app/web/v1/GetCrasConseillerNumeriqueV1QueryParamsValidation'
import { buildArchivesStatistiquesV1Worksheet } from '@app/web/worksheet/archivesCrasV1/buildArchivesStatistiquesV1Worksheet'
import { getRawStatistiquesCrasV1 } from '@app/web/app/coop/(full-width-layout)/archives-v1/computeStatistiquesCrasV1'
import { getConseillerCoordonnesIds } from '@app/web/v1/v1CraQueries'
import { createSlug } from '@app/web/utils/createSlug'
import { createCommunesClient } from '@app/web/communes/communesClient'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'

export const GET = async (request: NextRequest) => {
  // parse url search params as object with zod
  const parsedInput =
    GetCrasConseillerNumeriqueV1QueryParamsValidation.safeParse(
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

  const filenameScopes: string[] = []

  // Check that user is allowed to access this data (is the coordinateur himself)
  if (input.coordinateur) {
    const coordinateur = await prismaClient.coordinateur.findUnique({
      where: {
        conseillerNumeriqueId: input.coordinateur,
      },
      select: {
        id: true,
        conseillerNumeriqueId: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!coordinateur) {
      return new Response('Coordinateur not found', { status: 404 })
    }

    filenameScopes.push(
      coordinateur.user.name ?? coordinateur.conseillerNumeriqueId,
    )

    if (user.coordinateur?.id !== coordinateur.id) {
      return new Response('Forbidden', { status: 403 })
    }
  }

  // Check that user is allowed to access this data (is the conseiller himself or is its coordinateur)
  // Check in v1 because coordinateur can access v1 conseillers that are not yet in our database
  if (input.conseiller && user.coordinateur) {
    const v1Conseiller = await fetchConseillerNumeriqueV1Data({
      v1ConseillerId: input.conseiller,
    })

    if (!v1Conseiller) {
      return new Response('Conseiller not found', { status: 404 })
    }

    if (
      !v1Conseiller.conseiller.coordinateurs?.find(
        ({ id }) =>
          id.toString('hex') === user.coordinateur?.conseillerNumeriqueId,
      )
    ) {
      return new Response('Forbidden', { status: 403 })
    }

    filenameScopes.push(
      `${v1Conseiller.conseiller.prenom} ${v1Conseiller.conseiller.nom}`,
    )
  }

  // This is a conseiller user, check in our database
  if (input.conseiller && !user.coordinateur) {
    const conseillerNumerique =
      await prismaClient.conseillerNumerique.findUnique({
        where: {
          id: input.conseiller,
        },
        select: {
          id: true,
          mediateur: {
            select: {
              id: true,
              coordinations: {
                select: {
                  coordinateurId: true,
                },
              },
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      })

    if (!conseillerNumerique) {
      return new Response('Forbidden', { status: 403 })
    }

    if (conseillerNumerique.mediateur.user.id !== user.id) {
      return new Response('Forbidden', { status: 403 })
    }

    filenameScopes.push(
      conseillerNumerique?.mediateur.user.name ?? input.conseiller,
    )
  }

  if (!input.conseiller && !input.coordinateur && !input.commune) {
    return new Response(
      'Invalid statistics scope (commune, conseiller or coordinateur needed)',
      {
        status: 400,
      },
    )
  }

  const conseillerNumeriqueIds = input.conseiller
    ? // We scope the stats to the conseiller if given
      [input.conseiller]
    : // We scope to conseiller coordonnées
      input.coordinateur
      ? await getConseillerCoordonnesIds({
          coordinateurV1Id: input.coordinateur,
          includeCoordinateur: true,
        })
      : []

  if (!conseillerNumeriqueIds || conseillerNumeriqueIds.length === 0) {
    return new Response('No conseillers found', { status: 404 })
  }

  const stats = await getRawStatistiquesCrasV1({
    conseillerNumeriqueIds,
    codeCommune: input.commune,
  })

  if (!stats) {
    return new Response('No CRAs found', { status: 404 })
  }

  if (input.commune) {
    const communeClient = await createCommunesClient()
    const commune = communeClient.findCommuneByInsee(input.commune)
    filenameScopes.push(commune?.nom ?? input.commune)
  }

  let workbookScope = filenameScopes.join(' - ')

  if (input.coordinateur) {
    workbookScope += ` - Coordination`
  }

  const workbook = buildArchivesStatistiquesV1Worksheet({
    stats,
    scopeTitle: workbookScope,
  })

  const workbookData = await workbook.xlsx.writeBuffer()

  const exportScopeTitle = filenameScopes.map(createSlug).join('_')
  const filename = `coop-numerique_archives-v1_statistiques_${exportScopeTitle}_${dateAsIsoDay(new Date())}.xlsx`

  return new Response(workbookData, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
