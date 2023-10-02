import { redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToNationalDashboard } from '@app/web/security/securityRules'
import { getNationalDashboardData } from '@app/web/app/(private)/tableau-de-bord/national/getNationalDashboardData'
import NationalDashboard from '@app/web/components/Dashboard/NationalDashboard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = () => ({
  title: `Tableau de bord - National`,
})

const Page = async () => {
  const data = await getNationalDashboardData()
  const user = await getSessionUser()

  if (!user) {
    redirect(`/connexion?suivant=/tableau-de-bord/national`)
  }

  if (!hasAccessToNationalDashboard(user)) {
    redirect(`/profil`)
  }

  // User only has access to one departement
  return <NationalDashboard data={data} />
}

export default Page
