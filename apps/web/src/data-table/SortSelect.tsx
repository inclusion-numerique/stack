'use client'

import React, { ChangeEventHandler } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export type SortSelectOption = {
  label: string
  value: string
}

const SortSelect = ({
  options,
  baseHref,
}: {
  options: SortSelectOption[]
  baseHref: string
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const sortParams = new URLSearchParams(searchParams)
    sortParams.set('tri', event.target.value)
    router.push(`${baseHref}?${sortParams.toString()}`)
  }

  return (
    <div className="fr-text-label--blue-france fr-text--semi-bold fr-text--sm fr-mb-0">
      Trier par&nbsp;:
      <select
        style={{ appearance: 'auto' }}
        className="fr-text-label--blue-france fr-text--semi-bold"
        onChange={onSelect}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortSelect
