import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
  personaPeutPorterUneFeuilleDeRoute,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToGouvernanceForm } from '@app/web/security/securityRules'
import { getCurrentFormulaireGouvernanceForFormByUser } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
import {
  EtapeFormulaireGouvernance,
  getEtapeEnCours,
  getEtapeInfo,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import { BreadcrumbsProps } from '@app/web/components/Breadcrumbs'

export type PageFormulaireProps<
  SearchParams = Record<string, string | undefined>,
> = {
  params: { gouvernancePersonaId: GouvernancePersonaId }
  searchParams?: SearchParams
}

export const pageFormulaireMetadata: Metadata = {
  title: `Formulaires feuilles de routes territoriales`,
}

// Etapes de formulaires qui peuvent etre sur des parcours "parallèle" pour une persona
// qui peut soit porter soit participer
const forkedEtapes = new Set<EtapeFormulaireGouvernance>([
  'participer',
  'informations-participant',
  'perimetre-feuille-de-route',
  'contacts-collectivites',
  'autres-structures',
  'recapitulatif',
])

// Returns metadata for formulaire and redirect to right page step if needed
export const getPageFormulaireData = async (
  { params: { gouvernancePersonaId: pagePersonaId } }: PageFormulaireProps,
  pageEtape: EtapeFormulaireGouvernance | null,
) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(
      pagePersonaId
        ? `/connexion?suivant=/formulaires-feuilles-de-routes-territoriales/${pagePersonaId}`
        : `/connexion?suivant=/formulaires-feuilles-de-routes-territoriales`,
    )
  }

  if (pagePersonaId && !(pagePersonaId in gouvernancePersonas)) {
    notFound()
  }

  if (!hasAccessToGouvernanceForm(user)) {
    redirect(`/profil`)
  }

  const formulaireGouvernance =
    await getCurrentFormulaireGouvernanceForFormByUser(user.id)

  if (!formulaireGouvernance) {
    // Wrong persona or missing formulaire. We redirect to persona / form creation page
    redirect(`/gouvernance`)
  }

  const gouvernancePersonaId =
    formulaireGouvernance.gouvernancePersona as GouvernancePersonaId | null

  if (!!pagePersonaId && pagePersonaId !== gouvernancePersonaId) {
    redirect('/formulaires-feuilles-de-routes-territoriales')
  }

  const persona = gouvernancePersonaId
    ? gouvernancePersonas[gouvernancePersonaId]
    : null

  const etapeCourante = getEtapeEnCours({
    formulaireGouvernance,
    user,
  })

  const etapeCouranteInfo = getEtapeInfo({
    gouvernancePersonaId: persona?.id,
    etape: etapeCourante,
  })

  const etapePageInfo = pageEtape
    ? getEtapeInfo({
        gouvernancePersonaId: persona?.id,
        etape: pageEtape,
      })
    : null

  // User has accessed forbidden etape, we redirect to current etape
  if (
    pageEtape &&
    etapeCourante !== pageEtape &&
    !etapeCouranteInfo.etapesAccessibles.includes(pageEtape)
  ) {
    redirect(etapeCouranteInfo.absolutePath)
  }

  const retourHref = etapePageInfo?.retour
    ? getEtapeInfo({
        gouvernancePersonaId: persona?.id,
        etape: etapePageInfo.retour,
      }).absolutePath
    : '/gouvernance'

  const isForked =
    !!pageEtape &&
    !!persona &&
    personaPeutPorterUneFeuilleDeRoute(persona.id) &&
    forkedEtapes.has(pageEtape)

  const breadcrumbs = {
    currentPage: isForked
      ? pageEtape === 'participer'
        ? 'Participer à une feuille de route territoriale'
        : 'Porter une feuille de route territoriale'
      : persona?.title ?? 'Choix du formulaire à compléter',
    parents: [
      {
        label: 'Formulaires feuilles de routes territoriales',
        linkProps: { href: '/gouvernance' },
      },
    ],
  } satisfies BreadcrumbsProps

  if (isForked) {
    breadcrumbs.parents.push({
      label: persona.title,
      linkProps: {
        href: getEtapeInfo({
          etape: 'porter-ou-participer',
          gouvernancePersonaId,
        }).absolutePath,
      },
    })
  }

  return {
    user,
    persona,
    formulaireGouvernance,
    etapeCourante,
    etapeCouranteInfo,
    etapePageInfo,
    retourHref,
    breadcrumbs,
  }
}

export type PageFormulaireData = Awaited<
  ReturnType<typeof getPageFormulaireData>
>
