import type { Activite } from '@app/web/cra/activitesQueries'

export const createDupliquerActiviteLink = (
  {
    cra: { id },
    type,
  }: {
    type: Activite['type']
    cra: {
      id: Activite['cra']['id']
    }
  },
  { retour }: { retour?: string } = {},
) => {
  const retourQueryParam = retour ? `?retour=${retour}` : ''

  if (type === 'demarche') {
    return `/coop/mes-activites/cra/administratif/${id}/dupliquer${retourQueryParam}`
  }

  if (type === 'individuel') {
    return `/coop/mes-activites/cra/individuel/${id}/dupliquer${retourQueryParam}`
  }

  if (type === 'collectif') {
    return `/coop/mes-activites/cra/collectif/${id}/dupliquer${retourQueryParam}`
  }

  throw new Error('Invalid activity type for dupliquer link')
}
