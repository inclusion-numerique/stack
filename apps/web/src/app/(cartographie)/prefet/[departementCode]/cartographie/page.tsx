import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Cartographie from '@app/web/components/Prefet/Cartographie/Page'
import { getDepartementInformations } from '@app/web/utils/map/departement'
import { getStructuresData } from '@app/web/components/Prefet/structuresData'
import { hasAccessToDepartementDashboard } from '@app/web/security/securityRules'

const Page = async ({
  params: { departementCode },
}: {
  params: { departementCode: string }
}) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(`/connexion?suivant=/prefet/${departementCode}/cartographie`)
    return null
  }
  const departement = await getDepartementInformations(departementCode)

  if (!departement) {
    notFound()
    return null
  }

  if (!hasAccessToDepartementDashboard(user, departement.code)) {
    redirect(`/profil`)
    return
  }
  const structuresData = await getStructuresData(departement)

  return (
    <Cartographie departement={departement} structuresData={structuresData} />
  )
}

export default Page
