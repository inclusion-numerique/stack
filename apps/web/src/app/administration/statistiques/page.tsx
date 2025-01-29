import { metadataTitle } from '@app/web/app/metadataTitle'
import {
  getAccompagnementsCountByDay,
  getAccompagnementsCountByMonth,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getAccompagnementsCountByPeriod'
import { getBeneficiaireStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getBeneficiaireStats'
import { getActivitesStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getActivitesStats'
import { getTotalCountsStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { StatistiquesGenerales } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_sections/StatistiquesGenerales'
import { StatistiquesActivites } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_sections/StatistiquesActivites'
import { StatistiquesBeneficiaires } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_sections/StatistiquesBeneficiaires'
import { StatistiquesTerritoriales } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_components/StatistiquesTerritoriales'

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
  ] = await Promise.all([
    getAccompagnementsCountByDay({
      activitesFilters,
    }),
    getAccompagnementsCountByMonth({
      activitesFilters,
    }),
    getBeneficiaireStats({ activitesFilters }),
    getActivitesStats({ activitesFilters }),
    getTotalCountsStats({ activitesFilters }),
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
        <h2 className="fr-h5 fr-text-mention--grey fr-flex fr-align-items-center fr-flex-gap-2v">
          <img
            src="/images/services/conseillers-numerique-logo-small.svg"
            alt=""
          />
          Statistiques départementales France Numérique Ensemble
        </h2>
        <StatistiquesTerritoriales />
      </section>
    </>
  )
}

export default Page
