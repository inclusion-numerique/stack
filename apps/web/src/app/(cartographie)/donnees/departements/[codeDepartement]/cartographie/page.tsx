import React from 'react'
import { getDepartementCartographieData } from '@app/web/app/(cartographie)/donnees/departements/[codeDepartement]/cartographie/getDepartementCartographieData'
import CartographiePage from '@app/web/components/Dashboard/Cartographie/Page'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getDepartementNameAndCode } from '@app/web/data/getDepartementNameAndCode'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departement = await getDepartementNameAndCode(codeDepartement)

  return {
    title: metadataTitle(`Cartographie · ${departement.nom}`),
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
