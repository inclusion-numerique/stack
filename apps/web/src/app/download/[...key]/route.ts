import { GetObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { s3 } from '@app/web/server/s3/s3'
import { sessionTokenFromRequestCookies } from '@app/web/security/authentication'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })
export const GET = async (request: NextRequest) => {
  // Key is the path without first directory name "/download/"
  const key = decodeURIComponent(
    request.nextUrl.pathname.replace(/^\/download\//, ''),
  )
  const download = request.nextUrl.searchParams.has('download')

  if (!key) {
    return notFoundResponse()
  }
  const upload = await prismaClient.upload.findUnique({
    where: { key },
    select: {
      key: true,
      legacyKey: true,
      mimeType: true,
      name: true,
      uploadedById: true,
      pieceJointeBudgetSubvention: {
        select: {
          feuilleDeRoute: {
            select: {
              gouvernance: {
                select: {
                  departement: {
                    select: {
                      code: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  if (!upload) {
    return notFoundResponse()
  }

  // If upload is linked to gouvernance, we check scope
  if (
    upload.pieceJointeBudgetSubvention?.feuilleDeRoute.gouvernance.departement
      .code
  ) {
    const sessionToken = sessionTokenFromRequestCookies(request.cookies)
    const user = sessionToken
      ? await getSessionUserFromSessionToken(sessionToken)
      : null

    const hasAccess = await checkGouvernanceScopeWriteAccess({
      user,
      scope: {
        codeDepartement:
          upload.pieceJointeBudgetSubvention.feuilleDeRoute.gouvernance
            .departement.code,
      },
    })
    if (!hasAccess) {
      return new Response('Not authorized', {
        status: 403,
      })
    }
  }

  // Content-Disposition: attachment; filename="filename.pdf"
  const object = await s3.send(
    new GetObjectCommand({
      Bucket: ServerWebAppConfig.S3.uploadsBucket,
      Key: upload.key,
    }),
  )

  if (!object.Body) {
    throw new Error('Stored file not found')
  }

  const dispositionHeaderValue = `${
    download ? 'attachment' : 'inline'
  }; filename="${upload.name}"`

  return new Response(object.Body.transformToWebStream(), {
    status: 200,
    headers: {
      'Content-Type': upload.mimeType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': dispositionHeaderValue,
    },
  })
}
