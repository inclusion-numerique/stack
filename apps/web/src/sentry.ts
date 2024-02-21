import * as Sentry from '@sentry/nextjs'
import { Replay } from '@sentry/browser'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const initializeSentry = ({ replay }: { replay?: boolean } = {}) => {
  if (!PublicWebAppConfig.Sentry.dsn || process.env.NODE_ENV !== 'production') {
    return
  }

  Sentry.init({
    dsn: PublicWebAppConfig.Sentry.dsn,
    environment: PublicWebAppConfig.Sentry.environment,
    tracesSampleRate: 1,
    integrations: replay ? [new Replay()] : [],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
  })
}
