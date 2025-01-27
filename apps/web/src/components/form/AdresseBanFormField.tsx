import React, { ReactNode } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import CustomSelectFormField, {
  type CustomSelectFormFieldProps,
} from '@app/ui/components/Form/CustomSelectFormField'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import {
  Feature,
  SearchAdresseOptions,
  searchAdresses,
} from '@app/web/external-apis/apiAdresse'
import { banFeatureToAdresseBanData } from '@app/web/external-apis/ban/banFeatureToAdresseBanData'
import type { AdresseBanData } from '@app/web/external-apis/ban/AdresseBanValidation'

export type AdressBanFormFieldOption = SelectOption<AdresseBanData | null>

const getAdresseBanLabel = ({
  properties: { type, label, postcode },
}: Feature) => {
  if (type === 'municipality' && !!postcode) {
    return `${label} · ${postcode}`
  }

  return label
}

const loadOptions = async (
  search: string,
  options?: SearchAdresseOptions,
): Promise<AdressBanFormFieldOption[]> => {
  if (search.trim().length < 3) {
    return [
      {
        label: `La recherche doit contenir au moins 3 caractères`,
        value: null,
      },
    ]
  }
  const result = await searchAdresses(search, {
    limit: 10,
    autocomplete: true,
    ...options,
  })

  return result.map((adresseBan) => ({
    label: getAdresseBanLabel(adresseBan),
    value: banFeatureToAdresseBanData(adresseBan),
  }))
}

const customStyles: CustomSelectFormFieldProps<FieldValues>['styles'] = {
  valueContainer: (provided) => ({
    ...provided,
    // Keep same height as select with dropdown indicator
    paddingTop: 4,
    paddingBottom: 4,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none', // hide the dropdown indicator
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none', // hide the indicator separator
  }),
  control: (provided) => ({
    ...provided,
    minHeight: 'initial', // ensure control height remains normal without dropdown
  }),
}

interface AdresseBanFormFieldProps<
  T extends FieldValues,
  P extends Path<T> = Path<T>,
> {
  control: Control<T>
  path: P
  label?: ReactNode
  placeholder?: string
  searchOptions?: SearchAdresseOptions
  asterisk?: boolean
  disabled?: boolean
  isClearable?: boolean
  hint?: string
  valid?: string
  info?: ReactNode
  className?: string
  defaultOptions?: AdressBanFormFieldOption[]
  defaultValue?: AdressBanFormFieldOption
}

const AdresseBanFormField = <
  T extends FieldValues,
  P extends Path<T> = Path<T>,
>({
  control,
  path,
  label,
  placeholder,
  searchOptions,
  asterisk,
  disabled,
  isClearable = false,
  hint,
  info,
  valid,
  className,
  defaultOptions,
  defaultValue,
}: AdresseBanFormFieldProps<T, P>) => (
  <CustomSelectFormField<T, AdressBanFormFieldOption>
    className={className}
    label={label}
    control={control}
    asterisk={asterisk}
    disabled={disabled}
    isClearable={isClearable}
    path={path}
    hint={hint}
    valid={valid}
    info={info}
    placeholder={placeholder}
    defaultOptions={defaultOptions}
    defaultValue={defaultValue}
    loadOptions={(search) => loadOptions(search, searchOptions)}
    cacheOptions
    styles={customStyles as never}
    getOptionKey={(option: AdressBanFormFieldOption) => option.value?.id ?? ''}
    getValueKey={(value: AdresseBanData | undefined | null) => value?.id ?? ''}
  />
)

export default AdresseBanFormField
