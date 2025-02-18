import { z } from 'zod'
import type { DefaultValues } from 'react-hook-form'
import type { AssistantParametresPageData } from '@app/web/app/assistant/parametres/getAssistantParametresPageData'
import type { DefaultAssistantConfiguration } from '@app/web/assistant/configuration/defaultAssistantConfiguration'

const emptyStringToNull = (value: string | undefined | null) =>
  value?.trim() || null

export const AssistantConfigurationValidation = z.object({
  id: z.string().uuid().nullish(), // missing if new configuration
  title: z.string().nullish().transform(emptyStringToNull),
  notes: z.string().nullish().transform(emptyStringToNull),
  model: z.string().nullish().transform(emptyStringToNull),
  frequencyPenalty: z.number().nullish(),
  functionCall: z.string().nullish().transform(emptyStringToNull),
  maxCompletionTokens: z.number().nullish(),
  maxTokens: z.number().nullish(),
  parallelToolCalls: z.boolean().nullish(),
  presencePenalty: z.number().nullish(),
  reasoningEffort: z.string().nullish().transform(emptyStringToNull),
  seed: z.number().nullish(),
  temperature: z.number().nullish(),
  topLogProbs: z.number().nullish(),
  topP: z.number().nullish(),
  systemMessage: z.string().nullish().transform(emptyStringToNull),
  searchToolDescription: z.string().nullish().transform(emptyStringToNull),
})

export type AssistantConfigurationData = z.infer<
  typeof AssistantConfigurationValidation
>

export const assistantConfigurationDefaultValuesFromModel = ({
  userConfiguration,
  defaultConfiguration,
}: AssistantParametresPageData): DefaultValues<AssistantConfigurationData> => {
  const undefinedIfSameAsDefault = <
    T extends keyof DefaultAssistantConfiguration,
  >(
    key: T,
  ): DefaultAssistantConfiguration[T] | undefined => {
    const userConfigurationValue = userConfiguration[key]
    if (!userConfigurationValue) {
      return
    }
    const defaultValue = defaultConfiguration[key]

    if (userConfigurationValue === defaultValue) {
      return
    }

    return userConfigurationValue as DefaultAssistantConfiguration[typeof key]
  }

  return {
    id: userConfiguration.id,
    title: undefinedIfSameAsDefault('title'),
    notes: userConfiguration.notes,
    model: undefinedIfSameAsDefault('model'),
    frequencyPenalty: undefinedIfSameAsDefault('frequencyPenalty'),
    functionCall: undefinedIfSameAsDefault('functionCall'),
    maxCompletionTokens: undefinedIfSameAsDefault('maxCompletionTokens'),
    maxTokens: undefinedIfSameAsDefault('maxTokens'),
    parallelToolCalls: undefinedIfSameAsDefault('parallelToolCalls'),
    presencePenalty: undefinedIfSameAsDefault('presencePenalty'),
    reasoningEffort: undefinedIfSameAsDefault('reasoningEffort'),
    seed: undefinedIfSameAsDefault('seed'),
    temperature: undefinedIfSameAsDefault('temperature'),
    topLogProbs: undefinedIfSameAsDefault('topLogProbs'),
    topP: undefinedIfSameAsDefault('topP'),
    systemMessage: undefinedIfSameAsDefault('systemMessage'),
    searchToolDescription: undefinedIfSameAsDefault('searchToolDescription'),
  }
}
