import DataTable from '@app/web/data-table/DataTable'
import {
  ActivitesDataTable,
  ActivitesDataTableSearchParams,
} from '@app/web/cra/ActivitesDataTable'
import { SearchActiviteResult } from '@app/web/cra/searchActivite'
import { generatePageSizeSelectOptions } from '@app/web/data-table/pageSizeSelectOptions'
import PaginationNavWithPageSizeSelect from '@app/web/data-table/PaginationNavWithPageSizeSelect'
import styles from './MesActivitesListePage.module.css'

const pageSizeOptions = generatePageSizeSelectOptions([10, 20, 50, 100])

const ActivitesTable = ({
  data: { activites, totalPages },
  searchParams,
  baseHref,
}: {
  data: SearchActiviteResult
  searchParams: ActivitesDataTableSearchParams
  baseHref: string
}) => (
  <>
    <DataTable
      className="fr-table--nowrap fr-width-full fr-mb-8v"
      rows={activites}
      configuration={ActivitesDataTable}
      searchParams={searchParams}
      baseHref={baseHref}
      classes={{ table: styles.table }}
    />
    <PaginationNavWithPageSizeSelect
      defaultPageSize={10}
      pageSizeOptions={pageSizeOptions}
      totalPages={totalPages}
      searchParams={searchParams}
      baseHref={baseHref}
    />
  </>
)

export default ActivitesTable
