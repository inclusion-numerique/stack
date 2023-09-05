import React, { ReactNode } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import classNames from 'classnames'
import type { PropsValue } from 'react-select'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import CustomSelect, {
  CustomSelectProps,
} from '@app/ui/components/CustomSelect/CustomSelect'

export type CustomSelectFormFieldProps<
  T extends FieldValues,
  Option = { label: string; value: string },
  V = unknown,
> = Omit<CustomSelectProps<Option>, 'onChange' | 'name' | 'onBlur'> & {
  label: ReactNode
  path: FieldPath<T>
  control: Control<T>
  disabled?: boolean
  hint?: string
  valid?: string
  asterisk?: boolean
  transformOptionToValue?: (option: Option) => V
}

export type CustomSelectOptions = CustomSelectProps['options']

/**
 * TODO For now only works with single value, not isMulti
 */
const valuePropertyFromValue = <Option = { label: string; value: string },>(
  value: string,
  options: Option[],
): PropsValue<{ label: string; value: string }> | undefined => {
  if (!options) {
    return
  }

  return options.find(
    (option) => (option as { value: string }).value === value,
  ) as PropsValue<{ label: string; value: string }> | undefined
}

const CustomSelectFormField = <
  T extends FieldValues,
  Option = { label: string; value: string },
>({
  label,
  path,
  control,
  hint,
  options,
  disabled,
  valid,
  asterisk,
  transformOptionToValue,
  ...customSelectProps
}: UiComponentProps & CustomSelectFormFieldProps<T, Option>) => {
  const id = `custom-select-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { ref: _ref, value, onChange, ...fieldProps },
        fieldState: { invalid, error, isDirty },
      }) => {
        let ariaDescribedBy: string | undefined
        if (error) {
          ariaDescribedBy = `${id}__error`
        } else if (valid && isDirty && !invalid) {
          ariaDescribedBy = `${id}__valid`
        }
        const onChangeProperty: CustomSelectProps<Option>['onChange'] = (
          newValue,
        ) => {
          const changedValue = transformOptionToValue
            ? transformOptionToValue(newValue as Option)
            : (newValue as null | { value: string })?.value ?? ''

          onChange(changedValue)
        }

        const valueProperty = valuePropertyFromValue(
          value,
          options as Option[],
        ) as PropsValue<Option> | undefined

        return (
          <div
            className={classNames('fr-select-group', {
              'fr-input-group--error': error,
              'fr-input-group--valid': valid && isDirty && !invalid,
              'fr-input-group--disabled': disabled,
            })}
          >
            <label className="fr-label" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            <CustomSelect
              {...customSelectProps}
              {...fieldProps}
              onChange={onChangeProperty}
              value={valueProperty}
              options={options}
              isDisabled={disabled}
              aria-describedby={ariaDescribedBy}
              inputId={id}
              instanceId={customSelectProps.instanceId ?? id}
            />
            {error && (
              <p id={`${id}__error`} className="fr-error-text">
                {error.message}
              </p>
            )}
            {valid && isDirty && !invalid && (
              <p id={`${id}__valid`} className="fr-valid-text">
                {valid}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default CustomSelectFormField
