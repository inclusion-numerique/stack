import React, { ReactNode } from 'react'
import { Control, Controller, FieldValues, PathValue } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import classNames from 'classnames'
import type { GroupBase } from 'react-select'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import CustomSelect, {
  CustomSelectProps,
} from '@app/ui/components/CustomSelect/CustomSelect'

export type CustomSelectFormFieldProps<
  FormData extends FieldValues,
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
  PathProperty extends FieldPath<FormData> = FieldPath<FormData>,
> = {
  label: ReactNode
  path: PathProperty
  control: Control<FormData>
  disabled?: boolean
  hint?: string
  valid?: string
  asterisk?: boolean
  info?: ReactNode
  optionToFormValue?: (option: Option) => PathValue<FormData, PathProperty>
} & Omit<
  CustomSelectProps<Option, IsMulti, Group>,
  'onChange' | 'name' | 'onBlur'
>

const defaultGetOptionValue = (option: unknown) => {
  if (!option || !Object.prototype.hasOwnProperty.call(option, 'value')) {
    throw new Error(
      'CustomSelect option has no "value" property. If you are using a custom Option type, pass the correct "getOptionValue" prop to CustomSelect.',
    )
  }

  return (option as { value: string }).value
}

const defaultGetOptionLabel = (option: unknown) => {
  if (!option || !Object.prototype.hasOwnProperty.call(option, 'label')) {
    throw new Error(
      'CustomSelect option has no "label" property. If you are using a custom Option type, pass the correct "getOptionLabel" prop to CustomSelect.',
    )
  }

  return (option as { label: string }).label
}

const defaultOptionToFormValue = defaultGetOptionValue

const CustomSelectFormField = <
  FormData extends FieldValues = FieldValues,
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  label,
  path,
  control,
  hint,
  options,
  disabled,
  valid,
  asterisk,
  info,
  getOptionLabel: getOptionLabelProperty,
  getOptionValue: getOptionValueProperty,
  optionToFormValue: optionToFormValueProperty,
  ...customSelectProps
}: UiComponentProps &
  CustomSelectFormFieldProps<FormData, Option, IsMulti, Group>) => {
  const id = `custom-select-form-field__${path}`

  const getOptionValue = getOptionValueProperty ?? defaultGetOptionValue
  const getOptionLabel = getOptionLabelProperty ?? defaultGetOptionLabel
  const optionToFormValue =
    optionToFormValueProperty ?? defaultOptionToFormValue

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
        const onChangeProperty: CustomSelectProps<
          Option,
          IsMulti,
          Group
        >['onChange'] = (option) => {
          const newValue = Array.isArray(option)
            ? option.map(optionToFormValue)
            : optionToFormValue(option as Option)

          console.log('ON CHANGE INPUT', {
            option,
            value,
            newValue,
          })
          onChange(newValue)
        }

        // const valueProperty = valuePropertyFromValue(value, options)

        return (
          <div
            className={classNames('fr-select-group', {
              'fr-input-group--error': error,
              'fr-input-group--valid': valid && isDirty && !invalid,
              'fr-input-group--disabled': disabled,
            })}
          >
            <label className="fr-label fr-mb-1v" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            <CustomSelect
              {...customSelectProps}
              {...fieldProps}
              onChange={onChangeProperty}
              value={
                // value
                undefined
              }
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              options={options}
              isDisabled={disabled}
              aria-describedby={ariaDescribedBy}
              inputId={id}
              instanceId={customSelectProps.instanceId ?? id}
            />
            {info && (
              <p id={`${id}__info`} className="fr-hint-text fr-mt-1v fr-mb-0">
                {info}
              </p>
            )}
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
