import { notFound, redirect } from 'next/navigation'
import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import {
  getAuthenticatedSessionUser,
  getSessionUser,
} from '@app/web/auth/getSessionUser'
import {
  hasAccessToGouvernanceForm,
  hasAccessToGouvernanceFormDevelopmentPreview,
} from '@app/web/security/securityRules'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { prismaClient } from '@app/web/prismaClient'

export const generateMetadata = async ({
  params: { gouvernancePersonaId },
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
}) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(
      `/connexion?suivant=/formulaires-feuilles-de-routes-territoriales/${gouvernancePersonaId}`,
    )
  }

  if (!(gouvernancePersonaId in gouvernancePersonas)) {
    notFound()
  }

  if (
    !hasAccessToGouvernanceForm(user) ||
    !hasAccessToGouvernanceFormDevelopmentPreview(user)
  ) {
    redirect(`/profil`)
  }

  // User has accessed wrong url
  if (gouvernancePersonaId !== user.gouvernancePersona) {
    redirect(
      user.gouvernancePersona
        ? `/formulaires-feuilles-de-routes-territoriales/${user.gouvernancePersona}`
        : '/formulaires-feuilles-de-routes-territoriales',
    )
  }

  return {
    title: `Inscription confirmée`,
  }
}

const Page = async ({
  params: { gouvernancePersonaId },
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
}) => {
  const persona = gouvernancePersonas[gouvernancePersonaId]
  const user = await getAuthenticatedSessionUser()
  const formulaireGouvernance =
    await prismaClient.formulaireGouvernance.findFirst({
      where: {
        participants: {
          some: {
            id: user.id,
          },
        },
      },
    })

  if (!formulaireGouvernance) {
    // Missing formulaire, this is very unlikely. We redirect to persona / form creation page
    redirect(`/formulaires-feuilles-de-routes-territoriales`)
    return null
  }

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage={persona.title}
          parents={[
            {
              label: 'Formulaires feuilles de routes territoriales',
              linkProps: { href: '/gouvernance' },
            },
          ]}
        />
      </div>

      <div className="fr-container fr-container--narrow">
        <Notice title="🚧 En cours de développement 🚧" />
      </div>
    </>
  )
}

export default Page
