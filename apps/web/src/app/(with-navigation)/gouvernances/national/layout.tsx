import React, { PropsWithChildren } from 'react'
import SetLastVisitedGouvernanceScope from '@app/web/components/SetLastVisitedGouvernanceScope'
import GouvernancesHeader from '@app/web/app/(with-navigation)/gouvernances/GouvernancesHeader'

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <GouvernancesHeader national />
    {children}
    <SetLastVisitedGouvernanceScope scope={{ national: true }} />
  </>
)

export default Layout
