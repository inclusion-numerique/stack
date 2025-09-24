// TODO Enable server-only when next-auth (v5) is in app router
// import 'server-only'

/**
 * Only use ServerWebAppConfig on server side
 * It contains secrets that must not be sent to the client
 */
const NodeEnvironment = process.env.NODE_ENV

const emailServer = `smtp://${process.env.SMTP_USERNAME ?? ''}:${
  process.env.SMTP_PASSWORD ?? ''
}@${process.env.SMTP_SERVER ?? ''}:${process.env.SMTP_PORT ?? ''}`

export const ServerWebAppConfig = {
  NodeEnv: NodeEnvironment,
  Namespace: process.env.NAMESPACE ?? '',
  internalApiPrivateKey: process.env.INTERNAL_API_PRIVATE_KEY ?? '',
  Email: {
    server: emailServer,
    from: `${process.env.EMAIL_FROM_NAME ?? ''} <${
      process.env.EMAIL_FROM_ADDRESS ?? ''
    }>`,
  },
  S3: {
    uploadsBucket: process.env.UPLOADS_BUCKET ?? '',
    host: process.env.S3_HOST ?? '',
    region: process.env.SCW_DEFAULT_REGION ?? '',
    accessKey: process.env.SCW_ACCESS_KEY ?? '',
    secretKey: process.env.SCW_SECRET_KEY ?? '',
  },
  Scaleway: {
    region: process.env.SCW_DEFAULT_REGION ?? '',
    accessKey: process.env.SCW_ACCESS_KEY ?? '',
    secretKey: process.env.SCW_SECRET_KEY ?? '',
  },
  Cockpit: {
    metricsUrl: process.env.COCKPIT_METRICS_URL ?? '',
    logsUrl: process.env.COCKPIT_LOGS_URL ?? '',
    alertManagerUrl: process.env.COCKPIT_ALERT_MANAGER_URL ?? '',
    grafanaUrl: process.env.COCKPIT_GRAFANA_URL ?? '',
  },
  ProConnect: {
    clientSecret: process.env.PROCONNECT_CLIENT_SECRET ?? '',
  },
  Database: {
    instanceId: process.env.DATABASE_INSTANCE_ID ?? '', // like fr-par/uuid
  },
  Sentry: {
    authToken: process.env.SENTRY_AUTH_TOKEN ?? '',
    url: process.env.SENTRY_URL ?? '',
    org: process.env.SENTRY_ORG ?? '',
    project: process.env.SENTRY_PROJECT ?? '',
  },
}
