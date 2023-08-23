import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ContainerCard from '@app/web/components/ContainerCard'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

/**
 * This page redirects to the current step of the form
 */
const Page = async (props: PageFormulaireProps) => {
  const { user, formulaireGouvernance, persona } = await getPageFormulaireData(
    props,
    'confirmation-formulaire-envoye',
  )

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
      <ContainerCard
        illustrationSrc="/dsfr/artwork/pictograms/system/success.svg"
        className="fr-text--center"
      >
        <h2 className="fr-mb-4v">Votre réponse a bien été envoyée&nbsp;!</h2>
        <p className="fr-mb-0">
          Les informations récoltés seront mis à disposition de la préfecture de
          votre département afin d’organiser la gouvernance d’Inclusion
          Numérique sur votre territoire.
        </p>
        <div className="fr-btns-group fr-mt-10v fr-mb-0">
          <Button
            className="fr-my-0"
            linkProps={{
              href: '/',
            }}
          >
            J’ai compris
          </Button>
        </div>
      </ContainerCard>
    </>
  )
}

export default Page
