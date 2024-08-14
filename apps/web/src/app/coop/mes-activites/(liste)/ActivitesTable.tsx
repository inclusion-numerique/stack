import DataTable from '@app/web/data-table/DataTable'
import PaginationNav from '@app/web/data-table/PaginationNav'
import { createDataTableHref } from '@app/web/data-table/createDataTableHref'
import styles from './MesActivitesListePage.module.css'
import {
  ActivitesDataTable,
  ActivitesDataTableSearchParams,
} from '@app/web/cra/ActivitesDataTable'
import { SearchActiviteResult } from '@app/web/cra/searchActivite'

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

export default ActivitesTable
