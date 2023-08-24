import React from 'react'
import {
  GouvernancePersonaId,
  personaPeutPorterUneFeuilleDeRoute,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { prismaClient } from '@app/web/prismaClient'
import { OptionTuple } from '@app/web/utils/options'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import Participer from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/participer/Participer'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

/**
 * This page redirects to the current step of the form
 */
const Page = async (props: PageFormulaireProps) => {
  const { persona, formulaireGouvernance } = await getPageFormulaireData(
    props,
    'participer',
  )

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
        {personaPeutPorterUneFeuilleDeRoute(
          // TODO Breadcrumbs from helper fonctions
          formulaireGouvernance.gouvernancePersona as GouvernancePersonaId,
        ) ? (
          <Breadcrumbs
            currentPage="Participer à l’élaboration des feuilles de routes territoriales"
            parents={[
              {
                label: 'Formulaires feuilles de routes territoriales',
                linkProps: { href: '/gouvernance' },
              },
              {
                label: persona.shortTitle ?? persona.title,
                linkProps: {
                  href: `/formulaires-feuilles-de-routes-territoriales/${persona.id}`,
                },
              },
            ]}
          />
        ) : (
          <Breadcrumbs
            currentPage={persona.shortTitle ?? persona.title}
            parents={[
              {
                label: 'Formulaires feuilles de routes territoriales',
                linkProps: { href: '/gouvernance' },
              },
            ]}
          />
        )}
      </div>

      <div className="fr-container fr-container--narrow">
        <Participer
          persona={persona}
          formulaireGouvernance={formulaireGouvernance}
          optionsRegions={optionsRegions}
          optionsDepartements={optionsDepartements}
        />
      </div>
    </>
  )
}

export default Page
