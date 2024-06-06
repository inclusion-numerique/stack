import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'

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
      <Header user={user} />
      <div style={{ flex: 1, backgroundColor: 'var(--blue-france-975-75)' }}>
        <div className="fr-container fr-container--narrow">{children}</div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default InscriptionLayout
