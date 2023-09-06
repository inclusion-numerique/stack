import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToRegionDashboard } from '@app/web/security/securityRules'
import { prismaClient } from '@app/web/prismaClient'
import StatistiquesGouvernances from '@app/web/app/(private)/gouvernances/StatistiquesGouvernances'

const Page = async ({
  params: { codeRegion },
}: {
  params: {
    codeRegion: string
  }
}) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(`/connexion?suivant=/gouvernances/region/${codeRegion}`)
  }

  const region = await prismaClient.region.findUnique({
    where: {
      code: codeRegion,
    },
    select: {
      code: true,
      nom: true,
      departements: { select: { code: true, nom: true } },
    },
  })
  if (!region || region.departements.length === 0) {
    notFound()
  }

  if (!hasAccessToRegionDashboard(user, codeRegion)) {
    redirect(`/profil`)
  }

  return <StatistiquesGouvernances region={region} />
}

export default Page
