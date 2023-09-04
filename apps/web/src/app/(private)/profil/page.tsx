import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ContainerCard from '@app/web/components/ContainerCard'
import { prismaClient } from '@app/web/prismaClient'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'

export const dynamic = 'force-dynamic'

const Page = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion?suivant=/profil')
  }
  const formulaireGouvernance =
    await prismaClient.formulaireGouvernance.findFirst({
      where: {
        participants: {
          some: {
            id: user.id,
          },
        },
      },
      select: {
        id: true,
        gouvernancePersona: true,
      },
    })
  const currentFormPersona = formulaireGouvernance
    ? gouvernancePersonas[
        formulaireGouvernance.gouvernancePersona as GouvernancePersonaId
      ]
    : null

  let roleNotice: JSX.Element

  const demoFormAccess =
    formulaireGouvernance && currentFormPersona ? (
      <>
        <Link
          className="fr-link fr-mt-4v"
          href={`/formulaires-feuilles-de-routes-territoriales/${formulaireGouvernance.gouvernancePersona}/formulaire`}
        >
          Reprendre mon formulaire de feuilles de route territoriales <br />
          en tant que {currentFormPersona.title.toLowerCase()}
        </Link>
        <br />
        <br />
        <Link
          className="fr-link fr-mt-4v"
          href="/formulaires-feuilles-de-routes-territoriales?changer=1"
        >
          Commencer un nouveau formulaire de feuilles de route territoriales
        </Link>
      </>
    ) : (
      <Link
        className="fr-link fr-mt-4v"
        href="/formulaires-feuilles-de-routes-territoriales"
      >
        Accéder aux formulaires de feuilles de route territoriales
      </Link>
    )

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
          {demoFormAccess}
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
          {demoFormAccess}
        </>
      )
      break
    }
    case 'PrefectureDepartement': {
      roleNotice = (
        <>
          <Notice
            className="fr-mb-6v"
            title="Vous êtes connecté à Espace France Numérique Ensemble avec un rôle 'préfecture' vous permettant d'accéder à toutes les fonctionnalités concernant votre département"
          />
          <Link
            className="fr-link fr-mt-4v"
            href={`/tableau-de-bord/departement/${user.roleScope ?? ''}`}
          >
            Accéder au tableau de bord de votre département
          </Link>
        </>
      )
      break
    }
    case 'PrefectureRegion': {
      roleNotice = (
        <>
          <Notice
            className="fr-mb-6v"
            title="Vous êtes connecté à Espace France Numérique Ensemble avec un rôle 'préfecture' vous permettant d'accéder à toutes les fonctionnalités concernant votre région"
          />
          <Link
            className="fr-link fr-mt-4v"
            href={`/tableau-de-bord/region/${user.roleScope ?? ''}`}
          >
            Accéder au tableau de bord de votre région
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
