'use client'

import { ChangeEvent, ReactNode, useState } from 'react'
import classNames from 'classnames'
import FilterTag from '@app/web/components/filters/FilterTag'
import {
  AccompagnementType,
  accompagnementTypeLabels,
  accompagnementTypeOptions,
} from '@app/web/cra/cra'

const valueLabel = (value: AccompagnementType): ReactNode =>
  accompagnementTypeLabels[value]

export type PeriodFilterOnChange = (value: AccompagnementType | null) => void

const ActiviteTypeFilter = ({
  onChange,
  defaultValue,
}: {
  onChange: PeriodFilterOnChange
  defaultValue?: AccompagnementType
}) => {
  const [value, setValue] = useState<AccompagnementType | null>(
    defaultValue ?? null,
  )

  const onClear = () => {
    onChange(null)
    setValue(null)
  }
  // Get the value of selected radio
  const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as AccompagnementType)
    onChange(event.target.value as AccompagnementType)
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <FilterTag
      value={value}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Type"
    >
      <fieldset className="fr-fieldset fr-mb-0">
        {accompagnementTypeOptions.map(
          ({ label, value: optionValue }, index) => {
            const id = `activite-filter-radio-${optionValue}`

            return (
              <div
                className={classNames(
                  'fr-fieldset__element',
                  index === accompagnementTypeOptions.length - 1 && 'fr-mb-0',
                )}
                key={optionValue}
              >
                <div className="fr-radio-group">
                  <input
                    type="radio"
                    id={id}
                    name="activite-type"
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
          },
        )}
      </fieldset>
    </FilterTag>
  )
}

export default ActiviteTypeFilter
