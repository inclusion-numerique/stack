import type { Metadata } from 'next'
import { getAuthenticatedCoordinateur } from '@app/web/auth/getAuthenticatedMediateur'
import { metadataTitle } from '@app/web/app/metadataTitle'
import MonEquipeListePage from './_components/MonEquipeListePage'
import { getMonEquipePageData } from './getMonEquipePageData'

export const metadata: Metadata = {
  title: metadataTitle('Mon équipe'),
}

const Page = async ({
  searchParams,
}: {
  searchParams: { lignes?: string; page?: string; recherche?: string }
}) => {
  const user = await getAuthenticatedCoordinateur()

  const monEquipePageData = await getMonEquipePageData(user)

  return (
    <MonEquipeListePage
      {...monEquipePageData}
      searchParams={searchParams}
      totalPages={1}
    />
  )
}

export default Page
