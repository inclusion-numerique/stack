import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getDepartementCartographieData } from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import CartographiePage from '@app/web/components/Prefet/Cartographie/Page'
import { hasAccessToDepartementDashboard } from '@app/web/security/securityRules'
import { prismaClient } from '@app/web/prismaClient'

export const generateMetadata = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(
      `/connexion?suivant=/tableau-de-bord/departement/${codeDepartement}/cartographie`,
    )
  }

  const departement = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: { code: true, nom: true, codeRegion: true },
  })

  if (!departement) {
    notFound()
  }

  if (
    !hasAccessToDepartementDashboard(user, {
      departementCode: departement.code,
      regionCode: departement.codeRegion,
    })
  ) {
    redirect(`/profil`)
  }

  return {
    title: `${departement.nom} - Cartographie`,
  }
}

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  // This will be passed client side. Be mindful of the size of the data.
  // Security has been checked in metadata
  const data = await getDepartementCartographieData(codeDepartement)

  return <CartographiePage data={data} />
}

export default Page
