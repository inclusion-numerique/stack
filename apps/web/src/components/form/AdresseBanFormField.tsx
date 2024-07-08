import React, { ReactNode } from 'react'
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form'
import CustomSelectFormField, {
  type CustomSelectFormFieldProps,
} from '@app/ui/components/Form/CustomSelectFormField'
import {
  Feature,
  SearchAdresseOptions,
  searchAdresses,
} from '@app/web/external-apis/apiAdresse'
import { banFeatureToAdresseBanData } from '@app/web/external-apis/ban/banFeatureToAdresseBanData'
import type { AdresseBanData } from '@app/web/external-apis/ban/AdresseBanValidation'

export type AdressBanFormFieldOption = {
  label: string
  adresse: AdresseBanData | null
}

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
        adresse: null,
      } as AdressBanFormFieldOption,
    ]
  }
  const result = await searchAdresses(search, {
    limit: 10,
    autocomplete: true,
    ...options,
  })

  return result.map((adresseBan) => ({
    label: getAdresseBanLabel(adresseBan),
    adresse: banFeatureToAdresseBanData(adresseBan),
  }))
}

const customStyles: CustomSelectFormFieldProps<FieldValues>['styles'] = {
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
  hint?: string
  valid?: string
  info?: ReactNode
  className?: string
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
  hint,
  info,
  valid,
  className,
}: AdresseBanFormFieldProps<T, P>) => (
  <CustomSelectFormField
    className={className}
    label={label}
    control={control}
    asterisk={asterisk}
    disabled={disabled}
    path={path}
    hint={hint}
    valid={valid}
    info={info}
    placeholder={placeholder}
    loadOptions={(search) => loadOptions(search, searchOptions)}
    cacheOptions
    styles={customStyles as never}
    getOptionValue={(option: AdressBanFormFieldOption) =>
      option.adresse?.id ?? ''
    }
    optionToFormValue={(option: AdressBanFormFieldOption) =>
      option.adresse as PathValue<T, Path<T>>
    }
  />
)

export default AdresseBanFormField
