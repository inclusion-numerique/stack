import type { PropsWithChildren } from 'react'
import { checkAccessControl } from '@app/web/app/checkAccessControl'

const Layout = async ({ children }: PropsWithChildren) => {
  await checkAccessControl({
    check: (user) => !!user,
    signinNextPath: '/profil',
  })

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default Layout
