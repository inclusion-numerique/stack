'use client'

import { ChangeEvent, ReactNode, useState } from 'react'
import classNames from 'classnames'
import FilterTag from '@app/web/components/filters/FilterTag'
import {
  profilOptions,
  ProfilSlug,
  profilSlugLabels,
  profilSlugOptions,
} from '@app/web/cra/cra'

const valueLabel = (value: ProfilSlug): ReactNode => profilSlugLabels[value]

export type PeriodFilterOnChange = (value: ProfilSlug | null) => void

const ProfilFilter = ({
  onChange,
  defaultValue,
}: {
  onChange: PeriodFilterOnChange
  defaultValue?: ProfilSlug
}) => {
  const [value, setValue] = useState<ProfilSlug | null>(defaultValue ?? null)

  const onClear = () => {
    onChange(null)
    setValue(null)
  }
  // Get the value of selected radio
  const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as ProfilSlug)
    onChange(event.target.value as ProfilSlug)
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <FilterTag
      value={value}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Profil"
    >
      <fieldset className="fr-fieldset fr-mb-0">
        {profilSlugOptions.map(({ label, value: optionValue }, index) => {
          const id = `profil-radio-${optionValue}`

          return (
            <div
              className={classNames(
                'fr-fieldset__element',
                index === profilOptions.length - 1 && 'fr-mb-0',
              )}
              key={optionValue}
            >
              <div className="fr-radio-group">
                <input
                  type="radio"
                  id={id}
                  name="profil"
                  value={optionValue}
                  checked={value === optionValue}
                  onChange={onFormChange}
                />
                <label className="fr-label fr-whitespace-nowrap" htmlFor={id}>
                  {label}
                </label>
              </div>
            </div>
          )
        })}
      </fieldset>
    </FilterTag>
  )
}

export default ProfilFilter
