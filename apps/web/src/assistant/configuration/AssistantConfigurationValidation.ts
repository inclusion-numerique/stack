import { z } from 'zod'
import type { DefaultValues } from 'react-hook-form'
import type { AssistantParametresPageData } from '@app/web/app/assistant/parametres/getAssistantParametresPageData'
import type { DefaultAssistantConfiguration } from '@app/web/assistant/configuration/defaultAssistantConfiguration'

export const AssistantConfigurationValidation = z.object({
  id: z.string().uuid().nullish(), // missing if new configuration
  title: z.string().nullish(),
  notes: z.string().nullish(),
  model: z.string().nullish(),
  frequencyPenalty: z.number().nullish(),
  functionCall: z.string().nullish(),
  maxCompletionTokens: z.number().nullish(),
  maxTokens: z.number().nullish(),
  parallelToolCalls: z.boolean().nullish(),
  presencePenalty: z.number().nullish(),
  reasoningEffort: z.string().nullish(),
  seed: z.number().nullish(),
  temperature: z.number().nullish(),
  topLogProbs: z.number().nullish(),
  topP: z.number().nullish(),
  systemMessage: z.string().nullish(),
  searchToolDescription: z.string().nullish(),
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
