import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import MonEquipeListePage from './_components/MonEquipeListePage'
import { getMonEquipePageData } from './getMonEquipePageData'
import { MonEquipeSearchParams } from './searchMediateursCordonneBy'

export const metadata: Metadata = {
  title: metadataTitle('Mon équipe'),
}

const Page = async ({
  searchParams,
}: {
  searchParams: MonEquipeSearchParams
}) => {
  const monEquipePageData = await getMonEquipePageData(searchParams)

  return (
    <MonEquipeListePage {...monEquipePageData} searchParams={searchParams} />
  )
}

export default Page
