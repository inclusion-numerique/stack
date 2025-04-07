'use client'

import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import {
  ClientApiData,
  ClientApiValidation,
} from '@app/web/app/administration/clients-api/ClientApiValidation'
import { apiClientScopeOptions } from '@app/web/app/administration/clients-api/apiClient'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { DefaultValues, useForm } from 'react-hook-form'

const ClientApiForm = ({
  defaultValues,
}: {
  defaultValues?: DefaultValues<ClientApiData>
}) => {
  const form = useForm<ClientApiData>({
    resolver: zodResolver(ClientApiValidation),
    defaultValues: {
      validFrom: dateAsIsoDay(new Date()),
      ...defaultValues,
    },
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form

  const createMutation = trpc.apiClient.create.useMutation()
  const updateMutation = trpc.apiClient.update.useMutation()

  const router = useRouter()

  const onSubmit = async (data: ClientApiData) => {
    try {
      const client =
        typeof data.id === 'string'
          ? await updateMutation.mutateAsync({ ...data, id: data.id })
          : await createMutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: `Le client API "${client.name}" a bien été ${
          data.id ? 'modifié' : 'créé'
        }.`,
      })
      router.push('/administration/clients-api')
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
  const disabled = isLoading

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputFormField
        control={control}
        path="name"
        label="Nom"
        asterisk
        disabled={disabled}
      />
      <InputFormField
        control={control}
        path="validFrom"
        label="Début de validité"
        asterisk
        disabled={disabled}
        type="date"
      />
      <InputFormField
        control={control}
        path="validUntil"
        label="Fin de validité"
        disabled={disabled}
        type="date"
      />
      <CheckboxGroupFormField
        label="Permissions"
        control={control}
        path="scopes"
        asterisk
        options={apiClientScopeOptions}
        disabled={disabled}
      />

      <hr className="fr-separator-12v" />

      <div className="fr-btns-group">
        <Button
          type="submit"
          priority="primary"
          {...buttonLoadingClassname(isLoading, 'fr-mb-0 ')}
        >
          {defaultValues?.id ? 'Modifier' : 'Créer'}
        </Button>
        <Button
          linkProps={{
            href: '/administration/clients-api',
          }}
          priority="tertiary"
          className="fr-mb-0 fr-mt-4v"
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(ClientApiForm)
