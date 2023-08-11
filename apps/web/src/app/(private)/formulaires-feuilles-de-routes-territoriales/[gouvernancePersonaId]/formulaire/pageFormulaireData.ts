import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  hasAccessToGouvernanceForm,
  hasAccessToGouvernanceFormDevelopmentPreview,
} from '@app/web/security/securityRules'
import { prismaClient } from '@app/web/prismaClient'
import { userCurrentFormulaireParams } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'

export type PageFormulaireProps<
  SearchParams = Record<string, string | undefined>,
> = {
  params: { gouvernancePersonaId: GouvernancePersonaId }
  searchParams?: SearchParams
}

export const pageFormulaireMetadata: Metadata = {
  title: `Formulaires feuilles de routes territoriales`,
}

// Returns metadata for formulaire and redirect to right page step if needed
export const getPageFormulaireData = async ({
  params: { gouvernancePersonaId },
}: PageFormulaireProps) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(
      gouvernancePersonaId
        ? `/connexion?suivant=/formulaires-feuilles-de-routes-territoriales/${gouvernancePersonaId}`
        : `/connexion?suivant=/formulaires-feuilles-de-routes-territoriales`,
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

  const persona = gouvernancePersonas[gouvernancePersonaId]

  const formulaireGouvernance =
    await prismaClient.formulaireGouvernance.findFirst({
      ...userCurrentFormulaireParams(user.id),
      select: {
        id: true,
        gouvernancePersona: true,
        intention: true,
        etapeContacts: true,
        etapeStructures: true,
        etapeInformationsParticipant: true,
        etapePerimetre: true,
        confirmeEtEnvoye: true,
      },
    })

  if (
    !formulaireGouvernance ||
    formulaireGouvernance.gouvernancePersona !== user.gouvernancePersona
  ) {
    // Wrong persona or missing formulaire. We redirect to persona / form creation page
    redirect(`/formulaires-feuilles-de-routes-territoriales`)
  }

  return { user, persona, formulaireGouvernance }
}
