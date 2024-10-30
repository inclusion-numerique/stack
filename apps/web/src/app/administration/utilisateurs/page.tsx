import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import { UtilisateursDataTableSearchParams } from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import { getUtilisateursListPageData } from '@app/web/app/administration/utilisateurs/getUtilisateursListPageData'
import UtilisateursTable from '@app/web/app/administration/utilisateurs/UtilisateursTable'
import AdministrationSearchUtilisateur from '@app/web/app/administration/utilisateurs/AdministrationSearchUtilisateur'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'

export const metadata = {
  title: metadataTitle('Utilisateurs'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams = {},
}: {
  searchParams?: UtilisateursDataTableSearchParams
}) => {
  const data = await getUtilisateursListPageData({
    searchParams,
  })

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
          {searchParams.recherche ? (
            <p className="fr-text--sm fr-mt-4v fr-mb-0 fr-text-mention--grey">
              <strong>{data.searchResult.matchesCount}</strong> résultat
              {data.searchResult.matchesCount > 1 ? 's' : ''} sur{' '}
              <strong>{data.totalCount}</strong> utilisateurs inscrits au total
            </p>
          ) : (
            <p className="fr-text--sm fr-mt-4v fr-mb-0  fr-text-mention--grey">
              <strong>{data.totalCount}</strong> utilisateurs inscrits au total
            </p>
          )}
        </div>
      </CoopPageContainer>
      <CoopPageContainer size="full">
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
