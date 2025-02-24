import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import { useWatchSubscription } from '@app/ui/hooks/useWatchSubscription'
import { TypesDePublicsAccueillisData } from '@app/web/app/structure/TypesDePublicsAccueillisValidation'
import {
  priseEnChargeSpecifiqueStructureOptions,
  publicsAccueillisStructureOptions,
} from '@app/web/app/structure/optionsStructure'
import React, { useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'

export const TypesDePublicsAccueillisFields = <
  T extends Omit<TypesDePublicsAccueillisData, 'id'>,
>({
  form,
}: {
  form: UseFormReturn<T>
}) => {
  const { control, formState, watch, setValue } =
    form as unknown as UseFormReturn<TypesDePublicsAccueillisData>

  const publicsAccueillisKey =
    watch('publicsSpecifiquementAdresses')?.join(',') ?? 'none'
  const toutPublicKey = watch('toutPublic') ? 'true' : 'false'

  useWatchSubscription(
    watch,
    useCallback(
      (data, { name, type }) => {
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
            setValue(
              'publicsSpecifiquementAdresses',
              publicsAccueillisStructureOptions.map((option) => option.value),
            )
          } else if (
            !data.toutPublic &&
            data.publicsSpecifiquementAdresses &&
            data.publicsSpecifiquementAdresses.length > 0
          ) {
            setValue('publicsSpecifiquementAdresses', [])
          }
        }

        // Check tout public if all publics are checked
        if (name === 'publicsSpecifiquementAdresses') {
          if (allPublicsChecked && !data.toutPublic) {
            setValue('toutPublic', true)
          } else if (!allPublicsChecked && data.toutPublic) {
            setValue('toutPublic', false)
          }
        }
      },
      [setValue],
    ),
  )

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
        path="toutPublic"
        label="Tout public (tout sélectionner)"
        control={control}
        disabled={formState.isSubmitting}
        className="fr-mb-0 fr-mt-4v"
      />
      <CheckboxGroupFormField
        key={publicsAccueillisKey}
        path="publicsSpecifiquementAdresses"
        options={publicsAccueillisStructureOptions}
        control={control}
        disabled={formState.isSubmitting}
        className="fr-mb-0 fr-ml-4v"
        style={{ marginTop: -16 }}
        small
      />
      <CheckboxGroupFormField
        path="priseEnChargeSpecifique"
        options={priseEnChargeSpecifiqueStructureOptions}
        label="Prise en charge spécifique"
        hint="Indiquez si le lieu est en mesure d'accompagner et soutenir des publics ayant des besoins particuliers."
        control={control}
        disabled={formState.isSubmitting}
        className="fr-mb-0"
      />
    </>
  )
}
