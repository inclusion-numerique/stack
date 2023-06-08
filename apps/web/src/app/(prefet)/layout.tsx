import React, { PropsWithChildren } from 'react'
import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'

const PublicLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <Header user={user} prefet />
      <div style={{ flex: 1 }}>
        <div className="fr-container">{children}</div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout
