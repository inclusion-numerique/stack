import { Control } from 'react-hook-form'
import CustomSelectFormField, {
  type CustomSelectFormFieldProps,
} from '@app/ui/components/Form/CustomSelectFormField'
import { AdresseBanData } from '@app/web/external-apis/ban/AdresseBanValidation'
import { searchAdresses } from '@app/web/external-apis/apiAdresse'
import { banFeatureToAdresseBanData } from '@app/web/external-apis/ban/banFeatureToAdresseBanData'

type AdresseBanFormData = {
  adresseBan: AdresseBanData
}

const loadOptions = async (search: string) => {
  if (search.trim().length < 3) {
    return [
      {
        label: `La recherche doit contenir au moins 3 caractères`,
        adresse: null,
      },
    ]
  }
  const result = await searchAdresses(search, {
    limit: 10,
    autocomplete: true,
  })

  return result.map((adresseBan) => ({
    label: adresseBan.properties.label,
    adresse: banFeatureToAdresseBanData(adresseBan),
  }))
}

export type AdressBanFormFieldOption = Awaited<
  ReturnType<typeof loadOptions>
>[number]

const customStyles: CustomSelectFormFieldProps<AdresseBanFormData>['styles'] = {
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

const AdresseBanFormField = <T extends AdresseBanFormData>({
  control,
}: {
  control: Control<T>
}) => {
  const castedControl = control as unknown as Control<AdresseBanFormData>
  return (
    <CustomSelectFormField
      label="Adresse"
      asterisk
      control={castedControl}
      path="adresseBan"
      placeholder="Rechercher l’adresse"
      loadOptions={loadOptions}
      cacheOptions
      styles={customStyles as never}
      getOptionValue={(option: AdressBanFormFieldOption) =>
        option.adresse?.id ?? ''
      }
      optionToFormValue={(option: AdressBanFormFieldOption) => option.adresse}
    />
  )
}
export default AdresseBanFormField
