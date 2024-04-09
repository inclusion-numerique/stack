import type { PropsWithChildren } from 'react'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import AdministrationSideMenu from '@app/web/app/(with-navigation)/administration/AdministrationSideMenu'
import { metadataTitle } from '@app/web/app/metadataTitle'
import styles from './Administration.module.css'

export const generateMetadata = () => ({
  title: metadataTitle(`Administration`),
})

const Layout = async ({ children }: PropsWithChildren) => {
  await checkAccessControl({
    check: (user) => user?.role === 'Administrator' || user?.role === 'Demo',
    signinNextPath: `/administration`,
  })

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <div className="fr-grid-row fr-width-full">
      <div className={styles.sideNavContainer}>
        <AdministrationSideMenu />
      </div>
      <div className={styles.pageContainer}>{children}</div>
    </div>
  )
}

export default Layout
