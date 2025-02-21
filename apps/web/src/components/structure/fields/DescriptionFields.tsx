import InputFormField from '@app/ui/components/Form/InputFormField'
import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import { optionsWithEmptyValue } from '@app/ui/components/Form/utils/options'
import {
  DescriptionData,
  descriptionMaxLength,
} from '@app/web/app/structure/DescriptionValidation'
import { typologieStructureOptions } from '@app/web/app/structure/typologieStructure'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

const descriptionInfo = (description?: string | null) =>
  `${description?.length ?? 0}/${descriptionMaxLength} caractères`

export const DescriptionFields = <T extends Omit<DescriptionData, 'id'>>({
  form,
}: {
  form: UseFormReturn<T>
}) => {
  const { control, formState } =
    form as unknown as UseFormReturn<DescriptionData>

  return (
    <>
      <p className="fr-mb-4w fr-text--sm fr-text-mention--grey">
        Ces champs sont optionnels
      </p>
      <MultipleSelectFormField
        control={control}
        disabled={formState.isSubmitting}
        path="typologies"
        label="Typologies de la structure"
        options={optionsWithEmptyValue(typologieStructureOptions)}
      />
      <InputFormField
        type="textarea"
        rows={3}
        path="presentationResume"
        label="Résumé de l’activité du lieu"
        hint="Ce résumé permet d’introduire brièvement l’activité du lieu."
        control={control}
        disabled={formState.isSubmitting}
        info={descriptionInfo}
      />
      <InputFormField
        type="textarea"
        rows={6}
        path="presentationDetail"
        label="Description complète du lieu"
        control={control}
        disabled={formState.isSubmitting}
      />
    </>
  )
}
