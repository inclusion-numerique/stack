import React from 'react'
import { getNationalDashboardData } from '@app/web/app/(public)/donnees/national/getNationalDashboardData'
import NationalDashboard from '@app/web/components/Dashboard/NationalDashboard'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = () => ({
  title: metadataTitle(`Données nationales`),
})

const Page = async () => {
  const data = await getNationalDashboardData()

  // User only has access to one departement
  return <NationalDashboard data={data} />
}

export default Page
