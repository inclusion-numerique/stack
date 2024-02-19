import type { PropsWithChildren } from 'react'
import { checkAccessControl } from '@app/web/app/checkAccessControl'

const Layout = async ({ children }: PropsWithChildren) => {
  await checkAccessControl({
    check: (user) => !!user,
    signinNextPath: '/formulaires-feuilles-de-routes-territoriales',
  })

  return { children }
}

export default Layout
