import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(public)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import BackLink from '@app/web/components/BackLink'
import ProgressFormulairesFeuillesDeRoute from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/ProgressFormulairesFeuillesDeRoute'
import Recapitulatif from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/recapitulatif/Recapitulatif'
import { getEtapeInfo } from '@app/web/app/(public)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import RecapitulatifSection from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/recapitulatif/RecapitulatifSection'
import { getRecapitulatifCounts } from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/recapitulatif/getRecapitulatifCounts'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(public)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

const Page = async (props: PageFormulaireProps) => {
  const { formulaireGouvernance, persona, retourHref, breadcrumbs } =
    await getPageFormulaireData(props, 'recapitulatif')

  if (!persona) {
    throw new Error('recapitulatif page: persona is missing')
  }

  const nextEtape = getEtapeInfo({
    etape: 'confirmation-formulaire-envoye',
    gouvernancePersonaId: persona.id,
  })

  const recapitulatifCounts = getRecapitulatifCounts(formulaireGouvernance)

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs {...breadcrumbs} />
      </div>
      <div className="fr-container fr-container--medium formulaire-gouvernance-no-footer-margin-bottom">
        <BackLink href={retourHref} />

        <ProgressFormulairesFeuillesDeRoute
          progression={5}
          currentTitle="Récapitulatif de votre feuille de route"
        />
        <RecapitulatifSection
          persona={persona}
          formulaireGouvernance={formulaireGouvernance}
          recapitulatifCounts={recapitulatifCounts}
        />

        <Recapitulatif
          missingContacts={recapitulatifCounts.missingContacts}
          formulaireGouvernanceId={formulaireGouvernance.id}
          nextEtapePath={nextEtape.absolutePath}
        />
      </div>
    </>
  )
}

export default Page
