import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

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
      <Header user={user} />
      <div style={{ flex: 1 }}>{children}</div>
      <PublicFooter />
    </div>
  )
}

export default PrivateLayout
