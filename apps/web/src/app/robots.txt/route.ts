import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

// Disallow indexing of preview environments
export const GET = () =>
  PublicWebAppConfig.isMain
    ? new Response(`User-agent: *
Allow: /
`)
    : new Response(`User-agent: *
Disallow: /
`)
