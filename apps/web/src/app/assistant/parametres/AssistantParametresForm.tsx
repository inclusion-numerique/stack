'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { DefaultValues, useForm } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import React from 'react'
import { AssistantConfigurationData } from '@app/web/assistant/configuration/AssistantConfigurationValidation'
import { DefaultAssistantConfiguration } from '@app/web/assistant/configuration/defaultAssistantConfiguration'
import { trpc } from '@app/web/trpc'
import { optionalNumberToString } from '@app/web/utils/formatNumber'
import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { createToast } from '@app/ui/toast/createToast'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { useRouter } from 'next/navigation'

const AssistantParametresForm = ({
  defaultValues,
  defaultConfiguration,
}: {
  defaultValues: DefaultValues<AssistantConfigurationData>
  defaultConfiguration: DefaultAssistantConfiguration
}) => {
  const mutation = trpc.assistant.updateAssistantConfiguration.useMutation()
  const router = useRouter()

  const { handleSubmit, control, setError } =
    useForm<AssistantConfigurationData>({
      defaultValues,
    })

  const onSubmit = async (data: AssistantConfigurationData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: 'La configuration a bien été enregistrée.',
      })
      router.push('/assistant/chat')
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

  const isLoading = mutation.isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputFormField
        control={control}
        path="title"
        disabled={isLoading}
        label="Titre de la configuration"
      />
      {/*<InputFormField*/}
      {/*  control={control}*/}
      {/*  path="title"*/}
      {/*  type="textarea"*/}
      {/*  disabled={isLoading}*/}
      {/*  label="Notes sur cette configuration"*/}
      {/*/>*/}

      <InputFormField
        control={control}
        path="temperature"
        type="number"
        min={0}
        max={1}
        step={0.01}
        disabled={isLoading}
        placeholder={optionalNumberToString(defaultConfiguration.temperature)}
        label="Température"
        hint={`Entre 0 et 1 (défaut : ${optionalNumberToString(defaultConfiguration.temperature, '-')})`}
      />
      <InputFormField
        control={control}
        path="topP"
        type="number"
        min={0}
        max={1}
        step={0.01}
        disabled={isLoading}
        placeholder={optionalNumberToString(defaultConfiguration.topP)}
        label="Top P"
        hint={`Entre 0 et 1 (défaut : ${optionalNumberToString(defaultConfiguration.topP, '-')})`}
      />
      <InputFormField
        control={control}
        path="presencePenalty"
        type="number"
        min={-2}
        max={2}
        step={0.01}
        placeholder={optionalNumberToString(
          defaultConfiguration.presencePenalty,
        )}
        disabled={isLoading}
        label="Presence Penalty"
        hint={`Entre -2 et 2 (défaut : ${optionalNumberToString(defaultConfiguration.presencePenalty, '-')})`}
      />
      <InputFormField
        control={control}
        path="frequencyPenalty"
        type="number"
        min={-2}
        max={2}
        step={0.01}
        placeholder={optionalNumberToString(
          defaultConfiguration.frequencyPenalty,
        )}
        disabled={isLoading}
        label="Frequency Penalty"
        hint={`Entre -2 et 2 (défaut : ${optionalNumberToString(defaultConfiguration.frequencyPenalty, '-')})`}
      />
      <InputFormField
        control={control}
        path="systemMessage"
        type="textarea"
        disabled={isLoading}
        label="System Message"
        rows={60}
        placeholder={defaultConfiguration.systemMessage ?? undefined}
      />
      <InputFormField
        control={control}
        path="searchToolDescription"
        type="textarea"
        disabled={isLoading}
        label="Description du search tool"
        rows={10}
        placeholder={defaultConfiguration.searchToolDescription ?? undefined}
      />
      <div className="fr-btns-group fr-mt-12v fr-mb-30v">
        <Button type="submit" {...buttonLoadingClassname(isLoading)}>
          Enregistrer la configuration
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(AssistantParametresForm)
