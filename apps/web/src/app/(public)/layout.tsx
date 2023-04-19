import { PropsWithChildren } from 'react'
import PublicHeader from '@lb/web/app/(public)/PublicHeader'
import PublicFooter from '@lb/web/app/(public)/PublicFooter'

const PublicLayout = ({ children }: PropsWithChildren) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
    <PublicHeader />
    <div style={{ flex: 1 }}>
      <div>{children}</div>
    </div>
    <PublicFooter />
  </div>
)

export default PublicLayout
