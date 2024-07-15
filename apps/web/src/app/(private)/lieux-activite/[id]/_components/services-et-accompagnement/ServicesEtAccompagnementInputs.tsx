import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import { ServicesEtAccompagnementData } from '@app/web/app/structure/ServicesEtAccompagnementCommandValidation'
import {
  modalitesAccompagnementStructureOptions,
  servicesStructureOptions,
} from '@app/web/app/structure/optionsStructure'

export const ServicesEtAccompagnementInputs = ({
  form,
}: {
  form: UseFormReturn<ServicesEtAccompagnementData>
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
        path="services"
        options={servicesStructureOptions}
        label="Thématiques des services d’inclusion numérique"
        hint="Renseignez ici les services proposés dans ce lieu."
        disabled={isLoading}
      />

      <CheckboxGroupFormField
        control={control}
        path="modalitesAccompagnement"
        options={modalitesAccompagnementStructureOptions}
        label="Types d’accompagnements proposés"
        disabled={isLoading}
        className="fr-mb-0"
      />
    </>
  )
}
