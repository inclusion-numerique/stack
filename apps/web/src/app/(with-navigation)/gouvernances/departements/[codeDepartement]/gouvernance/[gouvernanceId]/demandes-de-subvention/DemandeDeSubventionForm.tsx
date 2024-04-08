'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import type { Upload } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import React, { ChangeEventHandler, Fragment } from 'react'
import * as Sentry from '@sentry/nextjs'
import { createToast } from '@app/ui/toast/createToast'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import FileFormField from '@app/ui/components/Form/FileFormField'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import classNames from 'classnames'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import SelectOptionsList from '@app/ui/components/Form/SelectOptionsList'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Button from '@codegouvfr/react-dsfr/Button'
import { useDebounce } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import { useScrollToError } from '@app/ui/hooks/useScrollToError'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  contexteDemandeSubventionMaxChars,
  DemandeDeSubventionData,
  DemandeDeSubventionValidation,
  pieceJointeBudgetAllowedExtensions,
  pieceJointeBudgetMaxSize,
} from '@app/web/gouvernance/DemandeDeSubvention'
import { stripHtmlTags } from '@app/web/utils/stripHtmlTags'
import { besoinSubventionOptions } from '@app/web/gouvernance/besoinSubvention'
import { numberToEuros } from '@app/web/utils/formatNumber'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import styles from './DemandeDeSubventionForm.module.css'

const contexteSubventionInfoText = (title?: string | null) =>
  `${title ? stripHtmlTags(title).length : 0} / ${contexteDemandeSubventionMaxChars}`

const cardClassName = 'fr-border fr-p-8v fr-pb-2v fr-mb-6v'

