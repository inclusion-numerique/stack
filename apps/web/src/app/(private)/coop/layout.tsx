import { notFound, redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getAuthenticatedSessionUser()

  if (user.role === 'Admin') {
    notFound()
  }

  // TODO Rule for should onboard
  if (true) {
    redirect('/inscription')
  }

  return children
}

export default Layout
