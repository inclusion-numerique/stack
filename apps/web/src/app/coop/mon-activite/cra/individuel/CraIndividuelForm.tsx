'use client'

import { DefaultValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import {
  CraIndividuelData,
  CraIndividuelValidation,
} from '@app/web/cra/CraIndividuelValidation'
import {
  autonomieOptionsWithExtras,
  dureeAccompagnementOptions,
  lieuAccompagnementOptionsWithExtras,
  materielOptions,
  poursuiteAccompagnementOptionsWithExtras,
  thematiqueAccompagnementOptionsWithExtras,
} from '@app/web/cra/cra'
import RichCardLabel, {
  richCardFieldsetElementClassName,
  richCardRadioGroupClassName,
} from '@app/web/components/form/RichCardLabel'
import styles from '../CraForm.module.css'
import InputFormField from '@app/ui/components/Form/InputFormField'
import CraFormLabel from '@app/web/app/coop/mon-activite/cra/CraFormLabel'
import AdresseBanFormField from '@app/web/components/form/AdresseBanFormField'
import {
  genreOptions,
  statutSocialOptions,
  trancheAgeOptions,
} from '@app/web/beneficiaire/beneficiaire'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { useRouter } from 'next/navigation'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const CraIndividuelForm = ({
  defaultValues,
}: {
  defaultValues: DefaultValues<CraIndividuelData>
}) => {
  const form = useForm<CraIndividuelData>({
    resolver: zodResolver(CraIndividuelValidation),
    defaultValues: {
      ...defaultValues,
    },
  })
  const mutation = trpc.cra.individuel.useMutation()

  const router = useRouter()

  const beneficiaireId = form.watch('beneficiaire.id')
  const showAnonymousForm = !beneficiaireId

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = form

  const onSubmit = async (data: CraIndividuelData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: 'L’accompagnement individuel a bien été enregistrée.',
      })
      router.push('/coop') // TODO SUCCESS LINK
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

  console.log('ERRORS', errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fr-flex fr-flex-gap-12v">
        <InputFormField
          control={control}
          disabled={isLoading}
          path="date"
          type="date"
          asterisk
          label="Date de l’accompagnement"
          className="fr-flex-grow-1"
          classes={{ label: 'fr-text--medium fr-mb-3v' }}
        />
        <div className="fr-flex-grow-2">
          <CraFormLabel required as="p" className="fr-mb-3v">
            Durée de l’accompagnement
          </CraFormLabel>
          <RadioFormField
            control={control}
            disabled={isLoading}
            path="duree"
            options={dureeAccompagnementOptions}
            components={{
              label: RichCardLabel,
            }}
            classes={{
              fieldsetElement: richCardFieldsetElementClassName,
              fieldset: styles.durationFieldSet,
              radioGroup: richCardRadioGroupClassName,
            }}
          />
        </div>
      </div>
      <CraFormLabel required as="p" className="fr-mb-3v fr-mt-8v">
        Lieu d’accompagnement
      </CraFormLabel>
      <RadioFormField
        control={control}
        path="lieuAccompagnement"
        disabled={isLoading}
        options={lieuAccompagnementOptionsWithExtras}
        components={{
          label: RichCardLabel,
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: styles.lieuFieldSet,
          radioGroup: richCardRadioGroupClassName,
        }}
      />
      <hr className="fr-separator-12v" />
      <p className="fr-text--medium fr-mb-4v">Matériel numérique utilisé</p>
      <CheckboxGroupFormField
        control={control}
        path="materiel"
        options={materielOptions}
        disabled={isLoading}
        components={{
          label: RichCardLabel,
          labelProps: { paddingX: 16 },
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: styles.materielFieldset,
          label: 'fr-py-4v',
        }}
      />
      <p className="fr-text--medium fr-mb-4v fr-mt-12v">
        Thématique(s) d’accompagnement <RedAsterisk />
      </p>
      <CheckboxGroupFormField
        control={control}
        path="thematiques"
        options={thematiqueAccompagnementOptionsWithExtras}
        disabled={isLoading}
        components={{
          label: RichCardLabel,
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: styles.thematiquesFieldset,
        }}
      />
      <p className="fr-text--medium fr-mb-4v fr-mt-12v">
        Niveau d’autonomie du bénéficiaire
      </p>
      <RadioFormField
        control={control}
        path="autonomie"
        options={autonomieOptionsWithExtras}
        disabled={isLoading}
        components={{
          label: RichCardLabel,
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: styles.thematiquesFieldset,
        }}
      />
      <p className="fr-text--medium fr-mb-4v fr-mt-12v">
        L’accompagnement va-t-il être poursuivi&nbsp;?
      </p>
      <CheckboxGroupFormField
        control={control}
        path="poursuiteAccompagnement"
        options={poursuiteAccompagnementOptionsWithExtras}
        disabled={isLoading}
        components={{
          label: RichCardLabel,
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: styles.thematiquesFieldset,
        }}
      />

      {showAnonymousForm && (
        <>
          <hr className="fr-separator-12v" />
          <h2 className="fr-h3 fr-mb-2v">
            Informations optionnelles sur le bénéficiaire
          </h2>
          <p className="fr-text-mention--grey fr-mb-0">
            Vous pouvez renseigner des informations anonymes sur le bénéficiaire
            pour compléter vos statistiques.
          </p>
          <AdresseBanFormField
            control={control}
            path="beneficiaire"
            disabled={isLoading}
          />
          <CraFormLabel as="p" className="fr-mb-4v fr-mt-12v">
            Genre
          </CraFormLabel>
          <RadioFormField
            control={control}
            path="beneficiaire.genre"
            options={genreOptions}
            disabled={isLoading}
            components={{
              label: RichCardLabel,
            }}
            classes={{
              fieldsetElement: richCardFieldsetElementClassName,
              fieldset: styles.genreFieldSet,
              radioGroup: richCardRadioGroupClassName,
            }}
          />
          <div className="fr-flex fr-flex-gap-12v">
            <div className="fr-flex-basis-0 fr-flex-grow-1">
              <CraFormLabel as="p" className="fr-mb-4v fr-mt-12v">
                Tranche d’âge
              </CraFormLabel>
              <RadioFormField
                control={control}
                path="beneficiaire.trancheAge"
                options={trancheAgeOptions}
                disabled={isLoading}
                components={{
                  label: RichCardLabel,
                }}
                classes={{
                  fieldset: styles.columnFieldSet,
                  fieldsetElement: richCardFieldsetElementClassName,
                  radioGroup: richCardRadioGroupClassName,
                }}
              />
            </div>
            <div className="fr-flex-basis-0 fr-flex-grow-1">
              <CraFormLabel as="p" className="fr-mb-4v fr-mt-12v">
                Statut du bénéficiaire
              </CraFormLabel>
              <RadioFormField
                control={control}
                path="beneficiaire.statutSocial"
                options={statutSocialOptions}
                disabled={isLoading}
                components={{
                  label: RichCardLabel,
                }}
                classes={{
                  fieldset: styles.columnFieldSet,
                  fieldsetElement: richCardFieldsetElementClassName,
                  radioGroup: richCardRadioGroupClassName,
                }}
              />
            </div>
          </div>
        </>
      )}
      <RichTextFormField
        className="fr-mt-12v"
        form={form}
        disabled={isLoading}
        path="notes"
        label="Notes sur l’accompagnement"
        hint={
          <>
            Il est interdit de stocker des informations sensibles (données de
            santé, mots de passe, etc).
            <br />
            Vous retrouverez ces notes dans votre historique d’activités ainsi
            que dans l’historique du bénéficiaire.
          </>
        }
      />
      <div className="fr-btns-group fr-mt-12v fr-mb-30v">
        <Button type="submit" {...buttonLoadingClassname(isLoading)}>
          Enregistrer l’activité
        </Button>
        <Button
          priority="secondary"
          linkProps={{
            href: '/coop', // TODO BACK LINK PROP
          }}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(CraIndividuelForm)
