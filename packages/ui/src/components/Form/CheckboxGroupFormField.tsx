import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { type Control, Controller, type FieldValues } from 'react-hook-form'
import type { FieldPath } from 'react-hook-form/dist/types/path'
import type { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import type { SelectOption } from '@app/ui/components/Form/utils/options'

export type CheckboxGroupFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  path: FieldPath<T>
  options: SelectOption[]
  disabled?: boolean
  label?: ReactNode
  hint?: string
  inline?: boolean
  valid?: string
  small?: boolean
  asterisk?: boolean
  style?: React.CSSProperties
}

const CheckboxGroupFormField = <T extends FieldValues>({
  label,
  path,
  options,
  control,
  hint,
  disabled,
  inline,
  valid,
  small,
  className,
  asterisk,
  style,
  'data-testid': dataTestId,
}: UiComponentProps & CheckboxGroupFormFieldProps<T>) => {
  const id = `checkbox-group-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, name, ref, value },
        fieldState: { invalid, error, isDirty },
      }) => {
        // Value is an array for checkbox groups
        const valueAsArray: T[] = value || []

        let ariaLabelBy: string | undefined
        if (error) {
          ariaLabelBy = `${id}__error`
        } else if (valid && isDirty && !invalid) {
          ariaLabelBy = `${id}__valid`
        }

        return (
          <div className="fr-form-group" data-testid={dataTestId}>
            <fieldset
              className={classNames(
                'fr-fieldset fr-mb-0',
                {
                  'fr-fieldset--error': error,
                  'fr-fieldset--disabled': disabled,
                  'fr-fieldset--valid': valid && isDirty && !invalid,
                },
                className,
              )}
              style={style}
              aria-labelledby={`${id}__legend${
                ariaLabelBy ? ` ${ariaLabelBy}` : ''
              }`}
              role="group"
            >
              <legend
                className="fr-fieldset__legend fr-fieldset__legend--regular"
                id={`${id}__legend`}
              >
                {label} {asterisk && <RedAsterisk />}
                {hint ? <span className="fr-hint-text">{hint}</span> : null}
              </legend>
              {options.map((option, index) => {
                const optionValue = option.value as unknown as T
                return (
                  <div
                    key={option.value}
                    className={classNames('fr-fieldset__element', {
                      'fr-fieldset__element--inline': inline,
                    })}
                  >
                    <div
                      className={classNames('fr-checkbox-group', {
                        'fr-checkbox-group--sm': small,
                      })}
                    >
                      <input
                        defaultChecked={valueAsArray.includes(optionValue)}
                        key={`${id}__input__${option.value}__${
                          valueAsArray.includes(optionValue)
                            ? 'checked'
                            : 'unchecked'
                        }`}
                        type="checkbox"
                        id={`${id}__${index}`}
                        disabled={disabled}
                        onBlur={onBlur}
                        onChange={(event) => {
                          const newValue = event.target.value as unknown as T
                          if (event.target.checked) {
                            // Add the value to the array if it's checked
                            onChange([...valueAsArray, newValue])
                          } else {
                            // Remove the value from the array if it's unchecked
                            onChange(
                              valueAsArray.filter((item) => item !== newValue),
                            )
                          }
                        }}
                        value={option.value}
                        name={name}
                        ref={ref}
                      />
                      <label className="fr-label" htmlFor={`${id}__${index}`}>
                        {option.name}
                        {option.hint && (
                          <span className="fr-hint-text">{option.hint}</span>
                        )}
                      </label>
                    </div>
                  </div>
                )
              })}
              {error && (
                <div
                  className="fr-messages-group"
                  id={`${id}__error`}
                  aria-live="assertive"
                >
                  <p className="fr-message fr-message--error">
                    {error.message}
                  </p>
                </div>
              )}
              {valid && isDirty && !invalid && (
                <div
                  className="fr-messages-group"
                  id={`${id}__valid`}
                  aria-live="assertive"
                >
                  <p className="fr-message fr-message--valid">{valid}</p>
                </div>
              )}
            </fieldset>
          </div>
        )
      }}
    />
  )
}

export default CheckboxGroupFormField
