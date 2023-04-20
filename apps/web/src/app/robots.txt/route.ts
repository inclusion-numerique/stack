import { ServerWebAppConfig } from '@app/web/webAppConfig'

// Disallow indexing of preview environments
export const GET = () =>
  ServerWebAppConfig.isMain
    ? new Response(`User-agent: *
Allow: /
`)
    : new Response(`User-agent: *
Disallow: /
`)
