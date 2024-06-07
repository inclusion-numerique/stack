import { notFound, redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getAuthenticatedSessionUser()

  // Admin users are not allowed to access this page
  if (user.role === 'Admin') {
    // TODO proper error message for admins
    notFound()
  }

  if (!user.inscriptionValidee) {
    redirect('/inscription')
  }

  return children
}

export default Layout
