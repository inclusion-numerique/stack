import type { PropsWithChildren } from 'react'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'

const Layout = async ({
  children,
  params: { codeDepartement, gouvernanceId },
}: PropsWithChildren<{
  params: { codeDepartement: string; gouvernanceId: string }
}>) => {
  await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { codeDepartement }, user }),
    signinNextPath: `/gouvernances/departements/${codeDepartement}/gouvernance/${gouvernanceId}`,
  })

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default Layout
