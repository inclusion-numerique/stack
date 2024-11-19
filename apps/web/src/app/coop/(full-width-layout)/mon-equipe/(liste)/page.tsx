import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedCoordinateur } from '@app/web/auth/getAuthenticatedMediateur'
import MonEquipeListePage from './_components/MonEquipeListePage'
import { getMonEquipePageData } from './getMonEquipePageData'
import type { MonEquipeSearchParams } from './searchMediateursCordonneBy'

export const metadata: Metadata = {
  title: metadataTitle('Mon équipe'),
}

const Page = async ({
  searchParams,
}: {
  searchParams: MonEquipeSearchParams
}) => {
  const { coordinateur } = await getAuthenticatedCoordinateur()

  const monEquipePageData = await getMonEquipePageData({
    searchParams,
    coordinateur,
  })

  return (
    <MonEquipeListePage {...monEquipePageData} searchParams={searchParams} />
  )
}

export default Page
