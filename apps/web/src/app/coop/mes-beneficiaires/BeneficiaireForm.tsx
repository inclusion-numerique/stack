'use client'

import { DefaultValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import React, { Fragment, useCallback } from 'react'
import { useScrollToError } from '@app/ui/hooks/useScrollToError'
import Link from 'next/link'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import { useWatchSubscription } from '@app/ui/hooks/useWatchSubscription'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { trpc } from '@app/web/trpc'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'
import {
  anneeNaissanceMax,
  anneeNaissanceMin,
  BeneficiaireCraData,
  BeneficiaireData,
  BeneficiaireValidation,
} from '@app/web/beneficiaire/BeneficiaireValidation'
import FormSection from '@app/web/app/coop/mes-beneficiaires/FormSection'
import RichCardLabel, {
  richCardFieldsetElementClassName,
  richCardRadioGroupClassName,
} from '@app/web/components/form/RichCardLabel'
import { craFormFieldsetClassname } from '@app/web/app/coop/mon-activite/cra/craFormFieldsetClassname'
import AdresseBanFormField from '@app/web/components/form/AdresseBanFormField'
import CraFormLabel from '@app/web/app/coop/mon-activite/cra/CraFormLabel'
import {
  genreOptions,
  statutSocialOptions,
  trancheAgeOptions,
} from '@app/web/beneficiaire/beneficiaire'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trancheAgeFromAnneeNaissance } from '@app/web/beneficiaire/trancheAgeFromAnneeNaissance'
import { beneficiaireCommuneResidenceToPreviewBanData } from '@app/web/beneficiaire/prismaBeneficiaireToBeneficiaireData'
import type { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import styles from './BeneficiaireForm.module.css'

const BeneficiaireForm = ({
  defaultValues,
  cra,
  retour,
}: {
  defaultValues: DefaultValues<BeneficiaireData> & { mediateurId: string }
  // If present, used to merge with state on retour redirection
  cra?: DefaultValues<CraIndividuelData> | DefaultValues<CraCollectifData>
  retour?: string
}) => {
  const form = useForm<BeneficiaireData>({
    resolver: zodResolver(BeneficiaireValidation),
    defaultValues: {
      ...defaultValues,
    },
  })

  const mutation = trpc.beneficiaires.createOrUpdate.useMutation()

  const router = useRouter()

  const enSavoirPlusLink = (
    <Link
      href="/coop/mes-beneficiaires"
      target="_blank"
      className="fr-link fr-link--xs wip-outline"
    >
      En savoir plus
    </Link>
  )

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = form

  const nextUrlBase = retour || '/mes-beneficiaires'
  const backUrlBase = retour || '/mes-beneficiaires'

  const onSubmit = async (data: BeneficiaireData) => {
    try {
      const beneficiaire = await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: data.id
          ? 'Le bénéficiaire a bien été mis à jour.'
          : 'Le bénéficiaire a bien été créé.',
      })

      let queryParams = ''

      if (cra) {
        // We merge existing cra state with created / updated beneficiaire id

        const beneficiaireFormData: BeneficiaireCraData = {
          id: beneficiaire.id,
          mediateurId: beneficiaire.mediateurId,
          prenom: beneficiaire.prenom,
          nom: beneficiaire.nom,
          communeResidence:
            beneficiaireCommuneResidenceToPreviewBanData(beneficiaire),
        }

        const newCra =
          'participants' in cra
            ? {
                // Append beneficiaire to cra collectif
                ...cra,
                participants: [
                  ...(cra.participants ?? []),
                  beneficiaireFormData,
                ],
              }
            : {
                // Replace beneficiaire in cra individuel
                ...cra,
                beneficiaire: beneficiaireFormData,
              }
        queryParams = `?v=${encodeSerializableState(newCra)}`
      }

      router.push(`${nextUrlBase}${queryParams}`)
      router.refresh()
    } catch (mutationError) {
      if (applyZodValidationMutationErrorsToForm(mutationError, setError)) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }
  const isLoading = isSubmitting || isSubmitSuccessful

  useScrollToError({ errors })

  const disableTelephone = watch('pasDeTelephone') === true
  const anneeNaissance = watch('anneeNaissance')
  const anneeNaissanceInt = anneeNaissance
    ? typeof anneeNaissance === 'number'
      ? anneeNaissance
      : Number.parseInt(anneeNaissance, 10)
    : null

  const disableTrancheAge =
    !!anneeNaissanceInt &&
    anneeNaissanceInt >= anneeNaissanceMin &&
    anneeNaissanceInt <= anneeNaissanceMax

  useWatchSubscription(
    watch,
    useCallback(
      (data, { name }) => {
        // Erase telephone if pasDeTelephone is checked
        if (
          name === 'pasDeTelephone' &&
          data.pasDeTelephone &&
          !!data.telephone
        ) {
          setValue('telephone', null)
        }

        // Set tranche d’age depending on birth year
        if (name === 'anneeNaissance') {
          const trancheAgeFromAnnee = trancheAgeFromAnneeNaissance(
            data.anneeNaissance,
          )
          if (trancheAgeFromAnnee && data.trancheAge !== trancheAgeFromAnnee) {
            setValue('trancheAge', trancheAgeFromAnnee)
          }
        }
      },
      [setValue],
    ),
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection
        title="Identité du bénéficiaire"
        description={
          <>
            Ces informations ne sont partagés avec personne d’autre.{' '}
            {enSavoirPlusLink}
          </>
        }
      >
        <div className="fr-flex fr-flex-gap-6v">
          <InputFormField
            className="fr-flex-grow-1 fr-flex-basis-0"
            control={control}
            path="prenom"
            label="Prénom(s)"
            asterisk
            disabled={isLoading}
          />
          <InputFormField
            className="fr-flex-grow-1 fr-flex-basis-0"
            control={control}
            path="nom"
            label="Nom d’usage"
            asterisk
            disabled={isLoading}
          />
        </div>
        <InputFormField
          control={control}
          path="anneeNaissance"
          type="number"
          min={anneeNaissanceMin}
          max={anneeNaissanceMax}
          step={1}
          disabled={isLoading}
          label={
            <>
              Année de naissance
              <button
                type="button"
                className="fr-btn--tooltip fr-btn"
                aria-describedby="annee-naissance-tooltip"
              >
                Information typologies
              </button>
              <span
                className="fr-tooltip fr-placement"
                id="annee-naissance-tooltip"
                role="tooltip"
                aria-hidden="true"
              >
                L’année de naissance permet d’éviter les doublons de
                bénéficiaires (en cas d’homonyme) et de compléter la tranche
                d’âge automatiquement.
              </span>
            </>
          }
        />
      </FormSection>

      <FormSection
        title="Coordonnées"
        description={
          <>
            Ces informations ne sont partagés avec personne d’autre.{' '}
            {enSavoirPlusLink}
          </>
        }
      >
        <div className="fr-flex fr-flex-gap-6v">
          <InputFormField
            className="fr-flex-grow-1 fr-flex-basis-0"
            control={control}
            disabled={isLoading || disableTelephone}
            path="telephone"
            label="Numéro de téléphone"
            hint="Format attendu : (+33) 1 22 33 44 55"
          />
          <CheckboxFormField
            className="fr-flex-grow-1 fr-flex-basis-0 fr-mt-16v"
            control={control}
            path="pasDeTelephone"
            label="N’a pas de téléphone"
            disabled={isLoading}
          />
        </div>
        <InputFormField
          className="fr-flex-grow-1 fr-flex-basis-0"
          control={control}
          disabled={isLoading}
          type="email"
          path="email"
          label="E-mail"
        />
      </FormSection>
      <FormSection
        title="Informations complémentaires"
        description={
          <>
            Ces informations seront les seules qui seront utilisées dans un but
            statistique afin de comprendre les types de publics accompagnés sur
            un territoire. En les renseignant ici, ces informations seront
            complétées automatiquement dans vos compte-rendus d’activités.{' '}
            {enSavoirPlusLink}
          </>
        }
      >
        <AdresseBanFormField<BeneficiaireData>
          control={control}
          path="communeResidence"
          disabled={isLoading}
          label={
            <span className="fr-text--medium fr-mb-4v fr-display-block">
              Commune de résidence du bénéficiaire
            </span>
          }
          placeholder="Rechercher une commune par son nom ou son code postal"
          searchOptions={{ type: 'municipality' }}
        />
        <CraFormLabel as="p" className="fr-mb-4v fr-mt-12v">
          Genre
        </CraFormLabel>
        <RadioFormField
          control={control}
          path="genre"
          options={genreOptions}
          disabled={isLoading}
          components={{
            label: RichCardLabel,
          }}
          classes={{
            fieldsetElement: richCardFieldsetElementClassName,
            fieldset: craFormFieldsetClassname(styles.genreFieldset),
            radioGroup: richCardRadioGroupClassName,
          }}
        />
        <div className="fr-flex fr-flex-gap-12v">
          <div className="fr-flex-basis-0 fr-flex-grow-1">
            <CraFormLabel as="p" className="fr-mb-4v fr-mt-6v">
              Tranche d’âge
            </CraFormLabel>
            <RadioFormField
              control={control}
              path="trancheAge"
              options={trancheAgeOptions}
              disabled={isLoading || disableTrancheAge}
              components={{
                label: RichCardLabel,
              }}
              classes={{
                fieldset: craFormFieldsetClassname(styles.columnFieldset),
                fieldsetElement: richCardFieldsetElementClassName,
                radioGroup: richCardRadioGroupClassName,
              }}
            />
          </div>
          <div className="fr-flex-basis-0 fr-flex-grow-1">
            <CraFormLabel as="p" className="fr-mb-4v fr-mt-6v">
              Statut du bénéficiaire
            </CraFormLabel>
            <RadioFormField
              control={control}
              path="statutSocial"
              options={statutSocialOptions}
              disabled={isLoading}
              components={{
                label: RichCardLabel,
              }}
              classes={{
                fieldset: craFormFieldsetClassname(styles.columnFieldset),
                fieldsetElement: richCardFieldsetElementClassName,
                radioGroup: richCardRadioGroupClassName,
              }}
            />
          </div>
        </div>
      </FormSection>
      <FormSection>
        <RichTextFormField
          form={form}
          disabled={isLoading}
          path="notes"
          label={
            <>
              <h2 className="fr-h5 fr-mb-1v">Notes complémentaires</h2>
              <p className="fr-text--xs fr-text-mention--grey fr-mb-4v">
                Il est interdit de stocker des informations sensibles (données
                de santé, mots de passe, etc).
                <br />
                Il est fortement recommandé de ne stocker que les informations
                utiles au suivi du bénéficiaire.
              </p>
            </>
          }
        />
      </FormSection>

      <div className="fr-btns-group fr-mt-12v fr-mb-30v">
        <Button type="submit" {...buttonLoadingClassname(isLoading)}>
          Enregistrer le bénéficiaire
        </Button>
        <Button
          priority="secondary"
          linkProps={{
            href: backUrlBase,
          }}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(BeneficiaireForm)
