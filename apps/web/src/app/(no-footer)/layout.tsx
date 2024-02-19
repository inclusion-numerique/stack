import React, { PropsWithChildren } from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'

export const dynamic = 'force-dynamic'
export const revalidate = 0
const NoFooterLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <Header user={user} />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

export default NoFooterLayout
