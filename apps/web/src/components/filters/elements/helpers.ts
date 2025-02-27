import { SelectOption } from '@app/ui/components/Form/utils/options'

export const matchingOption =
  (option: SelectOption) =>
  ({ value }: { value: string }) =>
    value !== option.value

const toValue = ({ value }: { value: string }) => value

export const update =
  <T extends string>(params: URLSearchParams) =>
  (type: T, options: SelectOption[]) => {
    options.length > 0
      ? params.set(type, options.map(toValue).join(','))
      : params.delete(type)
  }

export const defautValuesFrom =
  (defaultValues: Set<string>) =>
  ({ value }: { value: string }) =>
    defaultValues.has(value)

export const availableOptionsIn =
  (options: SelectOption[]) => (option: SelectOption) =>
    options.every(({ value }) => value !== option.value)
