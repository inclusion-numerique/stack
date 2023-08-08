import { notFound, redirect } from 'next/navigation'
import React from 'react'
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
import {
  EtapeFormulaireGouvernance,
  linkToFormulaireGouvernanceParticiper,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import { getFormulaireGouvernanceForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import Porter from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/formulaire/porter-une-feuille-de-route/Porter'

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
    title: `Porter une feuille de route territoriale`,
  }
}

const Page = async ({
  params: { gouvernancePersonaId },
  searchParams: { etape } = {},
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
  searchParams?: { etape?: EtapeFormulaireGouvernance }
}) => {
  const persona = gouvernancePersonas[gouvernancePersonaId]
  const user = await getAuthenticatedSessionUser()
  const formulaireGouvernance = await getFormulaireGouvernanceForForm({
    userId: user.id,
  })

  if (
    !formulaireGouvernance ||
    formulaireGouvernance.gouvernancePersona !== user.gouvernancePersona
  ) {
    // Wrong persona, intention or missing formulaire. We redirect to persona / form creation page
    redirect(`/formulaires-feuilles-de-routes-territoriales`)
    return null
  }

  if (formulaireGouvernance.intention !== 'Porter') {
    // Wrong intention, we redirect to correct intention page
    redirect(linkToFormulaireGouvernanceParticiper(persona.id))

    return null
  }

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage="Porter une feuille de route territoriale"
          parents={[
            {
              label: 'Formulaires feuilles de routes territoriales',
              linkProps: { href: '/gouvernance' },
            },
            {
              label: persona.title,
              linkProps: {
                href: `/formulaires-feuilles-de-routes-territoriales/${gouvernancePersonaId}`,
              },
            },
          ]}
        />
      </div>

      <div className="fr-container fr-container--narrow">
        <Porter
          persona={persona}
          formulaireGouvernance={formulaireGouvernance}
          etape={etape}
        />
      </div>
    </>
  )
}

export default Page
