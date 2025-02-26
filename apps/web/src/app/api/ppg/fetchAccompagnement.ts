import { getTotalCountsStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'
import { departements } from '@app/web/data/collectivites-territoriales/departements'
import { ProfilSlug } from '@app/web/cra/cra'
import { AccompagnementsApiResponse } from '@app/web/app/api/ppg/AccompagnementsApiResponse'

export const fetchAccompagnement = async (
  profil: ProfilSlug,
  date?: string,
): Promise<Awaited<AccompagnementsApiResponse>[]> => {
  return Promise.all(
    departements.map<Promise<{ count: number; departement: string }>>(
      async (departement) => {
        const total = await getTotalCountsStats({
          activitesFilters: {
            departement: departement.code,
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
