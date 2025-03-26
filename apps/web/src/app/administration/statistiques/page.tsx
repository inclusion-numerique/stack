import { StatistiquesImpact } from '@app/web/app/administration/statistiques/StatistiquesImpact'
import {
  getAccompagnementsCountByDay,
  getAccompagnementsCountByMonth,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getAccompagnementsCountByPeriod'
import { getActivitesStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getActivitesStats'
import { getBeneficiaireStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getBeneficiaireStats'
import { getTotalCountsStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'
import { StatistiquesActivites } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_sections/StatistiquesActivites'
import { StatistiquesBeneficiaires } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_sections/StatistiquesBeneficiaires'
import { StatistiquesGenerales } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_sections/StatistiquesGenerales'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getImpactStats } from '@app/web/server/impact/getImpactStats'

export const metadata = {
  title: metadataTitle('Usurpation'),
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async () => {
  const activitesFilters = {} satisfies ActivitesFilters

  const [
    accompagnementsParJour,
    accompagnementsParMois,
    beneficiaires,
    activites,
    totalCounts,
    impactStats,
  ] = await Promise.all([
    getAccompagnementsCountByDay({ activitesFilters }),
    getAccompagnementsCountByMonth({ activitesFilters }),
    getBeneficiaireStats({ activitesFilters }),
    getActivitesStats({ activitesFilters }),
    getTotalCountsStats({ activitesFilters }),
    getImpactStats(),
  ])

  return (
    <>
      <section className="fr-mb-6w">
        <StatistiquesGenerales
          wording="generique"
          totalCounts={totalCounts}
          accompagnementsParJour={accompagnementsParJour}
          accompagnementsParMois={accompagnementsParMois}
        />
      </section>
      <section className="fr-mb-6w">
        <StatistiquesActivites
          wording="generique"
          totalCounts={totalCounts}
          activites={activites}
        />
      </section>
      <section className="fr-mb-6w">
        <StatistiquesBeneficiaires
          beneficiaires={beneficiaires}
          wording="generique"
        />
      </section>
      <section>
        <StatistiquesImpact stats={impactStats} />
      </section>
    </>
  )
}

export default Page
