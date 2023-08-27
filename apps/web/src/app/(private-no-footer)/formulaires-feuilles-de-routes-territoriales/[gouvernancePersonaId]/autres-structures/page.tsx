import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import BackLink from '@app/web/components/BackLink'
import Progress from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/Progress'
import { getEtapeInfo } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import AutresStructures from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/autres-structures/AutresStructures'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

const Page = async (props: PageFormulaireProps) => {
  const { formulaireGouvernance, persona } = await getPageFormulaireData(
    props,
    'autres-structures',
  )

  const nextEtapeInfo = getEtapeInfo('recapitulatif', persona.id)

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
      <div className="fr-container fr-container--medium formulaire-gouvernance-no-footer-margin-bottom">
        <BackLink href="/formulaires-feuilles-de-routes-territoriales" />

        <Progress
          progression={3}
          currentTitle="Autres structures impliquées"
          nextTitle="Récapitulatif de votre feuille de route"
        />
        <h1 className="fr-text-title--blue-france fr-mb-2v">
          Autres structures impliquées
        </h1>
        <p className="fr-text--lg fr-text-mention--grey fr-mb-12v">
          Renseignez ici les autres personnes morales publiques ou privées
          (associations, opérateurs de services publics, entreprises) qui vont
          faire partie de votre feuille de route.
        </p>
        <AutresStructures
          formulaireGouvernance={formulaireGouvernance}
          nextEtapePath={nextEtapeInfo.absolutePath}
        />
      </div>
    </>
  )
}

export default Page
