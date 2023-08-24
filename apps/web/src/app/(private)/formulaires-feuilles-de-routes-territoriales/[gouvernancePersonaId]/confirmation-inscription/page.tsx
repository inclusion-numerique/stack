import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ContainerCard from '@app/web/components/ContainerCard'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import { getEtapeInfo } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

/**
 * This page redirects to the current step of the form
 */
const Page = async (props: PageFormulaireProps) => {
  const { user, persona, developmentPreview } = await getPageFormulaireData(
    props,
    'confirmation-inscription',
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
        className={developmentPreview ? 'fr-mb-8v' : undefined}
      >
        <h2 className="fr-mb-4v">Votre inscription est confirmée</h2>
        <p className="fr-mb-0">
          Un mail de confirmation vous a été envoyé à l’adresse{' '}
          <strong>{user.email}</strong> avec le récapitulatif des informations
          qui vous seront demandées pour compléter ce formulaire.
          <br />
          <br />
          Vous serez informé par mail lorsque les formulaires seront prêts à
          être complétés.
        </p>
      </ContainerCard>

      {developmentPreview && (
        <div className="fr-container fr-container--narrow">
          <Notice title="Vous avez été autorisé(e) à accéder aux formulaires en cours de développement" />
          <Button
            className="fr-mt-8v fr-mb-20v"
            priority="secondary"
            iconId="fr-icon-arrow-right-line"
            linkProps={{
              href: getEtapeInfo('porter-ou-participer', persona.id)
                .absolutePath,
            }}
          >
            Accéder au formulaire en cours de développement
          </Button>
        </div>
      )}
    </>
  )
}

export default Page
