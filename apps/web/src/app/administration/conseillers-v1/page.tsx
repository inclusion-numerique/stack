import { Suspense } from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationSearchUtilisateur from '@app/web/app/administration/utilisateurs/AdministrationSearchUtilisateur'
import { Spinner } from '@app/web/ui/Spinner'
import AdministrationConseillersNumeriquesV1 from '@app/web/app/administration/conseillers-v1/AdministrationConseillersNumeriquesV1'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'

export const metadata = {
  title: metadataTitle('Conseillers V1'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = ({
  searchParams = {},
}: {
  searchParams?: { recherche?: string }
}) => {
  const executeV1Search =
    searchParams.recherche != null && searchParams.recherche.trim().length > 3

  return (
    <>
      <CoopPageContainer>
        <AdministrationBreadcrumbs currentPage="Conseillers V1" />
        <AdministrationTitle icon="fr-icon-archive-line">
          Conseillers numériques V1
        </AdministrationTitle>

        <div className="fr-border-radius--8 fr-py-8v fr-px-10v fr-background-alt--blue-france  fr-mb-6v">
          <p className="fr-text--bold fr-mb-4v">
            Rechercher dans la base MongoDB hébergée par l’ancien projet
            Conseillers numériques V1
          </p>
          <AdministrationSearchUtilisateur searchParams={searchParams} />
        </div>
      </CoopPageContainer>

      {executeV1Search && (
        <Suspense
          fallback={
            <CoopPageContainer>
              <div className="fr-mt-6v fr-flex fr-direction-column fr-align-items-center">
                <p className="fr-text--bold fr-mb-4v">
                  Recherche en cours dans la base de données conseillers
                  numériques V1
                </p>
                <Spinner />
              </div>
            </CoopPageContainer>
          }
        >
          <CoopPageContainer size="full">
            <AdministrationConseillersNumeriquesV1
              recherche={searchParams.recherche ?? ''}
            />
          </CoopPageContainer>
        </Suspense>
      )}
    </>
  )
}

export default Page
