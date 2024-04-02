import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import {
  AdministrationBeneficiairesSubventionsDataTable,
  AdministrationBeneficiairesSubventionsDataTableSearchParams,
} from '@app/web/app/(with-navigation)/administration/beneficiaires-subventions/AdministrationBeneficiairesSubventionsDataTable'
import { applyDataTableSearch } from '@app/web/data-table/applyDataTableSearch'
import { applyDataTableFilters } from '@app/web/data-table/applyDataTableFilters'
import { applyDataTableOrdering } from '@app/web/data-table/applyDataTableOrdering'
import AdministrationDataPage from '@app/web/app/(with-navigation)/administration/AdministrationDataPage'
import { numberToEuros } from '@app/web/utils/formatNumber'
import {
  getAdministrationBeneficiairesSubventionsData,
  getAdministrationBeneficiairesSubventionsMetadata,
} from '@app/web/app/(with-navigation)/administration/beneficiaires-subventions/getAdministrationBeneficiairesSubventions'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const baseHref = '/administration/beneficiaires-subventions'

const Page = async ({
  searchParams,
}: {
  searchParams: AdministrationBeneficiairesSubventionsDataTableSearchParams
}) => {
  const allData = await getAdministrationBeneficiairesSubventionsData({})

  const searchedData = applyDataTableSearch(
    searchParams.recherche,
    allData,
    AdministrationBeneficiairesSubventionsDataTable,
  )
  const { filteredData, filterValues } = applyDataTableFilters(
    searchParams,
    searchedData,
    AdministrationBeneficiairesSubventionsDataTable,
  )

  const data = applyDataTableOrdering(
    searchParams,
    filteredData,
    AdministrationBeneficiairesSubventionsDataTable,
  )

  const {
    montantIngenierieTotal,
    montantFormationTotal,
    montantTotal,
    demandesCounts,
  } = getAdministrationBeneficiairesSubventionsMetadata(data)

  return (
    <AdministrationDataPage
      title="Bénéficiaires subventions"
      data={data}
      baseHref={baseHref}
      dataTableConfiguration={AdministrationBeneficiairesSubventionsDataTable}
      filterValues={filterValues}
      searchParams={searchParams}
      infoContents={
        <ul className="fr-m-0 fr-text--sm">
          <li>
            Total des fonds demandés&nbsp;:&nbsp;
            <b>{numberToEuros(montantTotal)}</b>
          </li>
          <li>
            Subventions ingénierie&nbsp;:&nbsp;
            <b>{numberToEuros(montantIngenierieTotal)}</b>
          </li>
          <li>
            Subventions formation&nbsp;:&nbsp;
            <b>{numberToEuros(montantFormationTotal)}</b>
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
