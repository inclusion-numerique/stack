import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { ModalitesAccesAuServiceData } from '@app/web/app/structure/ModalitesAccesAuServiceCommandValidation'
import { fraisAChargeStructureOptions } from '@app/web/app/structure/optionsStructure'

export const ModalitesAccesAuServiceInputs = ({
  form,
}: {
  form: UseFormReturn<ModalitesAccesAuServiceData>
}) => {
  const {
    control,
    formState: { isSubmitSuccessful, isSubmitting },
  } = form

  const showPhoneInput = !!form.watch('modalitesAcces.parTelephone')
  const showEmailInput = !!form.watch('modalitesAcces.parMail')

  const isLoading = isSubmitting || isSubmitSuccessful

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
        control={control}
        path="modalitesAcces.surPlace"
        label="Se présenter sur place"
        disabled={isLoading}
      />
      <CheckboxFormField
        control={control}
        path="modalitesAcces.parTelephone"
        label="Téléphoner"
        disabled={isLoading}
      />
      {showPhoneInput && (
        <InputFormField
          control={control}
          path="modalitesAcces.numeroTelephone"
          label="Précisez le téléphone de contact"
          hint="Exemples : 06 00 00 00 00 ou 0600000000"
          asterisk
          disabled={isLoading}
        />
      )}
      <CheckboxFormField
        control={control}
        path="modalitesAcces.parMail"
        label="Contacter par mail"
        disabled={isLoading}
      />
      {showEmailInput && (
        <InputFormField
          control={control}
          path="modalitesAcces.adresseMail"
          label="Précisez l’adresse mail de contact"
          hint="Format attendu : nom@domaine.fr"
          asterisk
          disabled={isLoading}
        />
      )}
      <CheckboxGroupFormField
        control={control}
        path="fraisACharge"
        label="Frais à charge"
        disabled={isLoading}
        hint="Indiquez les conditions financières d'accès aux services."
        options={fraisAChargeStructureOptions}
      />
    </>
  )
}
