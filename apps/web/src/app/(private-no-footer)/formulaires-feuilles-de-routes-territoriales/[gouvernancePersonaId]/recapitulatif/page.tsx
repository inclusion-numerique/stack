import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import BackLink from '@app/web/components/BackLink'
import Progress from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/Progress'
import Recapitulatif from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/recapitulatif/Recapitulatif'
import { getEtapeInfo } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import RecapitulatifSection from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/recapitulatif/RecapitulatifSection'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

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

  const totalCollectivites =
    formulaireGouvernance.departementsParticipants.length +
    formulaireGouvernance.epcisParticipantes.length +
    formulaireGouvernance.communesParticipantes.length

  const totalContacts =
    formulaireGouvernance.departementsParticipants.filter(
      (participant) => !!participant.contact,
    ).length +
    formulaireGouvernance.epcisParticipantes.filter(
      (participant) => !!participant.contact,
    ).length +
    formulaireGouvernance.communesParticipantes.filter(
      (participant) => !!participant.contact,
    ).length

  const missingContacts = totalCollectivites - totalContacts

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs {...breadcrumbs} />
      </div>
      <div className="fr-container fr-container--medium formulaire-gouvernance-no-footer-margin-bottom">
        <BackLink href={retourHref} />

        <Progress
          progression={5}
          currentTitle="Récapitulatif de votre feuille de route"
        />
        <RecapitulatifSection
          persona={persona}
          formulaireGouvernance={formulaireGouvernance}
          missingContacts={missingContacts}
          totalConcats={totalContacts}
          totalCollectivites={totalCollectivites}
        />

        <Recapitulatif
          missingContacts={missingContacts}
          formulaireGouvernanceId={formulaireGouvernance.id}
          nextEtapePath={nextEtape.absolutePath}
        />
      </div>
    </>
  )
}

export default Page
