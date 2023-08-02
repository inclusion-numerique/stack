import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ContainerCard from '@app/web/components/ContainerCard'

const Page = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion?suivant=/profil')
  }

  let roleNotice: JSX.Element

  switch (user.role) {
    case 'Administrator': {
      roleNotice = (
        <>
          <Notice
            className="fr-mb-6v"
            title="Vous êtes connecté à Espace France Numérique Ensemble avec un rôle administrateur"
          />
          <Link
            className="fr-link fr-mt-4v"
            href="/tableau-de-bord/departement/69"
          >
            Accéder au tableau de bord Préfet
          </Link>
          <br />
          <br />
          <Link
            className="fr-link fr-mt-4v"
            href="/formulaires-feuilles-de-routes-territoriales?changer=1"
          >
            Accéder aux formulaires de feuilles de route territoriales
          </Link>
        </>
      )
      break
    }

    case 'Demo': {
      roleNotice = (
        <>
          <Notice
            className="fr-mb-6v"
            title="Vous êtes connecté à Espace France Numérique Ensemble avec un rôle de démonstration vous permettant d'accéder à toutes les fonctionnalités"
          />
          <Link
            className="fr-link fr-mt-4v"
            href="/tableau-de-bord/departement/69"
          >
            Accéder au tableau de bord Préfet
          </Link>
          <br />
          <br />
          <Link
            className="fr-link fr-mt-4v"
            href="/formulaires-feuilles-de-routes-territoriales?changer=1"
          >
            Accéder aux formulaires de feuilles de route territoriales
          </Link>
        </>
      )
      break
    }
    case 'Prefect': {
      roleNotice = (
        <>
          <Notice
            className="fr-mb-6v"
            title="Vous êtes connecté à Espace France Numérique Ensemble avec un rôle 'préfecture' vous permettant d'accéder à toutes les fonctionnalités concernant votre département"
          />
          <Link
            className="fr-link fr-mt-4v"
            href="/tableau-de-bord/departement/69"
          >
            Accéder au tableau de bord de votre département
          </Link>
        </>
      )
      break
    }
    default: {
      roleNotice = (
        <Link
          className="fr-link fr-mt-4v"
          href="/formulaires-feuilles-de-routes-territoriales"
        >
          Accéder aux formulaires de feuilles de route territoriales
        </Link>
      )
    }
  }

  return (
    <div className="fr-container">
      <Breadcrumbs currentPage="Profil" />
      <ContainerCard>
        <h2>Mon profil</h2>
        <p>
          Adresse email&nbsp;: <strong>{user.email}</strong>
          <br />
          {!!user.name && (
            <>
              Nom&nbsp;: <strong>{user.name}</strong>
              <br />
            </>
          )}
        </p>
        {roleNotice}
        <br />
        <br />
        <Button
          className="fr-mt-4v"
          linkProps={{ href: '/deconnexion' }}
          priority="tertiary"
          iconId="fr-icon-logout-box-r-line"
        >
          Se déconnecter
        </Button>
      </ContainerCard>
    </div>
  )
}

export default Page
