import React from 'react'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ChoixIntention from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/porter-ou-participer/ChoixIntention'
import BackLink from '@app/web/components/BackLink'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

/**
 * Cette page permet de choisir l'intention du formulaire de gouvernance (porter ou participer)
 */
const Page = async (props: PageFormulaireProps) => {
  const { persona, formulaireGouvernance, retourHref } =
    await getPageFormulaireData(props, 'porter-ou-participer')

  if (!persona) {
    throw new Error('porter-ou-participer: persona is missing')
  }

  const personaSentenceIntro =
    persona.id === 'conseil-regional'
      ? 'En tant que conseil régional'
      : persona.id === 'conseil-departemental'
      ? 'En tant que conseil départemental'
      : persona.id === 'epci'
      ? 'En tant qu’EPCI ou groupement de communes'
      : persona.id === 'commune'
      ? 'En tant que commune'
      : 'En tant que structure'

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
        <BackLink href={retourHref} />
        <h2 className="fr-text-title--blue-france fr-mt-8v fr-mb-4v">
          {persona.title}
        </h2>
        <p className="fr-text--lg fr-mb-12v fr-mt-4v">
          {personaSentenceIntro}, vous pouvez porter une feuille de route ou
          participer à l’élaboration des feuilles de routes territoriales qui
          seront proposées.
        </p>
        <ChoixIntention formulaireGouvernance={formulaireGouvernance} />
      </div>
    </>
  )
}

export default Page
