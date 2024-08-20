/**
 * Public config can be used on client side or server side
 */
import { mainLiveUrl, projectTitle, repositoryUrl } from '@app/config/config'

export const PublicWebAppConfig = {
  Branch: process.env.BRANCH ?? '',
  isMain: process.env.BRANCH === 'main',
  isDev: process.env.BRANCH === 'dev',
  isLocal: !process.env.BRANCH,
  isPreview:
    !!process.env.BRANCH &&
    process.env.BRANCH !== 'main' &&
    process.env.BRANCH !== 'dev',
  Chromatic: {
    appId: process.env.CHROMATIC_APP_ID ?? '',
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  projectTitle,
  mainLiveUrl,
  repository: repositoryUrl,
  ProConnect: {
    hostname: process.env.NEXT_PUBLIC_PROCONNECT_HOSTNAME ?? '',
    clientId: process.env.NEXT_PUBLIC_PROCONNECT_CLIENT_ID ?? '',
  },
  Sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? 'local',
  },
  Matomo: {
    host: process.env.NEXT_PUBLIC_MATOMO_HOST ?? '',
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? '',
  },
}
