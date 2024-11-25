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
  ApiEntreprise: {
    // Documentation
    // https://api.gouv.fr/documentation/api-entreprise
    // https://entreprise.api.gouv.fr/developpeurs
    // We have access to these 3 APIs:
    // https://entreprise.api.gouv.fr/catalogue/djepva/associations
    // https://entreprise.api.gouv.fr/catalogue/insee/unites_legales
    // https://entreprise.api.gouv.fr/catalogue/insee/unites_legales_diffusibles
    token: process.env.API_ENTREPRISE_TOKEN ?? '',
    // Public staging token (only for testing purposes)
    stagingToken:
      'eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJqdGkiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY29wZXMiOlsidXB0aW1lIiwiYXNzb2NpYXRpb25zIiwib3Blbl9kYXRhIiwiYXR0ZXN0YXRpb25zX2FnZWZpcGgiLCJwcm9idHAiLCJjb3Rpc2F0aW9uc19wcm9idHAiLCJhdHRlc3RhdGlvbnNfZmlzY2FsZXMiLCJhdHRlc3RhdGlvbl9maXNjYWxlX2RnZmlwIiwiYXR0ZXN0YXRpb25zX3NvY2lhbGVzIiwiYXR0ZXN0YXRpb25fc29jaWFsZV91cnNzYWYiLCJiaWxhbnNfZW50cmVwcmlzZV9iZGYiLCJiaWxhbnNfYmRmIiwiZm50cF9jYXJ0ZV9wcm8iLCJjZXJ0aWZpY2F0X2NuZXRwIiwiY2VydGlmaWNhdGlvbl9jbmV0cCIsImNlcnRpZmljYXRfb3BxaWJpIiwicXVhbGliYXQiLCJjZXJ0aWZpY2F0X3JnZV9hZGVtZSIsImRvY3VtZW50c19hc3NvY2lhdGlvbiIsImVudHJlcHJpc2VzIiwidW5pdGVzX2xlZ2FsZXNfZXRhYmxpc3NlbWVudHNfaW5zZWUiLCJldGFibGlzc2VtZW50cyIsImV4ZXJjaWNlcyIsImNoaWZmcmVfYWZmYWlyZXNfZGdmaXAiLCJleHRyYWl0c19yY3MiLCJsaWFzc2VfZmlzY2FsZSIsImxpYXNzZXNfZmlzY2FsZXNfZGdmaXAiLCJjZXJ0aWZpY2F0aW9uc19xdWFsaW9waV9mcmFuY2VfY29tcGV0ZW5jZXMiLCJlb3JpX2RvdWFuZXMiLCJjb252ZW50aW9uc19jb2xsZWN0aXZlcyIsIm1hbmRhdGFpcmVzX3NvY2lhdXhfaW5mb2dyZWZmZSIsImFjdGVzX2lucGkiLCJleHRyYWl0X2NvdXJ0X2lucGkiLCJhc3NvY2lhdGlvbnNfZG9ubmVlc19wcm90ZWdlZXMiLCJhc3NvY2lhdGlvbnNfZGplcHZhIiwibXNhX2NvdGlzYXRpb25zIiwiY290aXNhdGlvbnNfbXNhIiwiY2VydGlmaWNhdGlvbl9vcHFpYmkiLCJlbnRyZXByaXNlc19hcnRpc2FuYWxlcyIsImVmZmVjdGlmc191cnNzYWYiLCJjbmFmX3F1b3RpZW50X2ZhbWlsaWFsIiwiY25hZl9hbGxvY2F0YWlyZXMiLCJjbmFmX2VuZmFudHMiLCJjbmFmX2FkcmVzc2UiLCJjb21wbGVtZW50YWlyZV9zYW50ZV9zb2xpZGFpcmUiLCJjbm91c19zdGF0dXRfYm91cnNpZXIiLCJjbm91c19lY2hlbG9uX2JvdXJzZSIsImNub3VzX2VtYWlsIiwiY25vdXNfcGVyaW9kZV92ZXJzZW1lbnQiLCJjbm91c19zdGF0dXRfYm91cnNlIiwiY25vdXNfdmlsbGVfZXR1ZGVzIiwiY25vdXNfaWRlbnRpdGUiLCJkZ2ZpcF9kZWNsYXJhbnQxX25vbSIsImRnZmlwX2RlY2xhcmFudDFfbm9tX25haXNzYW5jZSIsImRnZmlwX2RlY2xhcmFudDFfcHJlbm9tcyIsImRnZmlwX2RlY2xhcmFudDFfZGF0ZV9uYWlzc2FuY2UiLCJkZ2ZpcF9kZWNsYXJhbnQyX25vbSIsImRnZmlwX2RlY2xhcmFudDJfbm9tX25haXNzYW5jZSIsImRnZmlwX2RlY2xhcmFudDJfcHJlbm9tcyIsImRnZmlwX2RlY2xhcmFudDJfZGF0ZV9uYWlzc2FuY2UiLCJkZ2ZpcF9kYXRlX3JlY291dnJlbWVudCIsImRnZmlwX2RhdGVfZXRhYmxpc3NlbWVudCIsImRnZmlwX2FkcmVzc2VfZmlzY2FsZV90YXhhdGlvbiIsImRnZmlwX2FkcmVzc2VfZmlzY2FsZV9hbm5lZSIsImRnZmlwX25vbWJyZV9wYXJ0cyIsImRnZmlwX25vbWJyZV9wZXJzb25uZXNfYV9jaGFyZ2UiLCJkZ2ZpcF9zaXR1YXRpb25fZmFtaWxpYWxlIiwiZGdmaXBfcmV2ZW51X2JydXRfZ2xvYmFsIiwiZGdmaXBfcmV2ZW51X2ltcG9zYWJsZSIsImRnZmlwX2ltcG90X3JldmVudV9uZXRfYXZhbnRfY29ycmVjdGlvbnMiLCJkZ2ZpcF9tb250YW50X2ltcG90IiwiZGdmaXBfcmV2ZW51X2Zpc2NhbF9yZWZlcmVuY2UiLCJkZ2ZpcF9hbm5lZV9pbXBvdCIsImRnZmlwX2FubmVlX3JldmVudXMiLCJkZ2ZpcF9lcnJldXJfY29ycmVjdGlmIiwiZGdmaXBfc2l0dWF0aW9uX3BhcnRpZWxsZSIsIm1lc3JpX2lkZW50aWZpYW50IiwibWVzcmlfaWRlbnRpdGUiLCJtZXNyaV9pbnNjcmlwdGlvbl9ldHVkaWFudCIsIm1lc3JpX2luc2NyaXB0aW9uX2F1dHJlIiwibWVzcmlfYWRtaXNzaW9uIiwibWVzcmlfZXRhYmxpc3NlbWVudHMiLCJwb2xlX2VtcGxvaV9pZGVudGl0ZSIsInBvbGVfZW1wbG9pX2FkcmVzc2UiLCJwb2xlX2VtcGxvaV9jb250YWN0IiwicG9sZV9lbXBsb2lfaW5zY3JpcHRpb24iLCJwb2xlX2VtcGxvaV9wYWllbWVudHMiLCJtZW5fc3RhdHV0X3Njb2xhcml0ZSIsIm1lbl9zdGF0dXRfYm91cnNpZXIiLCJtZW5fZWNoZWxvbl9ib3Vyc2UiXSwic3ViIjoic3RhZ2luZyBkZXZlbG9wbWVudCIsImlhdCI6MTY5MzkwNTAyNCwidmVyc2lvbiI6IjEuMCIsImV4cCI6MjAwOTUyNDIyNH0.uKkMeXNmzwaultKAuS6l1o9StrZky-mY7XLTzygdut4',
  },
  ConseillerNumerique: {
    mongodbUrl: process.env.CONSEILLER_NUMERIQUE_MONGODB_URL ?? '',
  },
  // Local development only
  Sudo: {
    usurpation: process.env.SUDO_USURPATION === '1' || false,
  },
  Rdv: {
    apiKey: process.env.RDV_API_KEY ?? '',
  },
  Security: {
    hmacSecretKey: process.env.HMAC_SECRET_KEY ?? '',
  },
}
