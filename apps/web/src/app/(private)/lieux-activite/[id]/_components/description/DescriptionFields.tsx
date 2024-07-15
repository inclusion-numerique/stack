import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import {
  DescriptionData,
  descriptionMaxLength,
} from '@app/web/app/structure/DescriptionCommandValidation'
import { typologieStructureOptions } from '@app/web/app/structure/typologieStructure'

const descriptionInfo = (description?: string | null) =>
  `${description?.length ?? 0}/${descriptionMaxLength} caractères`

export const DescriptionFields = ({
  form,
}: {
  form: UseFormReturn<DescriptionData>
}) => {
  const {
    control,
    formState: { isSubmitSuccessful, isSubmitting },
  } = form

  const isLoading = isSubmitting || isSubmitSuccessful

  return (
    <>
      <p className="fr-mb-4w fr-text--sm fr-text-mention--grey">
        Ces champs sont optionnels
      </p>
      <MultipleSelectFormField
        control={control}
        path="typologies"
        label="Typologies de la structure"
        disabled={isLoading}
        options={typologieStructureOptions}
      />
      <InputFormField
        type="textarea"
        label="Résumé de l’activité du lieu"
        hint="Ce résumé permet d’introduire brièvement l’activité du lieu."
        control={control}
        rows={3}
        info={descriptionInfo}
        path="presentationResume"
      />
      <InputFormField
        type="textarea"
        path="presentationDetail"
        control={control}
        rows={6}
        disabled={isLoading}
        label="Description complète du lieu"
      />
    </>
  )
}
