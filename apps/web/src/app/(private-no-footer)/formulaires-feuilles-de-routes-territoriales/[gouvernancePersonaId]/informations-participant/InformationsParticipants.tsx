'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import ActionBar from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/ActionBar'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { OptionTuples } from '@app/web/utils/options'
import WhiteCard from '@app/web/ui/WhiteCard'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import CollectiviteCodeField from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/participer/CollectiviteCodeField'
import styles from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/participer/Participer.module.css'
import {
  InformationsParticipantData,
  InformationsParticipantValidation,
} from '@app/web/gouvernance/InformationsParticipant'
import { informationsParticipantDefaultValuesFromData } from '@app/web/gouvernance/informationsParticipantHelpers'

const InformationsParticipants = ({
  persona,
  formulaireGouvernance,
  optionsRegions,
  optionsDepartements,
  nextEtapePath,
}: {
  persona: GouvernancePersona
  formulaireGouvernance: GouvernanceFormulaireForForm
  optionsRegions: OptionTuples
  optionsDepartements: OptionTuples
  nextEtapePath: string
}) => {
  const form = useForm<InformationsParticipantData>({
    defaultValues: informationsParticipantDefaultValuesFromData(
      formulaireGouvernance,
    ),
    resolver: zodResolver(InformationsParticipantValidation),
  })

  const mutation =
    trpc.formulaireGouvernance.informationsParticipant.useMutation()
  const router = useRouter()

  const onSubmit = async (data: InformationsParticipantData) => {
    try {
      await mutation.mutateAsync(data)
      router.push(nextEtapePath)
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }
  }
  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful
  const disabled = isLoading

  const [showContactTechnique, setShowContactTechnique] = useState(
    !!form.getValues('contactTechnique'),
  )

  const addContactTechnique = () => {
    setShowContactTechnique(true)
    if (!form.getValues('contactTechnique')) {
      form.setValue('contactTechnique', {
        nom: '',
        prenom: '',
        email: '',
        fonction: '',
      })
    }
  }
  const removeContactTechnique = () => {
    form.setValue('contactTechnique', null)
    setShowContactTechnique(false)
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <WhiteCard>
        <p className="fr-text--sm fr-text--medium fr-my-4v">
          Les champs avec <RedAsterisk /> sont obligatoires
        </p>
        <CollectiviteCodeField
          form={form}
          persona={persona}
          optionsRegions={optionsRegions}
          optionsDepartements={optionsDepartements}
        />
        <hr className="separator--10v" />
        <h5>Contact politique</h5>
        <InputFormField
          control={form.control}
          path="contactPolitique.nom"
          label="Nom"
          asterisk
          disabled={disabled}
        />
        <InputFormField
          control={form.control}
          path="contactPolitique.prenom"
          label="Prénom"
          asterisk
          disabled={disabled}
        />
        <InputFormField
          control={form.control}
          path="contactPolitique.fonction"
          label="Fonction"
          asterisk
          disabled={disabled}
        />
        <InputFormField
          control={form.control}
          path="contactPolitique.email"
          label="Adresse e-mail"
          asterisk
          disabled={disabled}
        />
        <hr className="separator--10v" />

        {showContactTechnique ? (
          <>
            <div className={styles.contactTechniqueHeader}>
              <h5>Contact technique</h5>
              {showContactTechnique && (
                <Button
                  type="button"
                  className="fr-ml-1w"
                  priority="secondary"
                  iconId="fr-icon-delete-bin-line"
                  iconPosition="right"
                  onClick={removeContactTechnique}
                >
                  Supprimer
                </Button>
              )}
            </div>
            <InputFormField
              control={form.control}
              path="contactTechnique.nom"
              label="Nom"
              asterisk
              disabled={disabled}
            />
            <InputFormField
              control={form.control}
              path="contactTechnique.prenom"
              label="Prénom"
              asterisk
              disabled={disabled}
            />
            <InputFormField
              control={form.control}
              path="contactTechnique.fonction"
              label="Fonction"
              asterisk
              disabled={disabled}
            />
            <InputFormField
              control={form.control}
              path="contactTechnique.email"
              label="Adresse e-mail"
              asterisk
              disabled={disabled}
            />
          </>
        ) : (
          <div className="fr-btns-group fr-btns-group--icon-left">
            <Button
              type="button"
              priority="tertiary"
              iconId="fr-icon-add-line"
              onClick={addContactTechnique}
            >
              Ajouter un contact technique (facultatif)
            </Button>
          </div>
        )}
      </WhiteCard>
      <WhiteCard className="fr-mt-6v">
        <h5>Schéma ou gouvernance locale</h5>
        <InputFormField
          control={form.control}
          path="schemaOuGouvernanceLocale"
          label="Êtes vous impliqués dans un schéma ou une gouvernance locale relative à l'inclusion numérique ? Si oui laquelle (SDUN, CRTE, etc.)"
          disabled={disabled}
        />
      </WhiteCard>
      <ActionBar
        loading={isLoading}
        autoSaving={isLoading}
        formulaireGouvernanceId={formulaireGouvernance.id}
      />
    </form>
  )
}

export default withTrpc(InformationsParticipants)
