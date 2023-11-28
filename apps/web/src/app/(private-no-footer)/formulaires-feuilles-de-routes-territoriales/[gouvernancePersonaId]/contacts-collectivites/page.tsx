import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import BackLink from '@app/web/components/BackLink'
import ProgressFormulairesFeuillesDeRoute from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ProgressFormulairesFeuillesDeRoute'
import { getEtapeInfo } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import ContactsCollectivites from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/contacts-collectivites/ContactsCollectivites'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

const Page = async (props: PageFormulaireProps) => {
  const { formulaireGouvernance, persona, retourHref, breadcrumbs } =
    await getPageFormulaireData(props, 'contacts-collectivites')

  if (!persona) {
    throw new Error('contacts-page: persona is missing')
  }

  const nextEtapeInfo = getEtapeInfo({
    etape: 'autres-structures',
    gouvernancePersonaId: persona.id,
  })

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs {...breadcrumbs} />
      </div>
      <div className="fr-container fr-container--medium formulaire-gouvernance-no-footer-margin-bottom">
        <BackLink href={retourHref} />

        <ProgressFormulairesFeuillesDeRoute
          progression={3}
          currentTitle="Contacts des collectivités partenaires"
          nextTitle="Autres structures impliquées"
        />
        <h1 className="fr-text-title--blue-france fr-mb-2v">
          Contacts des collectivités partenaires
        </h1>
        <p className="fr-text--lg fr-text-mention--grey fr-mb-2v">
          Veuillez renseigner un contact pour chacune des collectivités
          partenaires.
        </p>
        <ContactsCollectivites
          formulaireGouvernance={formulaireGouvernance}
          nextEtapePath={nextEtapeInfo.absolutePath}
        />
      </div>
    </>
  )
}

export default Page
