import { notFound } from 'next/navigation'
import React from 'react'
import { getDepartementCartographieData } from '@app/web/app/(cartographie)/donnees/departements/[codeDepartement]/cartographie/getDepartementCartographieData'
import CartographiePage from '@app/web/components/Dashboard/Cartographie/Page'
import { prismaClient } from '@app/web/prismaClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departement = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: { code: true, nom: true, codeRegion: true },
  })

  if (!departement) {
    notFound()
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
