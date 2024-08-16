import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { StatistiquesTerritoriales } from './_components/StatistiquesTerritoriales'
import { StatistiquesAccompagnements } from './_sections/StatistiquesAccompagnements'
import { StatistiquesBeneficiaires } from './_sections/StatistiquesBeneficiaires'
import { StatistiquesGenerales } from './_sections/StatistiquesGenerales'
import { MesStatistiquesPageData } from './getMesStatistiquesPageData'

export const MesStatistiques = (
  mesStatistiquesProps: MesStatistiquesPageData,
) => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <main
      id={contentId}
      className="fr-container fr-container--medium fr-mb-16w"
    >
      <Breadcrumbs currentPage="Mes statistiques" />
      <h1 className="fr-h2 fr-text-title--blue-france">Mes statistiques</h1>
      <hr />
      <section className="fr-mb-6w">
        <StatistiquesGenerales {...mesStatistiquesProps} />
      </section>
      <section className="fr-mb-6w">
        <StatistiquesAccompagnements {...mesStatistiquesProps} />
      </section>
      <section className="fr-mb-6w">
        <StatistiquesBeneficiaires {...mesStatistiquesProps} />
      </section>
      <section>
        <h2 className="fr-h5 fr-text-mention--grey fr-flex fr-align-items-center fr-flex-gap-2v">
          <img src="/images/services/conseillers-numerique-logo-small.svg" />
          Statistiques départementales France Numérique Ensemble
        </h2>
        <StatistiquesTerritoriales codeDepartement="04" />
      </section>
    </main>
  </>
)