const DemandeDeSubventionForm = ({
  defaultValues,
  feuillesDeRouteOptions,
  pieceJointeBudget,
  beneficiairesOptions,
  backUrl,
}: {
  defaultValues: DefaultValues<DemandeDeSubventionData> & {
    montantDotationRestante: number
  }
  feuillesDeRouteOptions: SelectOption[]
  pieceJointeBudget?: Pick<Upload, 'name'>
  beneficiairesOptions: SelectOption[]
  backUrl: string
}) => {
  const form = useForm<DemandeDeSubventionData>({
    resolver: zodResolver(DemandeDeSubventionValidation),
    defaultValues,
    reValidateMode: 'onChange',
  })

  const scrollToError = useScrollToError({ errors: form.formState.errors })

  const {
    fields: beneficiairesFields,
    append: appendBeneficiaire,
    remove: removeBeneficiaire,
    update: updateBeneficiaire,
  } = useFieldArray({
    control: form.control,
    name: 'beneficiaires',
    keyName: '_formKey',
  })

  const uploadFileValue = form.watch('pieceJointeBudgetFile') as
    | string
    | undefined
  const hasSubventionEtp = form.watch('subventionEtpChecked')
  const hasSubventionPrestation = form.watch('subventionPrestationChecked')
  const beneficiaires = form.watch('beneficiaires') || []
  const subventionDemandee = form.watch('subventionDemandee')
  const beneficiairesSubventionAllouee = beneficiaires.reduce(
    (accumulator, beneficiaire) => accumulator + (beneficiaire.subvention || 0),
    0,
  )
  const beneficiairesSubventionReste = subventionDemandee
    ? subventionDemandee - beneficiairesSubventionAllouee
    : null

  const pieceJointeBudgetKeyError =
    form.formState.errors.pieceJointeBudgetKey?.message

  const beneficiairesErrorMessage =
    form.formState.errors.beneficiaires?.root?.message ??
    form.formState.errors.beneficiaires?.message

  // If user has already uploaded a file, we display it in the file input info
  // If he changes the file, we hide the previous file name

  const pieceJointeBudgetFileInfo =
    pieceJointeBudget && !uploadFileValue ? (
      <span className="fr-flex fr-direction-column fr-align-items-start fr-justify-content-center fr-mt-2v fr-text-default--info">
        <span>
          <span className="fr-icon-checkbox-fill fr-icon--sm fr-mr-1v" />
          {pieceJointeBudget.name}
        </span>
      </span>
    ) : undefined

  // File upload hooks for storage
  const fileUpload = useFileUpload({})
  const router = useRouter()

  // Upload model creation mutation
  const createUpload = trpc.upload.create.useMutation()

  const mutation = trpc.demandesDeSubvention.createOrUpdate.useMutation()

  const onSubmit = async (data: DemandeDeSubventionData) => {
    let uploadKey = data.pieceJointeBudgetKey
    if (uploadKey !== defaultValues.pieceJointeBudgetKey) {
      try {
        // Upload file and get uploaded file key
        const uploaded = await fileUpload.upload(
          data.pieceJointeBudgetFile as File,
        )

        if (!uploaded || 'error' in uploaded) {
          form.setError('pieceJointeBudgetFile', {
            message: 'Une erreur est survenue lors de l’envoi du fichier',
          })
          createToast({
            priority: 'error',
            message:
              'Une erreur est survenue lors de l’envoi de votre pièce jointe de budget prévisionnel',
          })
          setTimeout(scrollToError.trigger, 50)
          // Upload failed, error will be displayed from hooks states
          return
        }

        // Create upload model
        const uploadModel = await createUpload.mutateAsync({
          file: uploaded,
        })

        // Reset upload input
        uploadKey = uploadModel.key
        setTimeout(() => {
          form.setValue('pieceJointeBudgetFile', null)
          form.setValue('pieceJointeBudgetKey', uploadModel.key, {
            shouldValidate: true,
          })
        }, 0)
      } catch (error) {
        Sentry.captureException(error)
        createToast({
          priority: 'error',
          message:
            'Une erreur est survenue lors de l’envoi de votre pièce jointe de budget prévisionnel',
        })
      }
    }
    try {
      await mutation.mutateAsync({ ...data, pieceJointeBudgetKey: uploadKey })
      createToast({
        priority: 'success',
        message: 'La demande de subvention a bien été enregistrée',
      })
      router.push(backUrl)
      router.refresh()
    } catch (mutationError) {
      if (
        applyZodValidationMutationErrorsToForm(mutationError, form.setError)
      ) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement de la demande de subvention',
      })
    }
  }

  const isLoading = form.formState.isSubmitting

  const { error } = mutation
  form.watch((data, { name }) => {
    // If file changed, we reset the file key waiting for upload in submit logic
    if (name === 'pieceJointeBudgetFile') {
      form.setValue('pieceJointeBudgetKey', '__upload-pending__')
    }

    // If montant demandé change and one beneficiary only, we set the subvention to the montant demandé
    if (name === 'subventionDemandee' && beneficiaires.length === 1) {
      updateBeneficiaire(0, {
        ...beneficiaires[0],
        subvention: data.subventionDemandee ?? 0,
      })
    }

    if (!data.subventionEtpChecked && !!data.subventionEtp) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      form.setValue('subventionEtp', undefined)
    }

    if (!data.subventionPrestationChecked && !!data.subventionPrestation) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      form.setValue('subventionPrestation', undefined)
    }

    // If the user checks the ETP subvention and the subvention demandee is set, we set the ETP subvention to the subvention demandee
    if (
      !!data.subventionDemandee &&
      data.subventionEtpChecked &&
      !data.subventionPrestationChecked &&
      !isDefinedAndNotNull(data.subventionEtp)
    ) {
      form.setValue('subventionEtp', data.subventionDemandee)
    }

    // If the user checks the Prestation subvention and the subvention demandee is set, we set the Prestation subvention to the subvention demandee
    if (
      !!data.subventionDemandee &&
      data.subventionPrestationChecked &&
      !data.subventionEtpChecked &&
      !isDefinedAndNotNull(data.subventionPrestation)
    ) {
      form.setValue('subventionPrestation', data.subventionDemandee)
    }
  })

  const beneficiaireOptionsWithDisabledSelected = beneficiairesOptions.map(
    (membre) =>
      beneficiaires.some(
        (beneficiaire) => beneficiaire.membreGouvernanceId === membre.value,
      )
        ? { ...membre, disabled: true }
        : membre,
  )

  const debouncedReste = useDebounce(beneficiairesSubventionReste, 750)
  const beneficiaireResteInfo =
    beneficiairesSubventionReste === null || debouncedReste === null ? null : (
      <span className="fr-display-block fr-text-default--info fr-pt-3v">
        <span className="fr-icon-info-fill fr-icon--sm fr-mr-1v" />
        Reste à allouer&nbsp;: {numberToEuros(debouncedReste)}
        &nbsp;/&nbsp;{numberToEuros(subventionDemandee)}
      </span>
    )

  const onBeneficiaireChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const membreId = event.currentTarget.value
    if (!membreId) {
      return
    }

    const membre = beneficiairesOptions.find((m) => m.value === membreId)

    if (!membre) {
      return
    }

    appendBeneficiaire({
      membreGouvernanceId: membre.value,
      nom: membre.name,
      subvention: beneficiaires.length === 0 ? subventionDemandee : 0,
    })
  }

  return (
    <form id="signup-with-email" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Besoins */}
      <div className={cardClassName}>
        <h2 className="fr-h5 fr-mb-2v">Besoins liés à l’action</h2>
        <p className="fr-text-mention--grey fr-mb-0">
          Indiquez à quel besoins se rapporte l’action pour laquelle vous
          demandez une subvention. Si vos besoins ont changé depuis leur
          première expression dans le formulaire de janvier 2024 vous pouvez
          tout à fait sélectionner une autre catégorie de besoin.
        </p>
        <hr className="fr-separator-8v" />
        <MultipleSelectFormField
          className="fr-mb-8v"
          asterisk
          label="Sélectionner les besoins correspondant à cette action"
          control={form.control}
          path="besoins"
          defaultOption
          defaultOptionLabel=""
          options={besoinSubventionOptions}
          disabled={isLoading}
        />
      </div>

      {/* Informations */}
      <div className={cardClassName}>
        <h2 className="fr-h5 fr-mb-2v">Informations sur l’action</h2>
        <hr className="fr-separator-8v" />
        <InputFormField
          asterisk
          control={form.control}
          path="nomAction"
          label="Nom de l’action"
          disabled={isLoading}
          className="fr-mb-8v"
        />
        <SelectFormField
          asterisk
          placeholder=" "
          control={form.control}
          path="feuilleDeRouteId"
          label="Feuille de route associée à l’action proposée"
          disabled={isLoading}
          options={feuillesDeRouteOptions}
          className="fr-mb-8v"
        />
        <RichTextFormField
          asterisk
          label="Contexte de l’action"
          hint="Préciser dans quel contexte s’inscrit cette action."
          info={contexteSubventionInfoText}
          form={form}
          path="contexte"
          disabled={isLoading}
          className="fr-mb-8v"
        />
        <RichTextFormField
          asterisk
          label="Description de l’action"
          hint="Préciser la nature de l'action, ses objectifs, ses bénéficiaires, son impact et indicateurs associés."
          form={form}
          path="description"
          disabled={isLoading}
          className="fr-mb-8v"
        />
      </div>

      {/* Budget */}
      <div className={cardClassName}>
        <h2 className="fr-h5 fr-mb-2v">
          Informations sur le budget et le financement
        </h2>
        <hr className="fr-separator-8v" />
        <InputFormField
          asterisk
          control={form.control}
          path="budgetGlobal"
          label="Budget global de l’action"
          type="number"
          min={0}
          step={0.01}
          disabled={isLoading}
          icon="fr-icon-money-euro-circle-line"
          className={styles.moneyInput}
        />
        <FileFormField
          asterisk
          label="Ajoutez une pièce-jointe détaillant le budget prévisionnel de l'action sur l'année 2024 à minima, incluant les co-financements éventuels"
          hint={`Taille maximale : ${formatByteSize(
            pieceJointeBudgetMaxSize,
          )}. Formats supportés : ${pieceJointeBudgetAllowedExtensions.join(', ')}. Un modèle de budget prévisionnel détaillé est fourni dans le cahier des charges.`}
          control={form.control}
          path="pieceJointeBudgetFile"
          disabled={isLoading}
          error={pieceJointeBudgetKeyError}
          className="fr-mb-8v"
          info={pieceJointeBudgetFileInfo}
        />
        <hr className="fr-separator-8v" />
        <p className="fr-text--bold">
          Détaillez ici la demande de subvention pour cette action
        </p>
        <InputFormField
          asterisk
          control={form.control}
          path="subventionDemandee"
          label="Montant global de la subvention demandée"
          type="number"
          min={0}
          step={0.01}
          max={defaultValues.montantDotationRestante}
          disabled={isLoading}
          icon="fr-icon-money-euro-circle-line"
          className={styles.moneyInput}
          info={
            <span className="fr-display-block fr-text-default--info fr-pt-3v">
              <span className="fr-icon-info-fill fr-icon--sm fr-mr-1v" />
              Montant de dotation restant&nbsp;:{' '}
              {numberToEuros(defaultValues.montantDotationRestante)}
            </span>
          }
        />
        <CheckboxFormField
          control={form.control}
          className="fr-mb-0"
          label={
            <>
              Ressource humaine{' '}
              <button
                type="button"
                className="fr-btn--tooltip fr-btn"
                aria-describedby="tooltip-rh"
              >
                Information contextuelle
              </button>
              <span
                className="fr-tooltip fr-placement fr-text--medium"
                id="tooltip-rh"
                role="tooltip"
                aria-hidden="true"
              >
                Il s’agit d’une ressource humaine interne à la structure
                employeuse faisant partie de la gouvernance (co-porteuse ou
                membre) et récipiendaire des fonds.
              </span>
            </>
          }
          path="subventionEtpChecked"
          disabled={isLoading}
        />
        {hasSubventionEtp && (
          <InputFormField
            asterisk
            control={form.control}
            path="subventionEtp"
            label="Montant ETP en euros"
            type="number"
            min={0}
            step={0.01}
            disabled={isLoading}
            icon="fr-icon-money-euro-circle-line"
            className={styles.moneyInput}
          />
        )}
        <CheckboxFormField
          className="fr-mb-0"
          control={form.control}
          label="Prestation de service"
          path="subventionPrestationChecked"
          disabled={isLoading}
        />
        {hasSubventionPrestation && (
          <InputFormField
            asterisk
            control={form.control}
            path="subventionPrestation"
            label="Montant Prestation de service"
            type="number"
            min={0}
            step={0.01}
            disabled={isLoading}
            icon="fr-icon-money-euro-circle-line"
            className={styles.moneyInput}
          />
        )}
      </div>

      {/* Beneficiaires */}
      <div className={cardClassName}>
        <h2 className="fr-h5 fr-mb-2v">Destinataire(s) des fonds</h2>
        <p className="fr-text-mention--grey fr-mb-0">
          Précisez le ou les membres de votre gouvernance qui porteront cette
          action et seront, en conséquence, destinataires des fonds. Dans le cas
          où vous renseignez plusieurs destinataires des fonds pour cette
          action, un encart s’ouvrira vous demandant d’indiquer le montant de la
          subvention par destinataire.
        </p>
        <hr className="fr-separator-8v" />
        {/* Uncontrolled select to add beneficiaires */}
        <div
          className={classNames('fr-select-group', {
            'fr-select-group--error': beneficiairesErrorMessage,
            'fr-select-group--disabled': isLoading,
          })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="fr-label" htmlFor="beneficiaires">
            Ajouter le ou les bénéficiaires <RedAsterisk />
          </label>
          <select
            className={classNames('fr-select fr-mb-8v', {
              'fr-select--error': error,
            })}
            id="beneficiaires"
            disabled={isLoading}
            name="beneficiaire"
            onChange={onBeneficiaireChange}
            value=""
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <option value="" disabled />
            <SelectOptionsList
              options={beneficiaireOptionsWithDisabledSelected}
            />
          </select>
        </div>
        <div className="fr-notice fr-notice--info">
          <div className="fr-container">
            <div className="fr-notice__body">
              <p className="fr-notice__title">
                Vous ne trouvez pas une collectivité/structure dans la
                liste&nbsp;?
              </p>
              <p className="fr-text--sm">
                Invitez les collectivités et structures à compléter le
                formulaire disponible via ce lien&nbsp;:{' '}
                <a
                  href="https://inclusion-numerique.anct.gouv.fr/gouvernance"
                  className="fr-whitespace-nowrap"
                  rel="noreferrer"
                  target="_blank"
                >
                  https://inclusion-numerique.anct.gouv.fr/gouvernance
                </a>{' '}
                puis ajoutez les à votre gouvernance. Vous ne pouvez pas ajouter
                manuellement une collectivité/structure qui ne serait pas
                inscrite et renseignée comme membre de la gouvernance.
              </p>
            </div>
          </div>
        </div>
        {beneficiairesFields.length > 0 && (
          <>
            <p className="fr-text--xl fr-mt-8v fr-text--bold fr-mb-0 fr-flex fr-justify-content-space-between">
              <span>Bénéficiaire{sPluriel(beneficiairesFields.length)}</span>{' '}
              <span>{beneficiairesFields.length}</span>
            </p>

            {beneficiairesFields.map((beneficiaire, index) => (
              <Fragment key={beneficiaire._formKey}>
                <hr className="fr-separator-6v" />
                <div>
                  <div className="fr-text--bold fr-mb-4v fr-flex fr-justify-content-space-between">
                    <p className="fr-mb-0">{beneficiaire.nom}</p>
                    <Button
                      type="button"
                      size="small"
                      className="fr-ml-1w"
                      priority="tertiary no outline"
                      iconId="fr-icon-delete-bin-line"
                      title="Supprimer"
                      onClick={() => removeBeneficiaire(index)}
                    />
                  </div>
                  {beneficiaires.length > 1 && (
                    <InputFormField
                      asterisk
                      control={form.control}
                      path={`beneficiaires.${index}.subvention`}
                      label="Montant de la subvention alloué à ce bénéficiaire"
                      type="number"
                      min={0}
                      step={0.01}
                      max={defaultValues.montantDotationRestante}
                      disabled={isLoading}
                      icon="fr-icon-money-euro-circle-line"
                      className={classNames(styles.moneyInput, styles.small)}
                      info={beneficiaireResteInfo}
                    />
                  )}
                </div>
              </Fragment>
            ))}
          </>
        )}
        {beneficiairesErrorMessage && (
          <p className="fr-error-text">{beneficiairesErrorMessage}</p>
        )}
      </div>

      {error ? (
        <div className="fr-fieldset__element">
          <div className="fr-alert fr-alert--error fr-alert--sm">
            <p>{error.message}</p>
          </div>
        </div>
      ) : null}

      <ButtonsGroup
        className="fr-mb-20v"
        buttons={[
          {
            type: 'submit',
            children: 'Enregistrer',
            priority: 'primary',
            ...buttonLoadingClassname(isLoading, 'fr-mb-20v'),
          },
        ]}
      />
    </form>
  )
}

export default withTrpc(DemandeDeSubventionForm)
