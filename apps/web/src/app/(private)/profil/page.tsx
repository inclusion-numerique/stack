import React from 'react'
import { redirect } from 'next/navigation'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'

const Page = async () => {
  const user = await getAuthenticatedSessionUser()
  if (!user) {
    redirect('/connexion')
  }

  let roleNotice: JSX.Element

  switch (user.role) {
    case 'Administrator': {
      roleNotice = (
        <Alert
          severity="info"
          title="Vous êtes connecté à Inclusion Numérique avec un rôle administrateur"
        />
      )
      break
    }

    case 'Demo': {
      roleNotice = (
        <Alert
          severity="info"
          title="Vous êtes connecté à Inclusion Numérique avec un rôle de démonstration vous permettant d'accéder à toutes les fonctionnalités"
        />
      )
      break
    }
    case 'Prefect': {
      roleNotice = (
        <Alert
          severity="info"
          title="Vous êtes connecté à Inclusion Numérique avec un rôle 'préfecture' vous permettant d'accéder à toutes les fonctionnalités concernant votre département"
        />
      )
      break
    }
    default: {
      roleNotice = (
        <Alert
          severity="warning"
          title="Votre compte n'est pas encore validé, veuillez vous rapprocher de votre référent"
        />
      )
    }
  }

  return (
    <>
      <Breadcrumbs currentPage="Profil" />
      <h1>Mon profil</h1>
      {roleNotice}
    </>
  )
}

export default Page
