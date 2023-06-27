import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getDepartementGeoJson } from '@app/web/utils/map/departementGeoJson'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { fetchDepartementDashboardData } from '@app/web/components/Prefet/departementData'
import DepartementDashboard from '@app/web/components/Prefet/DepartementDashboard'
import { hasAccessToDepartementDashboard } from '@app/web/security/securityRules'

const Page = async ({
  params: { departementCode },
}: {
  params: { departementCode: string }
}) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(`/connexion?suivant=/prefet/${departementCode}`)
    return
  }

  // TODO security check
  const departement = getDepartementGeoJson({ code: departementCode })

  if (!departement) {
    notFound()
    return
  }

  if (!hasAccessToDepartementDashboard(user, departement.code)) {
    redirect(`/profil`)
    return
  }

  const data = await fetchDepartementDashboardData(departement)

  return <DepartementDashboard data={data} departement={departement} />
}

export default Page
