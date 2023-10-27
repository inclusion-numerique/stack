import { PublicWebAppConfig } from '@app/web/webAppConfig'

export const loginIntents = ['enregistrer-ressource-dans-collection'] as const

export type LoginIntent = (typeof loginIntents)[number]
export const loginUrl = ({
  intent,
  next,
}: {
  intent?: LoginIntent
  next?: string
}) => {
  const queryParams = []

  if (intent) {
    queryParams.push(`intention=${encodeURIComponent(intent)}`)
  }

  if (next) {
    queryParams.push(`suivant=${encodeURIComponent(next)}`)
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''

  return `/connexion${queryString}`
}

export const defaultLoginTitle = `Connexion à ${PublicWebAppConfig.projectTitle}`
export const loginTitles: { [intent in LoginIntent]: string } = {
  'enregistrer-ressource-dans-collection':
    'Connectez vous pour enregistrer une ressource dans une collection',
}

export const getLoginTitle = (intent?: string | string[] | null) => {
  if (typeof intent !== 'string') {
    return defaultLoginTitle
  }

  if (intent in loginTitles) {
    return loginTitles[intent as LoginIntent]
  }

  return defaultLoginTitle
}

export type LoginSearchParams = {
  intention?: LoginIntent
  suivant?: string
}
