import { AccompagnementsApiResponse } from '@app/web/app/api/ppg/AccompagnementsApiResponse'
import { getTotalCountsStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'
import { ProfilSlug } from '@app/web/cra/cra'
import { departements } from '@app/web/data/collectivites-territoriales/departements'

export const fetchAccompagnement = async (
  profil: ProfilSlug,
  date?: string,
): Promise<Awaited<AccompagnementsApiResponse>[]> => {
  return Promise.all(
    departements.map<Promise<{ count: number; departement: string }>>(
      async (departement) => {
        const total = await getTotalCountsStats({
          activitesFilters: {
            departements: [departement.code],
            profil,
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
