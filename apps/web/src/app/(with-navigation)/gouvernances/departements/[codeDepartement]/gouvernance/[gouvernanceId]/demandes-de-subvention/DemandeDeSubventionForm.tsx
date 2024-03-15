'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import React from 'react'
import { createToast } from '@app/ui/toast/createToast'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  DemandeDeSubventionData,
  DemandeDeSubventionValidation,
  noteDeContexteSubventionMinChars,
} from '@app/web/gouvernance/DemandeDeSubvention'
import { stripHtmlTags } from '@app/web/utils/stripHtmlTags'
import { besoinSubventionOptions } from '@app/web/gouvernance/besoinSubvention'

export const noteDeContexteSubventionInfoText = (title?: string | null) =>
  `${title ? stripHtmlTags(title).length : 0} caractères sur un minimum de ${noteDeContexteSubventionMinChars} `

const cardClassName = 'fr-border--slim-grey fr-p-8v fr-pb-10v fr-mb-6v'

const DemandeDeSubventionForm = ({
  defaultValues,
}: {
  defaultValues: DefaultValues<DemandeDeSubventionData> & {
    montantDotationRestante: number
  }
}) => {
  const form = useForm<DemandeDeSubventionData>({
    resolver: zodResolver(DemandeDeSubventionValidation),
    defaultValues,
  })

  const mutation = trpc.demandesDeSubvention.createOrUpdate.useMutation()

  const onSubmit = async (data: DemandeDeSubventionData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: 'La demande de subvention a bien été enregistrée',
      })
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
          className="fr-mb-0"
          asterisk
          label="Sélectionner les besoins correspondant à cette action"
          control={form.control}
          path="besoins"
          defaultOption
          defaultOptionLabel=""
          options={besoinSubventionOptions}
        />
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
