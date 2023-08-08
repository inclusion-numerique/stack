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
import { linkToFormulaireGouvernancePorter } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import { getFormulaireGouvernanceForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import Participer from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/formulaire/participer/Participer'

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
    title: `Participer à l’élaboration des feuilles de routes territoriales`,
  }
}

const Page = async ({
  params: { gouvernancePersonaId },
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
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

  if (formulaireGouvernance.intention !== 'Participer') {
    // Wrong intention, we redirect to correct intention page
    redirect(linkToFormulaireGouvernancePorter(persona.id))

    return null
  }

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage="Participer à l’élaboration des feuilles de routes territoriales"
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
        <Participer
          persona={persona}
          formulaireGouvernance={formulaireGouvernance}
        />
      </div>
    </>
  )
}

export default Page
