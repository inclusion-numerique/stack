import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import {
  AutreStructureValidation,
  EnregistrerAutreStructureData,
} from '@app/web/gouvernance/AutreStructure'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import {
  AutreStructure,
  UseAutresStructuresReturn,
} from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/autres-structures/useAutresStructures'

const AutreStructureForm = ({
  structureKey,
  autreStructure,
  validerAutreStructure,
  supprimerAutreStructure,
  disabled,
  formulaireGouvernanceId,
}: {
  structureKey: string
  autreStructure: AutreStructure
  disabled: boolean
  formulaireGouvernanceId: string
} & Pick<
  UseAutresStructuresReturn,
  'validerAutreStructure' | 'supprimerAutreStructure'
>) => {
  const form = useForm<EnregistrerAutreStructureData>({
    defaultValues: {
      action: 'enregistrer',
      participantId: autreStructure.participantId,
      formulaireGouvernanceId,
      contact: autreStructure.contact ?? {},
      nomStructure: autreStructure.nomStructure ?? undefined,
    },
    resolver: zodResolver(AutreStructureValidation),
  })

  const onSubmit = (data: EnregistrerAutreStructureData) => {
    validerAutreStructure(structureKey, {
      nomStructure: data.nomStructure,
      participantId: data.participantId ?? null,
      contact: {
        nom: data.contact.nom,
        prenom: data.contact.prenom,
        email: data.contact.email,
        fonction: data.contact.fonction,
      },
    })
  }

  const isLoading = false

  return (
    <form className="" onSubmit={form.handleSubmit(onSubmit)}>
      <h6 className="fr-mb-8v fr-text-title--blue-france">
        Ajouter une structure partenaire
      </h6>
      <p className="fr-text--sm fr-text--medium fr-mb-8v">
        Les champs avec <RedAsterisk /> sont obligatoires
      </p>
      <InputFormField
        control={form.control}
        path="nomStructure"
        label="Nom de la structure"
        asterisk
        disabled={disabled}
      />
      <hr className="fr-pb-8v fr-mt-8v" />
      <h6 className="fr-mb-4v">Contact de la structure</h6>
      <InputFormField
        control={form.control}
        path="contact.nom"
        label="Nom"
        asterisk
        disabled={disabled}
      />
      <InputFormField
        control={form.control}
        path="contact.prenom"
        label="Prénom"
        asterisk
        disabled={disabled}
      />
      <InputFormField
        control={form.control}
        path="contact.fonction"
        label="Fonction"
        asterisk
        disabled={disabled}
      />
      <InputFormField
        control={form.control}
        path="contact.email"
        label="Adresse e-mail"
        asterisk
        disabled={disabled}
      />
      <div className="fr-flex fr-justify-content-end fr-mt-8v">
        <Button
          type="button"
          priority="secondary"
          iconId="fr-icon-delete-bin-line"
          disabled={disabled}
          className="fr-mr-1w"
          onClick={() =>
            supprimerAutreStructure(
              structureKey,
              autreStructure.participantId
                ? { participantId: autreStructure.participantId }
                : undefined,
            )
          }
        >
          Supprimer
        </Button>
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

export default AutreStructureForm
