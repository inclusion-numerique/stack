import { HTMLInputTypeAttribute } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'

// View design options here https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie
export function InputFormField<T extends FieldValues>({
  label,
  path,
  control,
  placeholder,
  type = 'text',
  hint,
  disabled,
  multiple,
  'data-testid': dataTestId,
}: {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: string
  hint?: string
  type?: Exclude<HTMLInputTypeAttribute, 'checkbox'>
  placeholder?: string
  multiple?: boolean
  ['data-testid']?: string
}) {
  const id = `input-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <div
          className={`fr-input-group ${error ? 'fr-input-group--error' : ''} ${
            disabled ? 'fr-input-group--disabled' : ''
          } ${isTouched && !invalid ? 'fr-input-group--valid' : ''}`}
        >
          <label className="fr-label" htmlFor={id}>
            {label}
            {hint ? <span className="fr-hint-text">{hint}</span> : null}
          </label>

          <input
            data-testid={dataTestId}
            className="fr-input"
            aria-describedby={error ? `${id}__error` : undefined}
            disabled={disabled}
            type={type}
            id={id}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            value={value ?? ''}
            ref={ref}
            multiple={multiple}
          />
          {error ? (
            <p id={`${id}__error`} className="fr-error-text">
              {error.message}
            </p>
          ) : null}
        </div>
      )}
    />
  )
}
