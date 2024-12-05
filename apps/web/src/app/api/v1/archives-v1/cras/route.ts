import { NextRequest, NextResponse } from 'next/server'
import { apiV1Version } from '@app/web/app/api/v1/apiV1Version'
import { apiRoute } from '@app/web/app/api/v1/apiRoute'

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export const GET = apiRoute(['Cras'], (request: NextRequest) =>
  Promise.resolve(
    NextResponse.json({
      status: 'ok',
      version: apiV1Version,
    }),
  ),
)
