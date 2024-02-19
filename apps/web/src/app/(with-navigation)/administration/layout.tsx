import type { PropsWithChildren } from 'react'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'

const Layout = async ({ children }: PropsWithChildren) => {
  await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { national: true }, user }),
    signinNextPath: `/administration`,
  })

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default Layout
