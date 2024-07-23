import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import { ServicesEtAccompagnementData } from '@app/web/app/structure/ServicesEtAccompagnementValidation'
import {
  modalitesAccompagnementStructureOptions,
  servicesStructureOptions,
} from '@app/web/app/structure/optionsStructure'

export const ServicesEtAccompagnementFields = <
  T extends Omit<ServicesEtAccompagnementData, 'id'>,
>({
  form,
}: {
  form: UseFormReturn<T>
}) => {
  const { control, formState } =
    form as unknown as UseFormReturn<ServicesEtAccompagnementData>

  return (
    <>
      <p className="fr-mb-4w fr-text--sm fr-text-mention--grey">
        Ces champs sont optionnels
      </p>
      <MultipleSelectFormField
        path="services"
        options={servicesStructureOptions}
        label="Thématiques des services d’inclusion numérique"
        hint="Renseignez ici les services proposés dans ce lieu."
        control={control}
        disabled={formState.isSubmitting}
      />

      <CheckboxGroupFormField
        path="modalitesAccompagnement"
        options={modalitesAccompagnementStructureOptions}
        label="Types d’accompagnements proposés"
        control={control}
        disabled={formState.isSubmitting}
        className="fr-mb-0"
      />
    </>
  )
}
