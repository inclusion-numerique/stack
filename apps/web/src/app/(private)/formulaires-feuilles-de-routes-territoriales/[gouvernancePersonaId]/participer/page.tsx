import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { prismaClient } from '@app/web/prismaClient'
import { OptionTuple } from '@app/web/utils/options'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import Participer from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/participer/Participer'
import BackLink from '@app/web/components/BackLink'
import { getDepartementOptions } from '@app/web/data/getDepartementOptions'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

/**
 * This page redirects to the current step of the form
 */
const Page = async (props: PageFormulaireProps) => {
  const { persona, formulaireGouvernance, breadcrumbs, retourHref } =
    await getPageFormulaireData(props, 'participer')

  if (!persona) {
    throw new Error('participer page: persona is missing')
  }

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
    getDepartementOptions(),
  ])

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs {...breadcrumbs} />
      </div>

      <div className="fr-container fr-container--narrow">
        <BackLink href={retourHref} />
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
