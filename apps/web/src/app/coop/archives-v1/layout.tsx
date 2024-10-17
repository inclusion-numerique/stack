import type { PropsWithChildren } from 'react'
import ArchivesV1Layout from '@app/web/app/coop/archives-v1/ArchivesV1Layout'

const Layout = ({ children }: PropsWithChildren) => (
  <ArchivesV1Layout>{children}</ArchivesV1Layout>
)

export default Layout
