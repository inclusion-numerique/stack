import * as Sentry from '@sentry/nextjs'
import { Replay } from '@sentry/browser'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const initializeSentry = ({ replay }: { replay?: boolean } = {}) => {
  Sentry.init({
    dsn: PublicWebAppConfig.Sentry.dsn,
    environment: PublicWebAppConfig.Sentry.environment,
    tracesSampleRate: 0.05,
    integrations: replay ? [new Replay()] : [],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
  })
}
