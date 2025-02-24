'use client'

import CustomSelect from '@app/ui/components/CustomSelect/CustomSelect'
import FilterTag from '@app/web/components/filters/FilterTag'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import { ReactNode, useState } from 'react'

export type MediateurFilterValue = string // uuid of the mediateur

export type MediateurFilterOnChange = (
  value: MediateurFilterValue | null,
) => void

const MediateurFilter = ({
  onChange,
  defaultValue,
  initialMediateursOptions,
}: {
  onChange: MediateurFilterOnChange
  defaultValue?: string
  initialMediateursOptions: MediateurOption[]
}) => {
  const [mediateur, setMediateur] = useState<MediateurOption | null>(
    initialMediateursOptions.find(
      (option) => option.value?.mediateurId === defaultValue,
    ) ?? null,
  )

  const onClear = () => {
    onChange(null)
    setMediateur(null)
  }

  const valueLabel = (option: MediateurOption | null): ReactNode =>
    option?.label ?? null

  const onSelectChange = (option: MediateurOption | null) => {
    if (option?.value?.mediateurId == null) {
      return onClear()
    }

    setMediateur(option)
    onChange(option.value.mediateurId)
  }

  return (
    <FilterTag
      value={mediateur}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Tous les médiateurs"
    >
      <div style={{ width: 460 }}>
        <CustomSelect
          instanceId="mediateur-filter-search"
          placeholder="Rechercher un médiateur"
          className="fr-mb-2v fr-mt-3v"
          options={initialMediateursOptions}
          onChange={onSelectChange}
        />
      </div>
    </FilterTag>
  )
}

export default withTrpc(MediateurFilter)
