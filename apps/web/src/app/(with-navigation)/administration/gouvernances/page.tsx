import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import AdministrationDataPage from '@app/web/app/(with-navigation)/administration/AdministrationDataPage'
import { numberToEuros } from '@app/web/utils/formatNumber'
import GouvernancesDataFilters from '@app/web/app/(with-navigation)/administration/gouvernances/GouvernancesDataFilters'
import {
  getAdministrationGouvernancesData,
  getAdministrationGouvernancesMetadata,
} from '@app/web/app/(with-navigation)/administration/gouvernances/getAdministrationGouvernances'
import {
  AdministrationGouvernancesDataTable,
  AdministrationGouvernancesDataTableSearchParams,
} from '@app/web/app/(with-navigation)/administration/gouvernances/AdministrationGouvernancesDataTable'
import { applyDataTableSearch } from '@app/web/data-table/applyDataTableSearch'
import { applyDataTableOrdering } from '@app/web/data-table/applyDataTableOrdering'
import { applyDataTableFilters } from '@app/web/data-table/applyDataTableFilters'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: AdministrationGouvernancesDataTableSearchParams
}) => {
  const allData = await getAdministrationGouvernancesData()

  const searchedData = applyDataTableSearch(
    searchParams.recherche,
    allData,
    AdministrationGouvernancesDataTable,
  )
  const filteredData = applyDataTableFilters(
    searchParams,
    searchedData,
    AdministrationGouvernancesDataTable,
  )

  const data = applyDataTableOrdering(
    searchParams,
    filteredData,
    AdministrationGouvernancesDataTable,
  )

  const {
    dotationIngenierieTotale,
    montantDemandeTotal,
    demandesCounts,
    dotationTotale,
  } = getAdministrationGouvernancesMetadata(data)

  return (
    <AdministrationDataPage
      title="Gouvernances"
      filters={<GouvernancesDataFilters searchParams={searchParams} />}
      data={data}
      baseHref="/administration/gouvernances"
      dataTableConfiguration={AdministrationGouvernancesDataTable}
      searchParams={searchParams}
      infoContents={
        <ul className="fr-m-0 fr-text--sm">
          <li>
            Dotation totale&nbsp;:&nbsp;<b>{numberToEuros(dotationTotale)}</b>
          </li>
          <li>
            Dotation ingénierie&nbsp;:&nbsp;
            <b>{numberToEuros(dotationIngenierieTotale)}</b>
          </li>
          <li>
            Total des demandes en ingénierie&nbsp;:&nbsp;
            <b>{numberToEuros(montantDemandeTotal)}</b>
          </li>
          <li>
            <b>{demandesCounts.total}</b> demandes de subventions (
            {demandesCounts.enCours} en cours, {demandesCounts.aInstruire} à
            instruire, {demandesCounts.validees} validée
            {sPluriel(demandesCounts.validees)})
          </li>
        </ul>
      }
    />
  )
}

export default Page
