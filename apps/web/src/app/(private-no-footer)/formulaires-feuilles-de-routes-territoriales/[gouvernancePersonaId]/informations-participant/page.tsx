import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import InformationsParticipants from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/informations-participant/InformationsParticipants'
import { prismaClient } from '@app/web/prismaClient'
import { OptionTuple } from '@app/web/utils/options'
import BackLink from '@app/web/components/BackLink'
import Progress from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/Progress'
import { getEtapeInfo } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'

export const dynamic = 'force-dynamic'

export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

/**
 * This page redirects to the current step of the form
 */
const Page = async (props: PageFormulaireProps) => {
  const { user, formulaireGouvernance, persona } = await getPageFormulaireData(
    props,
    'informations-participant',
  )

  const nextEtapeInfo = getEtapeInfo('perimetre-feuille-de-route', persona.id)

  const [optionsRegions, optionsDepartements] = await Promise.all([
    prismaClient.region
      .findMany({
        select: {
          code: true,
          nom: true,
        },
        orderBy: {
          nom: 'asc',
        },
      })
      .then((regions) =>
        regions.map(({ code, nom }): OptionTuple => [code, nom]),
      ),
    prismaClient.departement
      .findMany({
        select: {
          code: true,
          nom: true,
        },
        orderBy: {
          code: 'asc',
        },
      })
      .then((departements) =>
        departements.map(
          ({ code, nom }): OptionTuple => [code, `${code} · ${nom}`],
        ),
      ),
  ])

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
          progression={1}
          currentTitle={`Renseignez votre ${persona.labelTitle}`}
          nextTitle="Périmètre de votre feuille de route"
        />

        <InformationsParticipants
          formulaireGouvernance={formulaireGouvernance}
          persona={persona}
          optionsRegions={optionsRegions}
          optionsDepartements={optionsDepartements}
          nextEtapePath={nextEtapeInfo.absolutePath}
        />
      </div>
    </>
  )
}

export default Page
