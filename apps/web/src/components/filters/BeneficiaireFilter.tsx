'use client'

import CustomSelect from '@app/ui/components/CustomSelect/CustomSelect'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import { Popover } from '@app/web/components/Popover'
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

type BeneficiaireOptionWithId = BeneficiaireOption & {
  value: { id: string }
}

const onlyDefinedIds = (
  beneficiaireOption: BeneficiaireOption,
): beneficiaireOption is BeneficiaireOptionWithId =>
  beneficiaireOption.value?.id != null

const toSelectOption = ({
  label,
  value: { id: value },
}: BeneficiaireOptionWithId): SelectOption => ({
  label,
  value,
})

export const BeneficiaireFilter = ({
  defaultValue,
  initialBeneficiairesOptions,
}: {
  defaultValue: string[]
  initialBeneficiairesOptions: BeneficiaireOption[]
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const [isOpen, setIsOpen] = useState(false)

  const beneficiairesOptions: SelectOption[] = initialBeneficiairesOptions
    .filter(onlyDefinedIds)
    .map(toSelectOption)

  const selectedBeneficiaires = beneficiairesOptions.filter(
    defautValuesFrom(new Set(defaultValue)),
  )

  const [beneficiaires, setBeneficiaires] = useState(selectedBeneficiaires)

  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to trigger when props options change
  useEffect(() => {
    setBeneficiaires(selectedBeneficiaires)
  }, [initialBeneficiairesOptions])

  const hasFilters = beneficiaires.length > 0

  const closePopover = (close: boolean = false) => {
    close && setIsOpen(false)
    router.replace(`?${params}`, { scroll: false })
  }

  const handleSubmit = (close: boolean = false) => {
    update(params)('beneficiaires', beneficiaires)
    closePopover(close)
  }

  const handleClearFilters = () => {
    setBeneficiaires([])
    update(params)('beneficiaires', [])
    closePopover(true)
  }

  const handleSelectFilter = (option: SelectOption | null) => {
    if (!option) return handleClearFilters()
    setBeneficiaires([...beneficiaires, option])
  }

  const handleRemoveFilter = (option: SelectOption) =>
    setBeneficiaires(beneficiaires.filter(matchingOption(option)))

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={hasFilters}>
          Bénéficiaire{hasFilters && ` · ${beneficiaires.length}`}
        </TriggerButton>
      }
    >
      <form style={{ width: 384 }} action={() => handleSubmit(true)}>
        <label
          className="fr-label fr-mb-1v fr-text--bold"
          htmlFor="beneficiaire-filter"
        >
          Filtrer par&nbsp;:
        </label>
        <CustomSelect<SelectOption>
          inputId="beneficiaire-filter"
          instanceId="beneficiaire-filter-search"
          placeholder="Choisir un bénéficiaire"
          className="fr-mb-2v fr-mt-3v"
          options={beneficiairesOptions.filter(
            availableOptionsIn(beneficiaires),
          )}
          onChange={handleSelectFilter}
          value={[]}
        />
        {hasFilters && (
          <>
            <FilterSelection
              options={beneficiaires}
              onRemoveFilter={handleRemoveFilter}
              label={{
                singular: 'bénéficiaire sélectionné',
                plural: 'bénéficiaires sélectionnés',
              }}
            />
            <FilterFooter onClearFilters={handleClearFilters} />
          </>
        )}
      </form>
    </Popover>
  )
}
