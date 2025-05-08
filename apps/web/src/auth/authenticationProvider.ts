import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

/**
 * Depending on the environment we may have a different provider configuration
 */

// Proconnect is only available in main or dev environments
export const authenticationViaProconnect = !PublicWebAppConfig.isPreview

export const authenticationViaEmailMagicLink = true
