import type { Activite } from '@app/web/cra/activitesQueries'
import type { ActiviteForListQueryResult } from '@app/web/cra/getActivitesForList'

export const prismaActiviteToActiviteModel = (
  prismaActivite: ActiviteForListQueryResult,
): Activite => {
  if (prismaActivite.craCollectif) {
    return {
      type: 'collectif',
      cra: {
        ...prismaActivite.craCollectif,
      },
    }
  }

  if (prismaActivite.craIndividuel) {
    return {
      type: 'individuel',
      cra: {
        ...prismaActivite.craIndividuel,
      },
    }
  }

  if (prismaActivite.craDemarcheAdministrative) {
    return {
      type: 'demarche',
      cra: {
        ...prismaActivite.craDemarcheAdministrative,
      },
    }
  }
  throw new Error('Invalid activity type')
}
