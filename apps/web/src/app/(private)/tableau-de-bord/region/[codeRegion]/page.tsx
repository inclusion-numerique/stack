import { notFound, redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToRegionDashboard } from '@app/web/security/securityRules'
import { prismaClient } from '@app/web/prismaClient'

/**
 * Cette page redirige vers le bon dashboard département, pour une région donnée
 */
const Page = async ({
  params: { codeRegion },
}: {
  params: {
    codeRegion: string
  }
}) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(`/connexion?suivant=/tableau-de-bord/region/${codeRegion}`)
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

  redirect(`/tableau-de-bord/departement/${region.departements[0].code}`)

  return null
}

export default Page
