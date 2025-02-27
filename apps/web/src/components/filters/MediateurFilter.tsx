'use client'

import CustomSelect from '@app/ui/components/CustomSelect/CustomSelect'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { Popover } from '@app/web/components/Popover'
import { MediateurOption } from '@app/web/mediateurs/MediateurOption'
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

type MediateurOptionWithId = MediateurOption & {
  value: { mediateurId: string }
}

const onlyDefinedIds = (
  mediateurOption: MediateurOption,
): mediateurOption is MediateurOptionWithId =>
  mediateurOption.value?.mediateurId != null

const toSelectOption = ({
  label,
  value: { mediateurId: value },
}: MediateurOptionWithId): SelectOption => ({
  label,
  value,
})

export const MediateurFilter = ({
  defaultValue,
  initialMediateursOptions,
}: {
  defaultValue: string[]
  initialMediateursOptions: MediateurOption[]
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const [isOpen, setIsOpen] = useState(false)

  const mediateursOptions: SelectOption[] = initialMediateursOptions
    .filter(onlyDefinedIds)
    .map(toSelectOption)

  const selectedMediateurs = mediateursOptions.filter(
    defautValuesFrom(new Set(defaultValue)),
  )

  const [mediateurs, setMediateurs] = useState(selectedMediateurs)

  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to trigger when props options change
  useEffect(() => {
    setMediateurs(selectedMediateurs)
  }, [initialMediateursOptions])

  const hasFilters = mediateurs.length > 0

  const closePopover = (close: boolean = false) => {
    close && setIsOpen(false)
    router.replace(`?${params}`, { scroll: false })
  }

  const handleSubmit = (close: boolean = false) => {
    update(params)('mediateurs', mediateurs)
    closePopover(close)
  }

  const handleClearFilters = () => {
    setMediateurs([])
    update(params)('mediateurs', [])
    closePopover(true)
  }

  const handleSelectFilter = (option: SelectOption | null) => {
    if (!option) return handleClearFilters()
    setMediateurs([...mediateurs, option])
  }

  const handleRemoveFilter = (option: SelectOption) =>
    setMediateurs(mediateurs.filter(matchingOption(option)))

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={hasFilters}>
          Médiateur{hasFilters && ` · ${mediateurs.length}`}
        </TriggerButton>
      }
    >
      <form style={{ width: 384 }} action={() => handleSubmit(true)}>
        <label
          className="fr-label fr-mb-1v fr-text--bold"
          htmlFor="mediateur-filter"
        >
          Filtrer par&nbsp;:
        </label>
        <CustomSelect<SelectOption>
          inputId="mediateur-filter"
          instanceId="mediateur-filter-search"
          placeholder="Choisir un médiateur numérique"
          className="fr-mb-2v fr-mt-3v"
          options={mediateursOptions.filter(availableOptionsIn(mediateurs))}
          onChange={handleSelectFilter}
          value={[]}
        />
        {hasFilters && (
          <>
            <FilterSelection
              options={mediateurs}
              onRemoveFilter={handleRemoveFilter}
              label={{
                singular: 'médiateur sélectionné',
                plural: 'médiateurs sélectionnés',
              }}
            />
            <FilterFooter onClearFilters={handleClearFilters} />
          </>
        )}
      </form>
    </Popover>
  )
}
