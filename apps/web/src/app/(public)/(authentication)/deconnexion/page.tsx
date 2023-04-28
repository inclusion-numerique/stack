'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { Breadcrumbs } from '@app/web/components/Breadcrumbs'
import Link from 'next/link'

const SignoutPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const onLogout = async () => {
    setIsLoading(true)
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <>
      <Breadcrumbs currentPage="Déconnexion" />
      <AuthCard>
        <h2>Déconnexion</h2>
        <p>Êtes-vous sur de vouloir vous déconnecter&nbsp;?</p>
        <ul className="fr-btns-group">
          <li>
            <button
              type="button"
              className="fr-btn"
              disabled={isLoading}
              onClick={onLogout}
            >
              Se déconnecter
            </button>
          </li>
        </ul>
        <div className="fr-grid-row fr-grid-row--center">
          <Link href="/">Retour</Link>
        </div>
      </AuthCard>
    </>
  )
}

export default SignoutPage
