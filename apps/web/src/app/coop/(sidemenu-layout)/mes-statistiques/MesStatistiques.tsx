import { StatistiquesActivites } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_sections/StatistiquesActivites'
import { StatistiquesBeneficiaires } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_sections/StatistiquesBeneficiaires'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { SessionUser } from '@app/web/auth/sessionUser'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import { FilterTags } from '../mes-activites/(liste)/FilterTags'
import Filters from '../mes-activites/(liste)/Filters'
import { ExportStatistiques } from './_components/ExportStatistiques'
import { PrintStatistiques } from './_components/PrintStatistiques'
import { StatistiquesTerritoriales } from './_components/StatistiquesTerritoriales'
import { StatistiquesGenerales } from './_sections/StatistiquesGenerales'
import { MesStatistiquesPageData } from './getMesStatistiquesPageData'

export const MesStatistiques = (
  mesStatistiquesProps: MesStatistiquesPageData & {
    user: SessionUser
    codeInsee?: string | null
    mediateurCoordonnesCount: number
  },
) => {
  const {
    activitesFilters,
    communesOptions,
    departementsOptions,
    initialMediateursOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
    activiteDates,
    user,
  } = mesStatistiquesProps

  return (
    <CoopPageContainer size={794}>
      <CoopBreadcrumbs currentPage="Mes statistiques" />
      <SkipLinksPortal links={defaultSkipLinks} />
      <PrintStatistiques {...mesStatistiquesProps} />
      <main className="fr-no-print" id={contentId}>
        <h1 className="fr-text-title--blue-france fr-mb-6v">
          Mes statistiques
        </h1>
        <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-4v fr-mb-3w">
          <Filters
            defaultFilters={activitesFilters}
            communesOptions={communesOptions}
            departementsOptions={departementsOptions}
            lieuxActiviteOptions={lieuxActiviteOptions}
            initialMediateursOptions={initialMediateursOptions}
            initialBeneficiairesOptions={initialBeneficiairesOptions}
            beneficiairesFilter={false}
            minDate={activiteDates.first}
            isCoordinateur={user.coordinateur?.id != null}
            isMediateur={user.mediateur?.id != null}
          />
          <ExportStatistiques
            filters={activitesFilters}
            communesOptions={communesOptions}
            departementsOptions={departementsOptions}
            lieuxActiviteOptions={lieuxActiviteOptions}
            mediateursOptions={initialMediateursOptions}
            beneficiairesOptions={[]}
          />
        </div>
        <hr className="fr-pb-4v" />
        <FilterTags
          filters={activitesFilters}
          communesOptions={communesOptions}
          departementsOptions={departementsOptions}
          lieuxActiviteOptions={lieuxActiviteOptions}
          mediateursOptions={initialMediateursOptions}
          beneficiairesOptions={[]}
        />
        <section className="fr-mb-6w">
          <StatistiquesGenerales {...mesStatistiquesProps} />
        </section>
        <section className="fr-mb-6w">
          <StatistiquesActivites {...mesStatistiquesProps} />
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
          <StatistiquesTerritoriales />
        </section>
      </main>
    </CoopPageContainer>
  )
}
