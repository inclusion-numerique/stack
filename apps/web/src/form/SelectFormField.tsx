/* eslint react/jsx-props-no-spreading: 0 */
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { addAsterisk } from '@stack/web/form/addAsterisk'
import { Options } from '@stack/web/utils/options'

// View design options here https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/liste-deroulante/
export const SelectFormField = <T extends FieldValues>({
  label,
  errors,
  register,
  path,
  placeholder,
  hint,
  options,
  defaultOption,
  disabled,
}: {
  label: string
  path: FieldPath<T>
  options: Options
  disabled?: boolean
  register: UseFormRegister<T>
  errors: Partial<FieldErrorsImpl<T>>
  defaultOption?: boolean
  hint?: string
  placeholder?: string
}) => {
  // We do not use language errors as record object, we cast to string
  const error = 'todo'
  const id = `input-form-field__${path}`

  const registerProps = register(path)

  label = addAsterisk(label, registerProps.required)
  // TODO Disabled styles classes
  return (
    <div
      className={`fr-select-group ${error ? 'fr-select-group--error' : ''} ${
        registerProps.disabled ? 'fr-select-group--disabled' : ''
      }`}
    >
      <label className="fr-label" htmlFor={id}>
        {label}
        {hint ? <span className="fr-hint-text">{hint}</span> : null}
      </label>
      <select
        className="fr-select fr-select--error"
        aria-describedby="text-select-error-desc-error"
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        {...registerProps}
      >
        {defaultOption ? (
          <option value="">Sélectionnez une option</option>
        ) : null}
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
      {error ? (
        <p id="text-select-error-desc-error" className="fr-error-text">
          {error}
        </p>
      ) : null}
    </div>
  )
}
