import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Cartographie from '@app/web/components/Prefet/Cartographie/Page'
import { getDepartementInformations } from '@app/web/utils/map/departement'
import { getStructuresData } from '@app/web/components/Prefet/structuresData'
import { hasAccessToDepartementDashboard } from '@app/web/security/securityRules'
import { getDepartementGeoJson } from '@app/web/utils/map/departementGeoJson'

const getUserAndDepartement = async (departementCode: string) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(`/connexion?suivant=/prefet/${departementCode}/cartographie`)
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
    title: `${departement.name} - Cartographie`,
  }
}

const Page = async ({
  params: { departementCode },
}: {
  params: { departementCode: string }
}) => {
  const { departement } = await getUserAndDepartement(departementCode)
  const structuresData = await getStructuresData(departement)

  const departementInformations = await getDepartementInformations(
    departementCode,
    structuresData.structures,
  )

  if (!departementInformations) {
    notFound()
    return null
  }

  return (
    <Cartographie
      departement={departementInformations}
      structuresData={structuresData}
    />
  )
}

export default Page
