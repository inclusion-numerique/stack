import { prismaClient } from '@app/web/prismaClient'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import {
  getActiviteFiltersSqlFragment,
  getActivitesFiltersWhereConditions,
} from '@app/web/cra/activitesFiltersSqlWhereConditions'
import { allocatePercentages } from '@app/web/app/coop/mes-statistiques/_queries/allocatePercentages'

export type AccompagnementsStats = {
  activites: {
    total: number
    individuel: {
      total: number
      proportion: number
    }
    collectifs: {
      total: number
      proportion: number
      participants: number
    }
    demarches: {
      total: number
      proportion: number
    }
  }
  accompagnements: {
    total: number
    individuels: {
      count: number
      proportion: number
    }
    collectifs: {
      count: number
      proportion: number
    }
    demarches: {
      count: number
      proportion: number
    }
  }
  beneficiaires: {
    total: number
    suivis: number
    anonymes: number
  }
}
export const getTotalCountsStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}): Promise<AccompagnementsStats> =>
  prismaClient.$queryRaw<
    [
      {
        total_activites: number
        total_individuels: number
        total_collectifs: number
        total_demarches: number
        total_beneficiaires: number
        total_beneficiaires_suivis: number
        total_accompagnements: number
        total_accompagnements_collectifs: number
      },
    ]
  >`
    SELECT 
        COUNT(DISTINCT activites.id)::integer AS total_activites,
        COUNT(DISTINCT CASE WHEN activites.type = 'individuel' THEN activites.id END)::integer AS total_individuels,
        COUNT(DISTINCT CASE WHEN activites.type = 'collectif' THEN activites.id END)::integer AS total_collectifs,
        COUNT(DISTINCT CASE WHEN activites.type = 'demarche' THEN activites.id END)::integer AS total_demarches,
        COUNT(DISTINCT beneficiaires.id)::integer AS total_beneficiaires,
        COUNT(DISTINCT CASE WHEN beneficiaires.anonyme = false THEN beneficiaires.id END)::integer AS total_beneficiaires_suivis,
        COUNT(DISTINCT accompagnements.id)::integer AS total_accompagnements,
        COUNT(DISTINCT CASE WHEN activites.type = 'collectif' THEN accompagnements.id END)::integer AS total_accompagnements_collectifs
    FROM activites
    LEFT JOIN accompagnements ON accompagnements.activite_id = activites.id
    LEFT JOIN beneficiaires ON beneficiaires.id = accompagnements.beneficiaire_id
    WHERE activites.mediateur_id = ${mediateurId}::UUID
      AND activites.suppression IS NULL
      AND ${getActiviteFiltersSqlFragment(
        getActivitesFiltersWhereConditions(activitesFilters),
      )}
  `.then(([result]) => {
    const [
      proportionActivitesIndividuels,
      proportionActivitesCollectifs,
      proportionActivitesDemarches,
    ] = allocatePercentages([
      result.total_individuels,
      result.total_collectifs,
      result.total_demarches,
    ])

    const [
      proportionAccompagnementsIndividuels,
      proportionAccompagnementsCollectifs,
      proportionAccompagnementsDemarches,
    ] = allocatePercentages([
      result.total_individuels, // Pour individuel, le nb d’accompagnements = nb d’activités
      result.total_accompagnements_collectifs,
      result.total_demarches, // Pour démarches, le nb d’accompagnements = nb d’activités
    ])

    return {
      activites: {
        total: result.total_activites,
        individuel: {
          total: result.total_individuels,
          proportion: proportionActivitesIndividuels,
        },
        collectifs: {
          total: result.total_collectifs,
          proportion: proportionActivitesCollectifs,
          participants: result.total_accompagnements_collectifs,
        },
        demarches: {
          total: result.total_demarches,
          proportion: proportionActivitesDemarches,
        },
      },
      accompagnements: {
        total: result.total_accompagnements,
        individuels: {
          count: result.total_individuels,
          proportion: proportionAccompagnementsIndividuels,
        },
        collectifs: {
          count: result.total_accompagnements_collectifs,
          proportion: proportionAccompagnementsCollectifs,
        },
        demarches: {
          count: result.total_demarches,
          proportion: proportionAccompagnementsDemarches,
        },
      },
      beneficiaires: {
        total: result.total_beneficiaires,
        suivis: result.total_beneficiaires_suivis,
        anonymes:
          result.total_beneficiaires - result.total_beneficiaires_suivis,
      },
    }
  })
