'use client'

import CustomSelect from '@app/ui/components/CustomSelect/CustomSelect'
import {
  SelectOption,
  labelsToOptions,
} from '@app/ui/components/Form/utils/options'
import { Popover } from '@app/web/components/Popover'
import { locationTypeLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FilterFooter } from './elements/FilterFooter'
import { FilterSelection } from './elements/FilterSelection'
import TriggerButton from './elements/TriggerButton'
import {
  availableOptionsIn,
  defautValuesFrom,
  matchingOption,
  update,
} from './elements/helpers'

export type LieuFilterType = 'lieu' | 'commune' | 'departement'
export type LieuFilterValue = { type: LieuFilterType; value: string[] }

const lieuTypeOptions = labelsToOptions(locationTypeLabels)

const lieuPlaceholder: Record<LieuFilterType, string> = {
  lieu: 'Choisir un lieu d’activité',
  commune: 'Choisir une commune',
  departement: 'Choisir un département',
}

export const LieuFilter = ({
  defaultValue = [],
  communesOptions = [],
  departementsOptions = [],
  lieuxActiviteOptions = [],
}: {
  defaultValue?: LieuFilterValue[]
  communesOptions: SelectOption[]
  lieuxActiviteOptions: SelectOption[]
  departementsOptions: SelectOption[]
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const [isOpen, setIsOpen] = useState(false)

  const [lieuFilterType, setLieuFilterType] = useState<LieuFilterType | null>()

  const defaultValueSet = new Set(defaultValue.flatMap(({ value }) => value))

  const filteredCommunesOptions = communesOptions.filter(
    defautValuesFrom(defaultValueSet),
  )

  const filteredDepartementsOptions = departementsOptions.filter(
    defautValuesFrom(defaultValueSet),
  )

  const filteredLieuxActiviteOptions = lieuxActiviteOptions.filter(
    defautValuesFrom(defaultValueSet),
  )

  const [communes, setCommunes] = useState(filteredCommunesOptions)
  const [departements, setDepartements] = useState(filteredDepartementsOptions)
  const [lieuxActivite, setLieuxActivite] = useState(
    filteredLieuxActiviteOptions,
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to trigger when props options change
  useEffect(() => {
    setCommunes(filteredCommunesOptions)
    setDepartements(filteredDepartementsOptions)
    setLieuxActivite(filteredLieuxActiviteOptions)
  }, [communesOptions, departementsOptions, lieuxActiviteOptions])

  const allFilters = [...departements, ...communes, ...lieuxActivite]
  const hasFilters = allFilters.length > 0

  const optionsForType: Record<LieuFilterType, SelectOption[]> = {
    commune: communesOptions.filter(availableOptionsIn(communes)),
    departement: departementsOptions.filter(availableOptionsIn(departements)),
    lieu: lieuxActiviteOptions.filter(availableOptionsIn(lieuxActivite)),
  }

  const closePopover = (close: boolean = false) => {
    setLieuFilterType(null)
    close && setIsOpen(false)
    router.replace(`?${params}`, { scroll: false })
  }

  const handleSubmit = (close: boolean = false) => {
    update(params)('lieux', lieuxActivite)
    update(params)('communes', communes)
    update(params)('departements', departements)

    closePopover(close)
  }

  const handleClearFilters = () => {
    setCommunes([])
    setDepartements([])
    setLieuxActivite([])

    update(params)('lieux', [])
    update(params)('communes', [])
    update(params)('departements', [])

    closePopover(true)
  }

  const handleSelectFilter = (option: SelectOption | null) => {
    if (!option || !lieuFilterType) return handleClearFilters()
    const setState = {
      commune: setCommunes,
      departement: setDepartements,
      lieu: setLieuxActivite,
    }[lieuFilterType]
    setState((prev) => [...prev, option])
  }

  const handleRemoveFilter = (option: SelectOption) => {
    setCommunes(communes.filter(matchingOption(option)))
    setDepartements(departements.filter(matchingOption(option)))
    setLieuxActivite(lieuxActivite.filter(matchingOption(option)))
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={hasFilters}>
          Lieu{hasFilters && <>&nbsp;·&nbsp;{allFilters.length}</>}
        </TriggerButton>
      }
    >
      <form style={{ width: 384 }} action={() => handleSubmit(true)}>
        <label
          className="fr-label fr-mb-1v fr-text--bold"
          htmlFor="lieu-filter"
        >
          Filtrer par&nbsp;:
        </label>
        <CustomSelect
          instanceId="location-filter-type"
          placeholder="Choisir un type de localisation"
          className="fr-mb-2v fr-mt-3v"
          options={lieuTypeOptions}
          onChange={(option) => setLieuFilterType(option?.value ?? null)}
        />
        {lieuFilterType && (
          <CustomSelect<SelectOption>
            instanceId="location-filter-value"
            placeholder={lieuPlaceholder[lieuFilterType]}
            className="fr-mb-2v fr-mt-3v"
            options={optionsForType[lieuFilterType]}
            onChange={handleSelectFilter}
            value={[]}
          />
        )}
        {hasFilters && (
          <>
            <FilterSelection
              options={allFilters}
              onRemoveFilter={handleRemoveFilter}
              label={{
                singular: 'lieu sélectionné',
                plural: 'lieux sélectionnés',
              }}
            />
            <FilterFooter onClearFilters={handleClearFilters} />
          </>
        )}
      </form>
    </Popover>
  )
}
