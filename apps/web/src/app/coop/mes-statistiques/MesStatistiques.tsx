import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import ActivitesFilterTags from '@app/web/app/coop/mes-activites/(liste)/ActivitesFilterTags'
import CoopBreadcrumbs from '../CoopBreadcrumbs'
import CoopPageContainer from '../CoopPageContainer'
import { StatistiquesTerritoriales } from './_components/StatistiquesTerritoriales'
import { StatistiquesAccompagnements } from './_sections/StatistiquesAccompagnements'
import { StatistiquesBeneficiaires } from './_sections/StatistiquesBeneficiaires'
import { StatistiquesGenerales } from './_sections/StatistiquesGenerales'
import { MesStatistiquesPageData } from './getMesStatistiquesPageData'

export const MesStatistiques = (
  mesStatistiquesProps: MesStatistiquesPageData & {
    codeInsee?: string | null
  },
) => {
  const {
    activitesFilters,
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
  } = mesStatistiquesProps

  return (
    <CoopPageContainer size={794} className="fr-pt-8v">
      <CoopBreadcrumbs currentPage="Mes statistiques" />
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <h1 className="fr-text-title--blue-france">Mes statistiques</h1>
        <ActivitesFilterTags
          className="fr-mt-2v fr-mb-4v"
          defaultFilters={activitesFilters}
          communesOptions={communesOptions}
          departementsOptions={departementsOptions}
          lieuxActiviteOptions={lieuxActiviteOptions}
          initialBeneficiairesOptions={initialBeneficiairesOptions}
        />
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
            <img
              src="/images/services/conseillers-numerique-logo-small.svg"
              alt=""
            />
            Statistiques départementales France Numérique Ensemble
          </h2>
          <StatistiquesTerritoriales {...mesStatistiquesProps} />
        </section>
      </main>
    </CoopPageContainer>
  )
}