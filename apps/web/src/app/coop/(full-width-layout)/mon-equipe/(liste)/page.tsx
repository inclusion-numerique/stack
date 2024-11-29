import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedCoordinateur } from '@app/web/auth/getAuthenticatedMediateur'
import MonEquipeListePage from '@app/web/equipe/MonEquipeListePage/MonEquipeListePage'
import { getMonEquipePageData } from '@app/web/equipe/MonEquipeListePage/getMonEquipePageData'
import type { MonEquipeSearchParams } from '@app/web/equipe/MonEquipeListePage/searchMediateursCordonneBy'

export const metadata: Metadata = {
  title: metadataTitle('Mon équipe'),
}

const Page = async ({
  searchParams,
}: {
  searchParams: MonEquipeSearchParams
}) => {
  const authenticatedCoordinateur = await getAuthenticatedCoordinateur()

  const monEquipePageData = await getMonEquipePageData({
    searchParams,
    coordinateur: authenticatedCoordinateur.coordinateur,
  })

  return (
    <MonEquipeListePage
      {...monEquipePageData}
      searchParams={searchParams}
      baseHref="/coop/mon-equipe"
      coordinateur={{ user: authenticatedCoordinateur }}
    />
  )
}

export default Page
