'use client'

import { ReactNode, useState } from 'react'
import CustomSelect from '@app/ui/components/CustomSelect/CustomSelect'
import {
  labelsToOptions,
  SelectOption,
} from '@app/ui/components/Form/utils/options'
import FilterTag from '@app/web/components/filters/FilterTag'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

export type LocationFilterType = 'lieu' | 'commune' | 'departement'

export type LocationFilterValue = {
  type: LocationFilterType
  value: string // code insee of the location or uuid of the lieu activité
}

export type LocationFilterOnChange = (value: LocationFilterValue | null) => void

const locationTypeLabels: {
  [key in LocationFilterType]: string
} = {
  lieu: 'Lieu d’activité',
  commune: 'Commune',
  departement: 'Département',
}

const locationTypeOptions: SelectOption<LocationFilterType>[] =
  labelsToOptions(locationTypeLabels)

const locationValuePlaceholder: {
  [key in LocationFilterType]: string
} = {
  lieu: 'Choisir un lieu d’activité',
  commune: 'Choisir une commune',
  departement: 'Choisir un département',
}

const LocationFilter = ({
  onChange,
  defaultValue,
  communesOptions,
  departementsOptions,
  lieuxActiviteOptions,
}: {
  onChange: LocationFilterOnChange
  defaultValue?: LocationFilterValue
  communesOptions: SelectOption[]
  lieuxActiviteOptions: SelectOption[]
  departementsOptions: SelectOption[]
}) => {
  const [locationType, setLocationType] = useState<LocationFilterType | null>(
    defaultValue?.type ?? null,
  )

  const [locationValue, setLocationValue] = useState<string | null>(
    defaultValue?.value ?? null,
  )

  const onTypeChange = (option: SelectOption<LocationFilterType> | null) => {
    setLocationType(option?.value ?? null)
    setLocationValue(null)
  }

  const onValueChange = (option: SelectOption | null) => {
    if (!option || !locationType || !option.value) {
      return setLocationValue(null)
    }

    setLocationValue(option.value)
    onChange({
      type: locationType,
      value: option?.value,
    })
  }

  const onClear = () => {
    onChange(null)
    setLocationType(null)
    setLocationValue(null)
  }

  const optionsForType = (type: LocationFilterType | null | undefined) =>
    type
      ? type === 'commune'
        ? communesOptions
        : type === 'departement'
          ? departementsOptions
          : lieuxActiviteOptions
      : []

  const filterValue =
    locationType && locationValue
      ? { type: locationType, value: locationValue }
      : null

  const valueLabel = (location: LocationFilterValue | null): ReactNode => {
    if (!location) {
      return null
    }

    return (
      optionsForType(location.type).find(({ value }) => value === locationValue)
        ?.label ?? null
    )
  }

  const defaultTypeValue: SelectOption<LocationFilterType> | undefined =
    locationType
      ? locationTypeOptions.find(({ value }) => value === locationType)
      : undefined

  const locationValueForTypeOptions = optionsForType(locationType)

  const defaultLocationValue: SelectOption | undefined =
    locationType && locationValue
      ? locationValueForTypeOptions.find(({ value }) => value === locationValue)
      : undefined

  const valuePlaceholder = locationType
    ? locationValuePlaceholder[locationType]
    : undefined

  console.log('TYPE', locationType)
  console.log('VALUE', locationValue)
  console.log('PLACEHOLDER', valuePlaceholder)
  console.log('OPTIONS', locationValueForTypeOptions)

  return (
    <FilterTag
      value={filterValue}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Lieu"
    >
      <div style={{ width: 460 }}>
        <CustomSelect
          instanceId="location-filter-type"
          options={locationTypeOptions}
          defaultValue={defaultTypeValue}
          onChange={onTypeChange}
          placeholder="Choisir un type de localisation"
        />
        {locationType && (
          <CustomSelect
            className="fr-mt-4v"
            key={locationType}
            instanceId="location-filter-value"
            options={locationValueForTypeOptions}
            defaultValue={defaultLocationValue}
            onChange={onValueChange}
            placeholder={valuePlaceholder}
          />
        )}
      </div>
    </FilterTag>
  )
}

export default withTrpc(LocationFilter)
