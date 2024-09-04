import type { Activite } from '@prisma/client'

export const createModifierActiviteLink = (
  { id, type }: Pick<Activite, 'type' | 'id'>,
  { retour }: { retour?: string } = {},
) => {
  const retourQueryParam = retour ? `?retour=${retour}` : ''

  if (type === 'Demarche') {
    return `/coop/mes-activites/cra/administratif/${id}${retourQueryParam}`
  }

  if (type === 'Individuel') {
    return `/coop/mes-activites/cra/individuel/${id}${retourQueryParam}`
  }

  if (type === 'Collectif') {
    return `/coop/mes-activites/cra/collectif/${id}${retourQueryParam}`
  }

  throw new Error('Invalid activity type for modifier link')
}
