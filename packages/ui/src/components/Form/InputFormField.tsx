import { UiComponentProps } from '@stack/ui/utils/uiComponentProps'
import classNames from 'classnames'
import React, { HTMLInputTypeAttribute } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'

export type InputFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: string
  hint?: string
  type?: Exclude<HTMLInputTypeAttribute, 'checkbox'>
  placeholder?: string
  valid?: string
}

const InputFormField = <T extends FieldValues>({
  label,
  path,
  control,
  placeholder,
  type = 'text',
  hint,
  disabled,
  'data-testid': dataTestId,
  valid,
}: UiComponentProps & InputFormFieldProps<T>) => {
  const id = `input-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, isTouched, error },
      }) => {
        let ariaDescribedBy: string | undefined
        if (error) {
          ariaDescribedBy = `${id}__error`
        } else if (valid && isTouched && !invalid) {
          ariaDescribedBy = `${id}__valid`
        }

        return (
          <div
            className={classNames('fr-input-group', {
              'fr-input-group--error': error,
              'fr-input-group--disabled': disabled,
              'fr-input-group--valid': isTouched && !invalid,
            })}
          >
            <label className="fr-label" htmlFor={id}>
              {label}
              {hint && <span className="fr-hint-text">{hint}</span>}
            </label>

            <input
              data-testid={dataTestId}
              className="fr-input"
              aria-describedby={ariaDescribedBy}
              disabled={disabled}
              type={type}
              id={id}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={onChange}
              value={value ?? ''}
              ref={ref}
            />
            {error && (
              <p id={`${id}__error`} className="fr-error-text">
                {error.message}
              </p>
            )}
            {valid && isTouched && !invalid && (
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

export default InputFormField
