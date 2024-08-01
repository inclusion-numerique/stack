import { SearchBeneficiaireResult } from '@app/web/beneficiaire/searchBeneficiaire'
import DataTable from '@app/web/data-table/DataTable'
import {
  BeneficiairesDataTable,
  BeneficiairesDataTableSearchParams,
} from '@app/web/beneficiaire/BeneficiairesDataTable'

const ListeBeneficiaires = ({
  data,
  searchParams,
  baseHref,
}: {
  data: SearchBeneficiaireResult
  searchParams: BeneficiairesDataTableSearchParams
  baseHref: string
}) => (
  <DataTable
    className="fr-table--nowrap fr-width-full"
    rows={data.beneficiaires}
    configuration={BeneficiairesDataTable}
    searchParams={searchParams}
    baseHref={baseHref}
  />
)

export default ListeBeneficiaires
