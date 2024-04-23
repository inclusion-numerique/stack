import { notFound } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import AdministrationSideMenu from '@app/web/app/administration/AdministrationSideMenu'
import styles from './AdministrationLayout.module.css'

const AdministrationLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()

  if (user?.role !== 'Admin') {
    notFound()
  }
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <Header user={user} />
      <div className="fr-grid-row fr-width-full">
        <div className={styles.sideNavContainer}>
          <AdministrationSideMenu />
        </div>
        <div className={styles.pageContainer}>{children}</div>
      </div>
    </div>
  )
}

export default AdministrationLayout
