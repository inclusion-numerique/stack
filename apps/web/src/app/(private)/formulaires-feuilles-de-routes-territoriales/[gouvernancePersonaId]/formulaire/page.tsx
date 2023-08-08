import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
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
import ChoixIntention from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/formulaire/ChoixIntention'
import { linkToFormulaireGouvernanceParticiper } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import { userCurrentFormulaireWhere } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'

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
    title: `Formulaires feuilles de routes territoriales`,
  }
}

const personaThatCanChooseIntention = new Set<GouvernancePersonaId>([
  'epci',
  'conseil-departemental',
  'conseil-regional',
])

const personaCanChooseIntention = (
  gouvernancePersonaId: GouvernancePersonaId,
) => personaThatCanChooseIntention.has(gouvernancePersonaId)

/**
 * Cette page permet de choisir l'intention du formulaire de gouvernance (porter ou participer)
 * Si la persona ne permet pas de choisir, on redirige vers la page de formulaire
 */
const Page = async ({
  params: { gouvernancePersonaId },
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
}) => {
  const persona = gouvernancePersonas[gouvernancePersonaId]
  const user = await getSessionUser()

  if (!user) {
    redirect(
      `/connexion?suivant=/formulaires-feuilles-de-routes-territoriales/${gouvernancePersonaId}`,
    )
  }

  const formulaireGouvernance =
    await prismaClient.formulaireGouvernance.findFirst({
      where: userCurrentFormulaireWhere(user.id),
      select: {
        id: true,
        gouvernancePersona: true,
        intention: true,
      },
    })

  if (
    !formulaireGouvernance ||
    formulaireGouvernance.gouvernancePersona !== user.gouvernancePersona
  ) {
    // Wrong persona or missing formulaire. We redirect to persona / form creation page
    redirect(`/formulaires-feuilles-de-routes-territoriales`)
    return null
  }

  // Set the intention of the form if the persona can only have one intention
  if (
    !formulaireGouvernance.intention &&
    !personaCanChooseIntention(persona.id)
  ) {
    await prismaClient.formulaireGouvernance.update({
      where: {
        id: formulaireGouvernance.id,
      },
      data: {
        intention: 'Participer',
      },
    })

    redirect(linkToFormulaireGouvernanceParticiper(persona.id))

    return null
  }

  // If the form persona can only have one intention, we redirect to "Participer"
  if (!personaCanChooseIntention(persona.id)) {
    redirect(linkToFormulaireGouvernanceParticiper(persona.id))
    return null
  }

  // If the form persona can have both intention "porter" and "participer", we make the user choose
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
        <ChoixIntention
          persona={persona}
          formulaireGouvernance={formulaireGouvernance}
        />
      </div>
    </>
  )
}

export default Page
