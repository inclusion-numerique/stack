import { redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import CreateBase from '@app/web/components/Base/Create/CreateBase'

const BaseCreationPage = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/bases/creer`)
  }
  return (
    <>
      <div className="fr-container">
        <Breadcrumbs currentPage="Créer une base" />
      </div>
      <div className="fr-mt-1w">
        <CreateBase user={user} />
      </div>
    </>
  )
}

export default BaseCreationPage