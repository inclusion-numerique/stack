import React, { ChangeEventHandler, MouseEventHandler } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { SelectOption } from './utils/options'

const OptionsList = ({ options }: { options: SelectOption[] }) => (
  <>
    {options.map(({ name, value }) => (
      <option key={value} value={value}>
        {name}
      </option>
    ))}
    )
  </>
)

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
    aria-label={`Retirer ${option.name}`}
  >
    {option.name}
    <span className="fr-icon-close-line fr-ml-1w fr-icon--sm" />
  </button>
)

export type MultipleSelectFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  label?: string
  path: FieldPath<T>
  disabled?: boolean
  required?: boolean
  defaultOption?: boolean
  defaultOptionLabel?: string
  hint?: string
  placeholder?: string
  badgeSize?: 'sm' | 'md'
  options: SelectOption[]
  limit?: number
}

const MultipleSelectFormField = <T extends FieldValues>({
  control,
  label,
  path,
  placeholder,
  hint,
  defaultOption,
  disabled,
  required,
  defaultOptionLabel = 'Sélectionnez une option',
  badgeSize,
  options,
  limit,
}: MultipleSelectFormFieldProps<T>) => {
  const id = `select-tags-form-field__${path}`

  // TODO Aria labeled by from id
  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, error },
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

        const selectedOptions = options.filter((option) =>
          (value as string[])?.includes(option.value),
        )

        // Remove value on badge click
        const onTagClick = (option: SelectOption) => {
          onChange(
            (value as string[]).filter(
              (selectedValue: string) => selectedValue !== option.value,
            ),
          )
        }

        return (
          <div
            className={`fr-select-group ${
              error ? 'fr-select-group--error' : ''
            } ${disabled ? 'fr-select-group--disabled' : ''} ${
              isTouched && !invalid ? 'fr-select-group--valid' : ''
            }`}
          >
            <label className="fr-label" htmlFor={id}>
              {label}
              {required ? ' *' : null}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            <select
              className="fr-select fr-select--error"
              aria-describedby="text-select-error-desc-error"
              id={id}
              placeholder={placeholder}
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
              <OptionsList
                options={options.filter(({ value: v }) => !valuesSet.has(v))}
              />
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
