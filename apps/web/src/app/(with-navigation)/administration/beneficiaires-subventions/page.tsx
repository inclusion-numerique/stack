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
import BeneficiairesSubventionsDataFilters from '@app/web/app/(with-navigation)/administration/beneficiaires-subventions/BeneficiairesSubventionsDataFilters'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: AdministrationBeneficiairesSubventionsDataTableSearchParams
}) => {
  const allData = await getAdministrationBeneficiairesSubventionsData()

  console.log('DATA', allData)

  const searchedData = applyDataTableSearch(
    searchParams.recherche,
    allData,
    AdministrationBeneficiairesSubventionsDataTable,
  )
  const filteredData = applyDataTableFilters(
    searchParams,
    searchedData,
    AdministrationBeneficiairesSubventionsDataTable,
  )

  const data = applyDataTableOrdering(
    searchParams,
    filteredData,
    AdministrationBeneficiairesSubventionsDataTable,
  )

  const { montantDemandeTotal, demandesCounts } =
    getAdministrationBeneficiairesSubventionsMetadata(data)

  return (
    <AdministrationDataPage
      title="Bénéficiaires subventions"
      filters={
        <BeneficiairesSubventionsDataFilters searchParams={searchParams} />
      }
      data={data}
      baseHref="/administration/beneficiaires-subventions"
      dataTableConfiguration={AdministrationBeneficiairesSubventionsDataTable}
      searchParams={searchParams}
      infoContents={
        <ul className="fr-m-0 fr-text--sm">
          <li>
            Total des fonds demandés&nbsp;:&nbsp;
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
