import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const GET = () =>
  new Response(
    JSON.stringify({ status: 'ok', publicConfiguration: PublicWebAppConfig }),
    { headers: { 'Content-Type': 'application/json' } },
  )
