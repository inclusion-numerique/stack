import React, { PropsWithChildren } from 'react'
import Dashboard from '@app/web/components/Dashboard/Dashboard'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getDepartementOptions } from '@app/web/data/getDepartementOptions'
import { getDepartementNameAndCode } from '@app/web/data/getDepartementNameAndCode'
import SetLastVisitedGouvernanceScope from '@app/web/components/SetLastVisitedGouvernanceScope'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departement = await getDepartementNameAndCode(codeDepartement)

  return {
    title: metadataTitle(`Données · ${departement.nom}`),
  }
}

const DepartementDataLayout = async ({
  children,
  params: { codeDepartement },
}: PropsWithChildren<{
  params: { codeDepartement: string }
}>) => {
  const departement = await getDepartementNameAndCode(codeDepartement)

  const departementOptions = await getDepartementOptions()

  return (
    <>
      <Dashboard
        departement={departement}
        departementOptions={departementOptions}
      >
        {children}
      </Dashboard>
      <SetLastVisitedGouvernanceScope scope={{ codeDepartement }} />
    </>
  )
}

export default DepartementDataLayout
