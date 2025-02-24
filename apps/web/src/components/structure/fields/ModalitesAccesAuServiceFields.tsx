import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { ModalitesAccesAuServiceData } from '@app/web/app/structure/ModalitesAccesAuServiceValidation'
import { fraisAChargeStructureOptions } from '@app/web/app/structure/optionsStructure'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

export const ModalitesAccesAuServiceFields = <
  T extends Omit<ModalitesAccesAuServiceData, 'id'>,
>({
  form,
}: {
  form: UseFormReturn<T>
}) => {
  const { control, formState, watch } =
    form as unknown as UseFormReturn<ModalitesAccesAuServiceData>

  const showPhoneInput = !!watch('modalitesAcces.parTelephone')
  const showEmailInput = !!watch('modalitesAcces.parMail')

  return (
    <>
      <p className="fr-mb-4w fr-text--sm fr-text-mention--grey">
        Ces champs sont optionnels
      </p>
      <p className="fr-mb-1v">Modalités d’accès</p>
      <p className="fr-text-mention--grey fr-text--sm fr-mb-0">
        Indiquez comment bénéficier de ses services. Sélectionnez un ou
        plusieurs choix.
      </p>
      <CheckboxFormField
        path="modalitesAcces.surPlace"
        label="Se présenter sur place"
        control={control}
        disabled={formState.isSubmitting}
      />
      <CheckboxFormField
        path="modalitesAcces.parTelephone"
        label="Téléphoner"
        control={control}
        disabled={formState.isSubmitting}
      />
      {showPhoneInput && (
        <InputFormField
          path="modalitesAcces.numeroTelephone"
          label="Précisez le téléphone de contact"
          hint="Exemples : 06 00 00 00 00 ou 0600000000"
          asterisk
          control={control}
          disabled={formState.isSubmitting}
        />
      )}
      <CheckboxFormField
        path="modalitesAcces.parMail"
        label="Contacter par mail"
        control={control}
        disabled={formState.isSubmitting}
      />
      {showEmailInput && (
        <InputFormField
          path="modalitesAcces.adresseMail"
          label="Précisez l’adresse mail de contact"
          hint="Format attendu : nom@domaine.fr"
          asterisk
          control={control}
          disabled={formState.isSubmitting}
        />
      )}
      <CheckboxGroupFormField
        path="fraisACharge"
        label="Frais à charge"
        hint="Indiquez les conditions financières d'accès aux services."
        options={fraisAChargeStructureOptions}
        control={control}
        disabled={formState.isSubmitting}
      />
    </>
  )
}
