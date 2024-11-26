import { NextRequest, NextResponse } from 'next/server'
import { apiV1Version } from '@app/web/app/api/v1/apiV1Version'
import { apiRoute } from '@app/web/app/api/v1/apiRoute'

export const GET = apiRoute(['Cras'], (request: NextRequest) =>
  Promise.resolve(
    NextResponse.json({
      status: 'ok',
      version: apiV1Version,
    }),
  ),
)
