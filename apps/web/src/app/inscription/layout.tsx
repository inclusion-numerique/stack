import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import InscriptionStepsLayout from '@app/web/app/inscription/(steps)/layout'

const InscriptionLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion')
    return null
  }

  if (user.inscriptionValidee) {
    redirect('/coop')
  }

  return (
    <div className="fr-flex fr-direction-column" style={{ minHeight: '100%' }}>
      <div id="skip-links" />
      <Header user={user} variant="public" />
      {user.role === 'Admin' ? (
        // Admins cannot access the inscription process
        <InscriptionStepsLayout>
          <div className="fr-mb-32v fr-p-12v fr-width-full fr-border-radius--8 fr-background-default--grey fr-mt-32v">
            <h2>Vous êtes connecté en tant qu’administrateur</h2>
            <p className="fr-text--xl">
              Les administrateurs n’ont pas accès au parcours d’inscription 😬
            </p>
            <Link className="fr-link" href="/administration/usurpation">
              Accéder à l’usurpation pour effectuer le parcours d’inscription en
              tant qu’utilisateur de test
              <span className="fr-icon-arrow-right-line fr-icon-arrow-right-line fr-icon--sm fr-ml-1w" />
            </Link>
          </div>
        </InscriptionStepsLayout>
      ) : (
        // Regular users can access the inscription process
        children
      )}
      <PublicFooter />
    </div>
  )
}

export default InscriptionLayout
