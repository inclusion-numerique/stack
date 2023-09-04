import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import DepartementDashboard from '@app/web/components/Prefet/DepartementDashboard'
import {
  hasAccessToDepartementDashboard,
  hasAccessToRegionDashboard,
} from '@app/web/security/securityRules'
import { prismaClient } from '@app/web/prismaClient'
import { getDepartementDashboardData } from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'

export const generateMetadata = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departement = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: {
      code: true,
      nom: true,
    },
  })
  if (!departement) {
    notFound()
  }

  return {
    title: `${departement.nom} - Tableau de bord`,
  }
}

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  // Security has been checked in metadata
  const data = await getDepartementDashboardData(codeDepartement)
  const user = await getSessionUser()

  if (!user) {
    redirect(
      `/connexion?suivant=/tableau-de-bord/departement/${codeDepartement}`,
    )
  }

  const departementWithRegion = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: {
      code: true,
      nom: true,
      region: {
        select: {
          code: true,
          nom: true,
          departements: {
            select: {
              code: true,
              nom: true,
            },
          },
        },
      },
    },
  })
  if (!departementWithRegion) {
    notFound()
    return null
  }
  if (
    !hasAccessToDepartementDashboard(user, {
      regionCode: departementWithRegion.region?.code,
      departementCode: departementWithRegion.code,
    })
  ) {
    redirect(`/profil`)
  }

  if (
    !!departementWithRegion.region?.code &&
    hasAccessToRegionDashboard(user, departementWithRegion.region.code)
  ) {
    // User can switch between departements

    return (
      <DepartementDashboard
        data={data}
        regionOptions={departementWithRegion.region}
      />
    )
  }

  // User only has access to one departement
  return <DepartementDashboard data={data} />
}

export default Page
