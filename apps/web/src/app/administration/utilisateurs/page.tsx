import { pluralize } from '@app/ui/utils/pluriel/pluralize'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import AdministrationSearchUtilisateur from '@app/web/app/administration/utilisateurs/AdministrationSearchUtilisateur'
import { UtilisateursDataTableSearchParams } from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import UtilisateursTable from '@app/web/app/administration/utilisateurs/UtilisateursTable'
import { getUtilisateursListPageData } from '@app/web/app/administration/utilisateurs/getUtilisateursListPageData'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { FilterTags } from './FilterTags'
import Filters from './Filters'
import { UtilisateursFilters, utilisateursFilters } from './utilisateursFilters'

export const metadata = {
  title: metadataTitle('Utilisateurs'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams = {},
}: {
  searchParams?: UtilisateursDataTableSearchParams & UtilisateursFilters
}) => {
  const data = await getUtilisateursListPageData({
    searchParams,
  })

  const activitesFilters = utilisateursFilters(searchParams)

  return (
    <>
      <CoopPageContainer>
        <AdministrationBreadcrumbs currentPage="Utilisateurs" />
        <AdministrationTitle icon="fr-icon-team-line">
          Utilisateurs
        </AdministrationTitle>

        <div className="fr-border-radius--8 fr-py-8v fr-px-10v fr-background-alt--blue-france  fr-mb-6v">
          <p className="fr-text--medium fr-mb-2v">
            Rechercher dans la liste des utilisateurs inscrits
          </p>
          <AdministrationSearchUtilisateur searchParams={searchParams} />
        </div>
      </CoopPageContainer>
      <CoopPageContainer size="full">
        <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
          <Filters
            defaultFilters={activitesFilters}
            lieuxActiviteOptions={data.lieuxActiviteOptions}
            communesOptions={data.communesOptions}
            departementsOptions={data.departementsOptions}
          />
          <span className="fr-text--semi-bold">
            {data.searchResult.matchesCount}{' '}
            {pluralize('utilisateur trouvé', data.searchResult.matchesCount)}
          </span>
        </div>
        <hr className="fr-mt-6v fr-pb-4v" />
        <FilterTags
          filters={activitesFilters}
          communesOptions={data.communesOptions}
          departementsOptions={data.departementsOptions}
          lieuxActiviteOptions={data.lieuxActiviteOptions}
        />
        <UtilisateursTable
          data={data.searchResult}
          searchParams={searchParams}
          baseHref="/administration/utilisateurs"
        />
      </CoopPageContainer>
    </>
  )
}

export default Page
