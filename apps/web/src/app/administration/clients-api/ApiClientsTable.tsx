import { ApiClientsDataTable } from '@app/web/app/administration/clients-api/ApiClientsDataTable'
import type { ApiClientListItem } from '@app/web/app/administration/clients-api/getApiClientsListPageData'
import DataTable from '@app/web/data-table/DataTable'
import type { DataTableSearchParams } from '@app/web/data-table/DataTableConfiguration'
import styles from './ApiClientsPage.module.css'

const ApiClientsTable = ({
  data,
  searchParams,
  baseHref,
}: {
  data: ApiClientListItem[]
  searchParams: DataTableSearchParams
  baseHref: string
}) => (
  <DataTable
    className="fr-table--nowrap fr-width-full fr-mb-8v"
    rows={data}
    configuration={ApiClientsDataTable}
    searchParams={searchParams}
    baseHref={baseHref}
    classes={{ table: styles.table }}
  />
)

export default ApiClientsTable
