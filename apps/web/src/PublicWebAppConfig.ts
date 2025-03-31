/**
 * Public config can be used on client side or server side
 */
import { mainLiveUrl, projectTitle, repositoryUrl } from '@app/config/config'

const isMain = process.env.BRANCH === 'main'
const isSante = process.env.BRANCH === 'sante'
const isDev = process.env.BRANCH === 'dev'
const isLocal = !process.env.BRANCH
const isE2e = !!process.env.IS_E2E
const isPreview = !isMain && !isDev && !isSante && !isLocal && !isE2e

export const PublicWebAppConfig = {
  centreAideDomaine: 'https://incubateurdesterritoires.notion.site',
  centreAideUrl:
    'https://incubateurdesterritoires.notion.site/Centre-d-aide-de-La-Coop-de-la-m-diation-num-rique-e2db421ac63249769c1a9aa155af5f2f',
  Branch: process.env.BRANCH ?? '',
  isMain,
  isDev,
  isLocal,
  isPreview,
  isSante,
  isE2e,
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
  RdvServicePublic: {
    OAuth: {
      hostname: process.env.NEXT_PUBLIC_RDV_SERVICE_PUBLIC_OAUTH_HOSTNAME ?? '',
      clientId:
        process.env.NEXT_PUBLIC_RDV_SERVICE_PUBLIC_OAUTH_CLIENT_ID ?? '',
    },
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
