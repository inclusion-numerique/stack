import type { PropsWithChildren } from 'react'
import { checkAccessControl } from '@app/web/app/checkAccessControl'

const Layout = async ({ children }: PropsWithChildren) => {
  await checkAccessControl({
    check: (user) => user?.role === 'Administrator' || user?.role === 'Demo',
    signinNextPath: `/administration`,
  })

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default Layout
