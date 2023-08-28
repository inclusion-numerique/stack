import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToGouvernanceForm } from '@app/web/security/securityRules'
import { getFormulaireGouvernanceForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import {
  EtapeFormulaireGouvernance,
  getEtapeFormulaire,
  getInfoEtapeFormulaire,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'

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
export const getPageFormulaireData = async (
  { params: { gouvernancePersonaId } }: PageFormulaireProps,
  pageEtape: EtapeFormulaireGouvernance | null,
) => {
  const user = await getSessionUser()

  if (!user) {
    console.log('No user, redirecting')
    redirect(
      gouvernancePersonaId
        ? `/connexion?suivant=/formulaires-feuilles-de-routes-territoriales/${gouvernancePersonaId}`
        : `/connexion?suivant=/formulaires-feuilles-de-routes-territoriales`,
    )
  }

  if (gouvernancePersonaId && !(gouvernancePersonaId in gouvernancePersonas)) {
    console.log('Invalid gouvernancePersona, notFound()', {
      gouvernancePersonaId,
    })

    notFound()
  }

  if (!hasAccessToGouvernanceForm(user)) {
    console.log('No access to forms, redirecting')

    redirect(`/profil`)
  }

  const persona = gouvernancePersonas[gouvernancePersonaId]

  const formulaireGouvernanceData = await getFormulaireGouvernanceForForm({
    userId: user.id,
  })

  if (!formulaireGouvernanceData) {
    console.log('User has no current formulaire, redirect to CTA', {
      formulaireGouvernanceData,
      user,
    })

    // Wrong persona or missing formulaire. We redirect to persona / form creation page
    redirect(`/gouvernance`)
  }

  const formulaireGouvernance = {
    ...formulaireGouvernanceData,
  }
  const etapeCourante = getEtapeFormulaire({
    formulaireGouvernance,
    user,
  })
  const etapeInfo = getInfoEtapeFormulaire({
    formulaireGouvernance,
    user,
  })

  // User has accessed forbidden etape, we redirect to current etape
  if (
    pageEtape &&
    etapeCourante.etape !== pageEtape &&
    !etapeCourante.etapesAccessibles.includes(pageEtape)
  ) {
    console.log('User has accessed forbidden etape, redirecting', {
      etapeInfo,
      pageEtape,
    })
    redirect(etapeInfo.absolutePath)
  }

  console.log('Page Data', {
    user,
    persona,
    formulaireGouvernance,
    etapeCourante,
    etapeInfo,
  })

  return {
    user,
    persona,
    formulaireGouvernance,
    etapeCourante,
    etapeInfo,
  }
}

export type PageFormulaireData = Awaited<
  ReturnType<typeof getPageFormulaireData>
>
