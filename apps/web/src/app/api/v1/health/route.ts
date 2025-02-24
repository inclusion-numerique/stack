import { createApiV1Route } from '@app/web/app/api/v1/createApiV1Route'
import { NextResponse } from 'next/server'

export type HealthResponse = {
  status: 'ok' | 'error'
}

/**
 * @openapi
 * /health:
 *   get:
 *     summary: health
 *     description: Returns the server status info in JSON format.
 *     tags:
 *       - Utilitaires
 *     responses:
 *       200:
 *         description: API status message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
export const GET = createApiV1Route
  .configure<HealthResponse>({
    scopes: [],
  })
  .handle(() =>
    NextResponse.json({
      status: 'ok',
    }),
  )
