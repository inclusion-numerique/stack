import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateCoordinateur } from '@app/web/auth/authenticateUser'
import EquipeListePage from '@app/web/equipe/EquipeListePage/EquipeListePage'
import { getEquipePageData } from '@app/web/equipe/EquipeListePage/getEquipePageData'
import { EquipeSearchParams } from '@app/web/equipe/EquipeListePage/searchMediateursCoordonneBy'

export const metadata: Metadata = {
  title: metadataTitle('Anciens membres'),
}

const Page = async ({ searchParams }: { searchParams: EquipeSearchParams }) => {
  const authenticatedCoordinateur = await authenticateCoordinateur()

  const monEquipePageData = await getEquipePageData({
    searchParams,
    anciensMembres: true,
    coordinateur: authenticatedCoordinateur.coordinateur,
  })

  return (
    <EquipeListePage
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
