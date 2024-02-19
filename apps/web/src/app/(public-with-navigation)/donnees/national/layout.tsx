import React, { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import Dashboard from '@app/web/components/Dashboard/Dashboard'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getDepartementOptions } from '@app/web/data/getDepartementOptions'
import SetLastVisitedGouvernanceScope from '@app/web/components/SetLastVisitedGouvernanceScope'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = { title: metadataTitle(`Données · National`) }

const NationalDataLayout = async ({ children }: PropsWithChildren) => {
  const departementOptions = await getDepartementOptions()

  return (
    <>
      <Dashboard national departementOptions={departementOptions}>
        {children}
      </Dashboard>
      <SetLastVisitedGouvernanceScope scope={{ national: true }} />
    </>
  )
}

export default NationalDataLayout
