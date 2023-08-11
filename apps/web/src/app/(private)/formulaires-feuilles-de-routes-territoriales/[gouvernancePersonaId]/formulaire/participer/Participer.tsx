'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import InputFormField from '@app/ui/components/Form/InputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import BackLink from '@app/web/components/BackLink'
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
import styles from './Participer.module.css'

const defaultValuesFromData = (
  data: GouvernanceFormulaireForForm,
): DefaultValues<ParticiperData> => {
  if (data.gouvernancePersona === 'structure') {
    return {
      gouvernancePersona: 'structure',
      formulaireGouvernanceId: data.id,
      codeDepartement: data.departementCode ?? undefined,
      nomStructure: data.nomStructure ?? undefined,
      siretStructure: data.siretStructure ?? undefined,
      contactStructure: data.contactStructure
        ? {
            nom: data.contactStructure.nom ?? undefined,
            prenom: data.contactStructure.prenom ?? undefined,
            email: data.contactStructure.email ?? undefined,
            fonction: data.contactStructure.fonction ?? undefined,
          }
        : {},
    }
  }

  // TODO Factorize default values from contact
  const contactPolitique = data.contactPolitique
    ? {
        nom: data.contactPolitique.nom ?? undefined,
        prenom: data.contactPolitique.prenom ?? undefined,
        email: data.contactPolitique.email ?? undefined,
        fonction: data.contactPolitique.fonction ?? undefined,
      }
    : {}
  const contactTechnique = data.contactTechnique
    ? {
        nom: data.contactTechnique.nom ?? undefined,
        prenom: data.contactTechnique.prenom ?? undefined,
        email: data.contactTechnique.email ?? undefined,
        fonction: data.contactTechnique.fonction ?? undefined,
      }
    : undefined

  if (data.gouvernancePersona === 'commune') {
    return {
      gouvernancePersona: 'commune',
      formulaireGouvernanceId: data.id,
      codeCommune: data.communeCode ?? undefined,
      contactPolitique,
      contactTechnique,
    }
  }
  if (data.gouvernancePersona === 'epci') {
    return {
      gouvernancePersona: 'epci',
      formulaireGouvernanceId: data.id,
      codeEpci: data.epciCode ?? undefined,
      contactPolitique,
      contactTechnique,
    }
  }
  if (data.gouvernancePersona === 'conseil-departemental') {
    return {
      gouvernancePersona: 'conseil-departemental',
      formulaireGouvernanceId: data.id,
      codeDepartement: data.departementCode ?? undefined,
      contactPolitique,
      contactTechnique,
    }
  }

  if (data.gouvernancePersona === 'conseil-regional') {
    return {
      gouvernancePersona: 'conseil-regional',
      formulaireGouvernanceId: data.id,
      codeRegion: data.regionCode ?? undefined,
      contactPolitique,
      contactTechnique,
    }
  }

  throw new Error('Could not create default values from persona')
}

const Participer = ({
  persona,
  formulaireGouvernance,
  optionsRegions: _optionsRegions,
  optionsDepartements,
}: {
  persona: GouvernancePersona
  formulaireGouvernance: GouvernanceFormulaireForForm
  optionsRegions: OptionTuples
  optionsDepartements: OptionTuples
}) => {
  console.log('PROPS FORM', formulaireGouvernance)

  const form = useForm<ParticiperData>({
    defaultValues: defaultValuesFromData(formulaireGouvernance),
    resolver: zodResolver(ParticiperValidation),
  })
  console.log('DEFAULT VALUES', defaultValuesFromData(formulaireGouvernance))

  const mutation = trpc.formulaireGouvernance.participer.useMutation()

  console.log('ERRORS', form.formState.errors)

  const onSubmit = async (data: ParticiperData) => {
    console.log('SUBMIT', data)
    try {
      await mutation.mutateAsync(data)
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }

    // TODO Redirect to Confirm page
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
    <>
      <BackLink href="/formulaires-feuilles-de-routes-territoriales" />
      <WhiteCard className="fr-mt-6v fr-mb-30v">
        <h2 className="fr-text-title--blue-france">
          Formulaire{' '}
          {(persona.shortTitle ?? persona.title).toLocaleLowerCase('fr')}
        </h2>
        <p className="fr-text--lg fr-my-4v">
          Complétez ce formulaire pour participer à l’élaboration des feuilles
          de routes territoriales de votre département. Vous serez sollicités à
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
            <h5>
              Renseignez votre {persona.title.toLocaleLowerCase('fr')}{' '}
              <RedAsterisk />
            </h5>
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
    </>
  )
}

export default withTrpc(Participer)
