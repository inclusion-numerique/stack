import { SearchBeneficiaireResult } from '@app/web/beneficiaire/searchBeneficiaire'
import DataTable from '@app/web/data-table/DataTable'
import {
  BeneficiairesDataTable,
  BeneficiairesDataTableSearchParams,
} from '@app/web/beneficiaire/BeneficiairesDataTable'
import PaginationNavWithPageSizeSelect from '@app/web/data-table/PaginationNavWithPageSizeSelect'
import { generatePageSizeSelectOptions } from '@app/web/data-table/pageSizeSelectOptions'
import styles from './MesBeneficiairesListePage.module.css'

const pageSizeOptions = generatePageSizeSelectOptions([10, 20, 50, 100])

const BeneficiairesTable = ({
  data: { beneficiaires, totalPages },
  searchParams,
  baseHref,
}: {
  data: SearchBeneficiaireResult
  searchParams: BeneficiairesDataTableSearchParams
  baseHref: string
}) => (
  <>
    <DataTable
      className="fr-table--nowrap fr-width-full fr-mb-8v"
      rows={beneficiaires}
      configuration={BeneficiairesDataTable}
      searchParams={searchParams}
      baseHref={baseHref}
      classes={{ table: styles.table }}
    />
    <PaginationNavWithPageSizeSelect
      defaultPageSize={10}
      pageSizeOptions={pageSizeOptions}
      totalPages={totalPages}
      baseHref={baseHref}
      searchParams={searchParams}
    />
  </>
)

export default BeneficiairesTable
