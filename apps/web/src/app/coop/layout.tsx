import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import InscriptionStepsLayout from '@app/web/app/inscription/(steps)/layout'
import Header from '@app/web/components/Header'
import PublicFooter from '@app/web/app/(public)/PublicFooter'
import CoopSideMenu from '@app/web/app/coop/CoopSideMenu'
import CreateCraModal from '@app/web/app/coop/mon-activite/CreateCraModal'
import styles from './CoopLayout.module.css'

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion')
    return null
  }
  // Admin users are not allowed to access this page
  if (user.role === 'Admin') {
    // Admins cannot access the coop features
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
      >
        <Header user={user} />
        <InscriptionStepsLayout>
          <div className="fr-mb-32v fr-p-12v fr-width-full fr-border-radius--8 fr-background-default--grey fr-mt-32v">
            <h2>Vous êtes connecté en tant qu’administrateur</h2>
            <p className="fr-text--xl">
              Les administrateurs n’ont pas accès au fonctionnalités de la coop
              😬
            </p>
            <Link className="fr-link" href="/administration/usurpation">
              Accéder à l’usurpation pour accéder aux fonctionnalités de la coop
              en tant qu’utilisateur de test
              <span className="fr-icon-arrow-right-line fr-icon-arrow-right-line fr-icon--sm fr-ml-1w" />
            </Link>
          </div>
        </InscriptionStepsLayout>
        <PublicFooter />
      </div>
    )
  }

  if (!user.inscriptionValidee) {
    redirect('/inscription')
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <Header user={user} />

      <div
        className={classNames('fr-grid-row fr-width-full', styles.container)}
      >
        <div className={styles.sideNavContainer}>
          <CoopSideMenu user={user} />
        </div>
        <div className={styles.pageContainer}>{children}</div>
      </div>
      <CreateCraModal />
      <PublicFooter />
    </div>
  )
}

export default Layout
