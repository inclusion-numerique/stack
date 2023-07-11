import React from 'react'
import { redirect } from 'next/navigation'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Link from 'next/link'
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
          description={
            <Link href="/prefet/69">Accéder au tableau de bord Préfet</Link>
          }
        />
      )
      break
    }
    case 'Prefect': {
      roleNotice = (
        <Alert
          severity="info"
          title="Vous êtes connecté à Inclusion Numérique avec un rôle 'préfecture' vous permettant d'accéder à toutes les fonctionnalités concernant votre département"
          description={<Link href="/prefet">Accéder au tableau de bord</Link>}
        />
      )
      break
    }
    default: {
      roleNotice = (
        <Alert
          severity="info"
          title="Votre compte est en attente de validation"
          description="Nous n'avons pas pu rattacher votre compte a une organisation autorisée. Veuillez vous rapprocher de votre référent pour plus d'informations."
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
