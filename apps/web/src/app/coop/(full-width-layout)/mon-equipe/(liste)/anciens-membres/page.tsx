import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import MonEquipeListePage from '@app/web/equipe/MonEquipeListePage/MonEquipeListePage'
import { getMonEquipePageData } from '@app/web/equipe/MonEquipeListePage/getMonEquipePageData'
import type { MonEquipeSearchParams } from '@app/web/equipe/MonEquipeListePage/searchMediateursCoordonneBy'
import { authenticateCoordinateur } from '@app/web/auth/authenticateUser'

export const metadata: Metadata = {
  title: metadataTitle('Anciens membres'),
}

const Page = async ({
  searchParams,
}: {
  searchParams: MonEquipeSearchParams
}) => {
  const authenticatedCoordinateur = await authenticateCoordinateur()

  const monEquipePageData = await getMonEquipePageData({
    searchParams,
    anciensMembres: true,
    coordinateur: authenticatedCoordinateur.coordinateur,
  })

  return (
    <MonEquipeListePage
      {...monEquipePageData}
      searchParams={searchParams}
      baseHref="/coop/mon-equipe"
      baseHrefSearch="/coop/mon-equipe/anciens-membres"
      anciensMembres
      coordinateur={{
        id: authenticatedCoordinateur.coordinateur.id,
        user: authenticatedCoordinateur,
      }}
    />
  )
}

export default Page
