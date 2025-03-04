import { AccompagnementsApiResponse } from '@app/web/app/api/ppg/AccompagnementsApiResponse'
import { getTotalCountsStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'
import { departements } from '@app/web/data/collectivites-territoriales/departements'

export const fetchAccompagnement = async (
  isConseillerNumerique: boolean,
  date?: string,
): Promise<Awaited<AccompagnementsApiResponse>[]> => {
  return Promise.all(
    departements.map<Promise<{ count: number; departement: string }>>(
      async (departement) => {
        const total = await getTotalCountsStats({
          activitesFilters: {
            departements: [departement.code],
            conseiller_numerique: isConseillerNumerique ? '1' : '0',
            au: date || new Date().toISOString(),
          },
        })
        return {
          departement: departement.code,
          count: total.accompagnements.total,
        }
      },
    ),
  )
}
