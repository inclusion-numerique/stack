import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import DepartementDashboard from '@app/web/components/Prefet/DepartementDashboard'
import { hasAccessToDepartementDashboard } from '@app/web/security/securityRules'
import { prismaClient } from '@app/web/prismaClient'
import { getDepartementDashboardData } from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'

export const generateMetadata = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(
      `/connexion?suivant=/tableau-de-bord/departement/${codeDepartement}`,
    )
  }

  const departement = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: { code: true, nom: true },
  })
  if (!departement) {
    notFound()
  }

  if (!hasAccessToDepartementDashboard(user, departement.code)) {
    redirect(`/profil`)
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

  return <DepartementDashboard data={data} />
}

export default Page
