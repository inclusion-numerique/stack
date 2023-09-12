import { notFound, redirect } from 'next/navigation'
import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToRegionDashboard } from '@app/web/security/securityRules'
import { prismaClient } from '@app/web/prismaClient'
import StatistiquesGouvernances from '@app/web/app/(private)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceRegion } from '@app/web/app/(private)/gouvernances/getStatistiquesGouvernances'

export const dynamic = 'force-dynamic'
export const revalidate = 0
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

  const statistiquesGouvernance = await getStatistiquesGouvernanceRegion(
    codeRegion,
  )

  return (
    <div className="fr-container">
      <Breadcrumb
        currentPageLabel="Gouvernance"
        segments={[
          {
            label: "Page d'accueil",
            linkProps: {
              href: '/',
            },
          },
        ]}
      />
      <StatistiquesGouvernances
        statistiquesGouvernance={statistiquesGouvernance}
        codeRegion={codeRegion}
      />
    </div>
  )
}

export default Page
