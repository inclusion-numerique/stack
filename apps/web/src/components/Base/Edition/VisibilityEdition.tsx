import React, { ReactNode } from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import ResourceBaseRichRadioElement from '../../Resource/ResourceBaseRichRadioElement'
import { PrivacyTag } from '../../PrivacyTags'

const VisibilityEdition = <T extends { isPublic: boolean }>({
  control,
  disabled,
  model,
  label,
  asterisk,
}: {
  control: Control<T>
  disabled?: boolean
  model: 'Base' | 'Collection'
  label?: ReactNode
  asterisk?: boolean
}) => (
  <Controller
    control={control}
    name={'isPublic' as Path<T>}
    render={({ field: { onChange, name, value }, fieldState: { error } }) => (
      <fieldset
        className="fr-fieldset"
        id="radio-rich"
        aria-labelledby="radio-rich-legend radio-rich-messages"
      >
        {!!label && (
          <legend
            id="radio-rich-legend"
            className="fr-label fr-mb-2v fr-ml-1-5v"
          >
            {label} {asterisk && <RedAsterisk />}
          </legend>
        )}
        <ResourceBaseRichRadioElement
          id={`radio-${model.toLowerCase()}-public`}
          disabled={disabled}
          data-testid={`visibility-radio-${model.toLowerCase()}-public`}
          name={name}
          value={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Value is string
            value === undefined || value === null ? null : value.toString()
          }
          radioValue="true"
          onChange={() => {
            onChange(true)
          }}
        >
          <div className="fr-mr-1w">
            {model} publique
            <p className="fr-text--xs fr-hint-text fr-mb-0">
              Visible par tous les visiteurs.
            </p>
          </div>
          <PrivacyTag isPublic />
        </ResourceBaseRichRadioElement>
        <ResourceBaseRichRadioElement
          id={`radio-${model.toLowerCase()}-private`}
          disabled={disabled}
          data-testid={`visibility-radio-${model.toLowerCase()}-private`}
          name={name}
          value={
            value === undefined || value === null ? null : value.toString()
          }
          radioValue="false"
          onChange={() => {
            onChange(false)
          }}
        >
          <div className="fr-mr-1w">
            {model} privée
            <p className="fr-text--xs fr-hint-text fr-mb-0">
              Accessible uniquement aux membres et aux administrateurs que vous
              inviterez.
            </p>
          </div>
          <PrivacyTag />
        </ResourceBaseRichRadioElement>
        {error && (
          <p className="fr-error-text" id="input-form-field__isPublic__error">
            {error.message}
          </p>
        )}
      </fieldset>
    )}
  />
)

export default VisibilityEdition
