import React from 'react'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ChoixIntention from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/porter-ou-participer/ChoixIntention'

export const dynamic = 'force-dynamic'

export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

/**
 * Cette page permet de choisir l'intention du formulaire de gouvernance (porter ou participer)
 */
const Page = async (props: PageFormulaireProps) => {
  const { etapeInfo, etapeCourante, persona, user, formulaireGouvernance } =
    await getPageFormulaireData(props, 'porter-ou-participer')

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
