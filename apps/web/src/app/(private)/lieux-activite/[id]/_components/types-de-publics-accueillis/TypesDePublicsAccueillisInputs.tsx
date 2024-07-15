import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import {
  priseEnChargeSpecifiqueStructureOptions,
  publicsAccueillisStructureOptions,
} from '@app/web/app/structure/optionsStructure'
import { TypesDePublicsAccueillisData } from '@app/web/app/structure/TypesDePublicsAccueillisCommandValidation'

export const TypesDePublicsAccueillisInputs = ({
  form,
}: {
  form: UseFormReturn<TypesDePublicsAccueillisData>
}) => {
  const {
    control,
    formState: { isSubmitSuccessful, isSubmitting },
  } = form

  const isLoading = isSubmitting || isSubmitSuccessful

  const publicsAccueillisKey =
    form.watch('publicsSpecifiquementAdresses')?.join(',') ?? 'none'
  const toutPublicKey = form.watch('toutPublic') ? 'true' : 'false'

  // Check if all publics are checked if toutPublic is checked
  form.watch((data, { name, type }) => {
    // This watcher is only concerned for these fields, only from user change action
    if (name !== 'toutPublic' && name !== 'publicsSpecifiquementAdresses')
      return
    // Only if this is a user change, not triggered from this listener
    if (type !== 'change') {
      return
    }

    // Check all publics if toutPublic is checked
    const allPublicsChecked =
      Array.isArray(data.publicsSpecifiquementAdresses) &&
      data.publicsSpecifiquementAdresses.length ===
        publicsAccueillisStructureOptions.length

    if (name === 'toutPublic') {
      if (data.toutPublic && !allPublicsChecked) {
        form.setValue(
          'publicsSpecifiquementAdresses',
          publicsAccueillisStructureOptions.map((option) => option.value),
        )
      } else if (
        !data.toutPublic &&
        data.publicsSpecifiquementAdresses?.length !== 0
      ) {
        form.setValue('publicsSpecifiquementAdresses', [])
      }
    }

    // Check tout public if all publics are checked
    if (name === 'publicsSpecifiquementAdresses') {
      if (allPublicsChecked && !data.toutPublic) {
        form.setValue('toutPublic', true)
      } else if (!allPublicsChecked && data.toutPublic) {
        form.setValue('toutPublic', false)
      }
    }
  })

  return (
    <>
      <p className="fr-mb-1v fr-mt-1w">
        Précisez les publics accueillis dans ce lieu
      </p>
      <p className="fr-text-mention--grey fr-text--sm fr-mb-0">
        Par défaut, un lieu d’inclusion numérique est inclusif et peut
        accueillir tout public. Malgré tout, certains lieux sont habilités à
        recevoir exclusivement certains publics. Vous pouvez le préciser ici.
      </p>
      <CheckboxFormField
        key={toutPublicKey}
        control={control}
        path="toutPublic"
        label="Tout public (tout sélectionner)"
        disabled={isLoading}
        className="fr-mb-0 fr-mt-4v"
      />
      <CheckboxGroupFormField
        key={publicsAccueillisKey}
        control={control}
        path="publicsSpecifiquementAdresses"
        options={publicsAccueillisStructureOptions}
        disabled={isLoading}
        className="fr-mb-0 fr-ml-4v"
        style={{ marginTop: -16 }}
        small
      />
      <CheckboxGroupFormField
        control={control}
        path="priseEnChargeSpecifique"
        options={priseEnChargeSpecifiqueStructureOptions}
        label="Prise en charge spécifique"
        disabled={isLoading}
        hint="Indiquez si le lieu est en mesure d'accompagner et soutenir des publics ayant des besoins particuliers."
        className="fr-mb-0"
      />
    </>
  )
}
