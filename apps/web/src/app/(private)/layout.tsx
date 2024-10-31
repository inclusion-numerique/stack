import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'

const PrivateLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion')
    return null
  }
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <div id="skip-links" />
      <Header user={user} variant="coop" />
      {children}
      <PublicFooter />
    </div>
  )
}

export default PrivateLayout
