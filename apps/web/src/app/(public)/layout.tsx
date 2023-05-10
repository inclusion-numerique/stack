import { PropsWithChildren } from 'react'
import PublicFooter from '@app/web/app/(public)/PublicFooter'
import PublicHeader from '@app/web/app/(public)/PublicHeader'
import { getSessionUser } from '@app/web/auth/getSessionUser'

const PublicLayout = async ({ children }: PropsWithChildren) => {
  // TODO server cached session user
  const user = await getSessionUser()
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <PublicHeader user={user} />
      <div style={{ flex: 1 }}>
        <div className="fr-container">{children}</div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout
