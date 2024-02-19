import React, { PropsWithChildren } from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getDepartementNameAndCode } from '@app/web/data/getDepartementNameAndCode'
import SetLastVisitedGouvernanceScope from '@app/web/components/SetLastVisitedGouvernanceScope'
import GouvernancesHeader from '@app/web/app/(with-navigation)/gouvernances/GouvernancesHeader'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departement = await getDepartementNameAndCode(codeDepartement)

  return {
    title: metadataTitle(`Gouvernance · ${departement.nom}`),
  }
}

const DepartementGouvernanceLayout = async ({
  children,
  params: { codeDepartement },
}: PropsWithChildren<{
  params: { codeDepartement: string }
}>) => {
  const departement = await getDepartementNameAndCode(codeDepartement)

  return (
    <>
      <GouvernancesHeader departement={departement} />
      {children}
      <SetLastVisitedGouvernanceScope scope={{ codeDepartement }} />
    </>
  )
}

export default DepartementGouvernanceLayout
