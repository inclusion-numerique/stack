import { SearchBeneficiaireResult } from '@app/web/beneficiaire/searchBeneficiaire'
import DataTable from '@app/web/data-table/DataTable'
import {
  BeneficiairesDataTable,
  BeneficiairesDataTableSearchParams,
} from '@app/web/beneficiaire/BeneficiairesDataTable'
import PaginationNav from '@app/web/data-table/PaginationNav'
import { createDataTableHref } from '@app/web/data-table/createDataTableHref'
import styles from './MesBeneficiairesListePage.module.css'

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
    <PaginationNav
      totalPages={totalPages}
      pageNumber={searchParams.page ?? 1}
      createPageLink={(page) =>
        createDataTableHref({
          baseHref,
          searchParams: {
            ...searchParams,
            page,
          },
        })
      }
    />
  </>
)

export default BeneficiairesTable
