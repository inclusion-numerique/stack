import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getDepartementGeoJson } from '@app/web/utils/map/departementGeoJson'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import DepartementDashboard from '@app/web/components/Prefet/DepartementDashboard'
import { hasAccessToDepartementDashboard } from '@app/web/security/securityRules'
import { getDepartementData } from '@app/web/components/Prefet/departementData'

const getUserAndDepartement = async (departementCode: string) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(`/connexion?suivant=/prefet/${departementCode}`)
  }

  // TODO security check
  const departement = getDepartementGeoJson({ code: departementCode })

  if (!departement) {
    notFound()
  }

  if (!hasAccessToDepartementDashboard(user, departement.code)) {
    redirect(`/profil`)
  }

  return { user, departement }
}

export const generateMetadata = async ({
  params: { departementCode },
}: {
  params: { departementCode: string }
}) => {
  const { departement } = await getUserAndDepartement(departementCode)

  return {
    title: `${departement.name} - Tableau de bord`,
  }
}

const Page = async ({
  params: { departementCode },
}: {
  params: { departementCode: string }
}) => {
  const { departement } = await getUserAndDepartement(departementCode)

  const data = await getDepartementData(departement)

  return <DepartementDashboard data={data} departement={departement} />
}

export default Page
