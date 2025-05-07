import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import SelectOptionsList from '@app/ui/components/Form/SelectOptionsList'
import classNames from 'classnames'
import React, { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import type { FieldPath } from 'react-hook-form/dist/types/path'
import type { SelectInputOption, SelectOption } from './utils/options'

const OptionBadge = ({
  option,
  onClick,
  disabled,
  size,
}: {
  option: SelectOption
  onClick: MouseEventHandler
  disabled?: boolean
  size?: 'sm' | 'md'
}) => (
  <button
    type="button"
    className={`fr-tag fr-mr-1w fr-mb-2v ${size === 'sm' ? 'fr-tag--sm' : ''}`}
    disabled={disabled || option.disabled}
    onClick={disabled ? undefined : onClick}
    aria-label={`Retirer ${option.label}`}
  >
    {option.label}
    <span className="fr-icon-close-line fr-ml-1w fr-icon--sm" />
  </button>
)

export type MultipleSelectFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  label?: ReactNode
  path: FieldPath<T>
  disabled?: boolean
  asterisk?: boolean
  defaultOption?: boolean
  defaultOptionLabel?: string
  hint?: string
  badgeSize?: 'sm' | 'md'
  options: SelectInputOption[]
  limit?: number
  className?: string
}

const MultipleSelectFormField = <T extends FieldValues>({
  control,
  label,
  path,
  hint,
  defaultOption,
  disabled,
  asterisk,
  defaultOptionLabel = 'Sélectionnez une option',
  badgeSize,
  options,
  limit,
  className,
}: MultipleSelectFormFieldProps<T>) => {
  const id = `select-tags-form-field__${path}`

  const flattenedOptions = options.flatMap((option) =>
    'options' in option ? option.options : [option],
  )

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => {
        // We will remove already selected options from the select options
        const valuesSet = new Set<string>(value ?? [])

        const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (
          event,
        ) => {
          onChange(
            value ? [...value, event.target.value] : [event.target.value],
          )
        }

        const selectedOptions = flattenedOptions.filter((option) =>
          valuesSet.has(option.value),
        )

        // Remove value on badge click
        const onTagClick = (option: SelectOption) => {
          onChange(
            (value as string[]).filter(
              (selectedValue: string) => selectedValue !== option.value,
            ),
          )
        }

        const optionsWithDisabledSelectedValues = options.map((option) => {
          if ('options' in option) {
            return {
              ...option,
              options: option.options.map((subOption) => ({
                ...subOption,
                disabled: valuesSet.has(subOption.value),
              })),
            }
          }

          return {
            ...option,
            disabled: valuesSet.has(option.value),
          }
        })

        return (
          <div
            className={classNames(
              'fr-select-group',
              {
                'fr-select-group--disabled': disabled,
                'fr-select-group--error': error,
              },
              className,
            )}
          >
            <label className="fr-label" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            <select
              className="fr-select fr-select--error"
              aria-describedby="text-select-error-desc-error"
              id={id}
              disabled={disabled || !!(limit && value && value.length >= limit)}
              onBlur={onBlur}
              onChange={onSelectChange}
              value=""
              ref={ref}
              name={name}
            >
              {defaultOption ? (
                <option value="">{defaultOptionLabel}</option>
              ) : null}
              <SelectOptionsList options={optionsWithDisabledSelectedValues} />
            </select>
            <div className="fr-mt-4v">
              {selectedOptions.map((option) => (
                <OptionBadge
                  key={option.value}
                  option={option}
                  disabled={disabled}
                  size={badgeSize}
                  onClick={() => onTagClick(option)}
                />
              ))}
            </div>
            {error ? (
              <p id={`${id}__error`} className="fr-error-text">
                {error.message}
              </p>
            ) : null}
          </div>
        )
      }}
    />
  )
}

export default MultipleSelectFormField
