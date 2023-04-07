import { ServerWebAppConfig } from '@stack/web/webAppConfig'

export function GET() {
  if (ServerWebAppConfig.isMain) {
    return new Response(`User-agent: *
Allow: /
`)
  }

  // Do not index preview environments
  return new Response(`User-agent: *
Disallow: /
`)
}
