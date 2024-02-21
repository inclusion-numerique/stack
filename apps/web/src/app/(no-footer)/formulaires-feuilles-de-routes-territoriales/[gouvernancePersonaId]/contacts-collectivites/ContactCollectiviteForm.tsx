import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import {
  ContactCollectiviteData,
  ContactCollectiviteValidation,
} from '@app/web/gouvernance/ContactCollectivite'
import {
  ContactCollectivite,
  UseContactsCollectivitesReturn,
} from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/contacts-collectivites/useContactsCollectivites'
import RedAsterisk from '@app/web/ui/RedAsterisk'

const ContactCollectiviteForm = ({
  contactCollectivite,
  saveContact,
  disabled,
  formulaireGouvernanceId,
}: {
  contactCollectivite: ContactCollectivite
  disabled: boolean
  formulaireGouvernanceId: string
} & Pick<UseContactsCollectivitesReturn, 'saveContact'>) => {
  const form = useForm<ContactCollectiviteData>({
    defaultValues: {
      participantId: contactCollectivite.participantId,
      type: contactCollectivite.type,
      formulaireGouvernanceId,
      ...contactCollectivite.data,
    },
    resolver: zodResolver(ContactCollectiviteValidation),
  })

  const onSubmit = (data: ContactCollectiviteData) => {
    saveContact(contactCollectivite.participantId, data)
  }

  const isLoading = false

  return (
    <form className="fr-mt-8v" onSubmit={form.handleSubmit(onSubmit)}>
      <h6 className="fr-mb-4v">Contact</h6>
      <p className="fr-text--sm fr-text--medium fr-mb-4v">
        Les champs avec <RedAsterisk /> sont obligatoires
      </p>
      <InputFormField
        control={form.control}
        path="nom"
        label="Nom"
        asterisk
        disabled={disabled}
      />
      <InputFormField
        control={form.control}
        path="prenom"
        label="Prénom"
        asterisk
        disabled={disabled}
      />
      <InputFormField
        control={form.control}
        path="fonction"
        label="Fonction"
        asterisk
        disabled={disabled}
      />
      <InputFormField
        control={form.control}
        path="email"
        label="Adresse e-mail"
        asterisk
        disabled={disabled}
      />
      <div className="fr-flex fr-justify-content-end fr-mt-8v">
        <Button
          className={isLoading ? 'fr-btn--loading' : undefined}
          type="submit"
          priority="primary"
          iconId="fr-icon-check-line"
        >
          Enregistrer
        </Button>
      </div>
    </form>
  )
}

export default ContactCollectiviteForm
