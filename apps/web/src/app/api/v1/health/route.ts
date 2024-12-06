import { NextResponse } from 'next/server'
import { apiRoute } from '@app/web/app/api/v1/apiRoute'

/**
 * @openapi
 * /health:
 *   get:
 *     summary: health
 *     description: Returns the server status info in JSON format.
 *     responses:
 *       200:
 *         description: Successful response with a status message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
export const GET = apiRoute(['Cras'], () =>
  Promise.resolve(
    NextResponse.json({
      status: 'ok',
    }),
  ),
)
