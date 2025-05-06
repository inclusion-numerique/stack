import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const dynamic = 'force-static'

// Disallow indexing of preview environments
export const GET = () =>
  PublicWebAppConfig.isMain
    ? new Response(`User-agent: *
Allow: /
`)
    : new Response(`User-agent: *
Disallow: /
`)
