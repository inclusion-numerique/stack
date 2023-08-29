'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import InputFormField from '@app/ui/components/Form/InputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import { useRouter } from 'next/navigation'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import WhiteCard from '@app/web/ui/WhiteCard'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import {
  ParticiperData,
  ParticiperValidation,
} from '@app/web/gouvernance/Participer'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  emptyOptionTuple,
  OptionTuples,
  optionTuplesToOptions,
} from '@app/web/utils/options'
import { participerDefaultValuesFromData } from '@app/web/gouvernance/participerHelpers'
import CollectiviteCodeField from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/participer/CollectiviteCodeField'
import styles from './Participer.module.css'

const Participer = ({
  persona,
  formulaireGouvernance,
  optionsRegions,
  optionsDepartements,
}: {
  persona: GouvernancePersona
  formulaireGouvernance: GouvernanceFormulaireForForm
  optionsRegions: OptionTuples
  optionsDepartements: OptionTuples
}) => {
  const form = useForm<ParticiperData>({
    defaultValues: participerDefaultValuesFromData(formulaireGouvernance),
    resolver: zodResolver(ParticiperValidation),
  })

  const mutation = trpc.formulaireGouvernance.participer.useMutation()
  const router = useRouter()

  const onSubmit = async (data: ParticiperData) => {
    try {
      const { etapeInfo } = await mutation.mutateAsync(data)
      router.push(etapeInfo.absolutePath)
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
    <WhiteCard className="fr-mt-6v fr-mb-30v">
      <h2 className="fr-text-title--blue-france">
        Formulaire{' '}
        {(persona.shortTitle ?? persona.title).toLocaleLowerCase('fr')}
      </h2>
      <p className="fr-text--lg fr-my-4v">
        Complétez ce formulaire pour participer à l’élaboration des feuilles de
        routes territoriales de votre département. Vous serez sollicités à
        l’occasion des concertations territoriales.
      </p>
      <p className="fr-text--sm fr-text--medium fr-my-4v">
        Les champs avec <RedAsterisk /> sont obligatoires
      </p>
      <hr className="separator--10v" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {formulaireGouvernance.gouvernancePersona === 'structure' ? (
          <>
            <h5>Informations sur la structure</h5>
            <InputFormField
              control={form.control}
              path="nomStructure"
              label="Nom structure"
              asterisk
              disabled={disabled}
            />
            <InputFormField
              control={form.control}
              path="siretStructure"
              label="SIRET structure"
              asterisk
              disabled={disabled}
            />
            <SelectFormField
              control={form.control}
              path="codeDepartement"
              label="Département"
              asterisk
              disabled={disabled}
              options={optionTuplesToOptions([
                emptyOptionTuple,
                ...optionsDepartements,
              ])}
            />
          </>
        ) : (
          <CollectiviteCodeField
            form={form}
            persona={persona}
            optionsRegions={optionsRegions}
            optionsDepartements={optionsDepartements}
          />
        )}
        <hr className="separator--10v" />

        {formulaireGouvernance.gouvernancePersona === 'structure' ? (
          <>
            <h5>Contact de la structure</h5>
            <InputFormField
              control={form.control}
              path="contactStructure.nom"
              label="Nom"
              asterisk
              disabled={disabled}
            />
            <InputFormField
              control={form.control}
              path="contactStructure.prenom"
              label="Prénom"
              asterisk
              disabled={disabled}
            />
            <InputFormField
              control={form.control}
              path="contactStructure.fonction"
              label="Fonction"
              asterisk
              disabled={disabled}
            />
            <InputFormField
              control={form.control}
              path="contactStructure.email"
              label="Adresse e-mail"
              asterisk
              disabled={disabled}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        <div className="fr-btns-group fr-mt-10v">
          <Button
            type="submit"
            disabled={disabled}
            className={classNames(isLoading && 'fr-btn--loading')}
          >
            Confirmer et envoyer
          </Button>
        </div>
      </form>
    </WhiteCard>
  )
}

export default withTrpc(Participer)
