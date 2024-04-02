import { SelectInputOption } from '@app/ui/components/Form/utils/options'
import { useForm } from 'react-hook-form'
import SelectFormField from '@app/ui/components/Form/SelectFormField'

const SelectDataFilter = ({}:{value: string[], options: SelectInputOption[]}) => {

  const form = useForm<{selected: string[]}>({})

  return <SelectFormField label={} path={} control={} options={}
}
