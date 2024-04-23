import { notFound, redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getAuthenticatedSessionUser()

  if (user.role === 'Admin') {
    notFound()
  }

  // TODO Rule for inscription already done
  if (false) {
    redirect('/coop')
  }

  return children
}

export default Layout
