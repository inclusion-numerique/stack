import { SelectInputOption } from '@app/ui/components/Form/utils/options'

export type DataFilter = {
  name: string
  queryString: string
  type: 'select'
  options?: SelectInputOption[]
  toText?: (value: string) => string
  values?: string[]
}

export type DataFilters = DataFilter[]
