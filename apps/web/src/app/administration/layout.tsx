import AdministrationSideMenu from '@app/web/app/administration/AdministrationSideMenu'
import MinimalFooter from '@app/web/app/coop/MinimalFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import classNames from 'classnames'
import { notFound } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import styles from './AdministrationLayout.module.css'

const AdministrationLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()

  if (user?.role !== 'Admin') {
    notFound()
  }
  return (
    <div className="fr-layout">
      <div className="fr-layout__inner">
        <div id="skip-links" />
        <Header user={user} variant="coop" />
        <div
          className={classNames(
            'fr-grid-row fr-width-full fr-layout__main',
            styles.container,
          )}
        >
          <div className={styles.sideNavContainer}>
            <AdministrationSideMenu />
          </div>
          <div className={styles.pageContainer}>{children}</div>
        </div>
        <MinimalFooter />
      </div>
    </div>
  )
}

export default AdministrationLayout
