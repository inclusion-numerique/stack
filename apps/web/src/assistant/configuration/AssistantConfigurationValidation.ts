import { z } from 'zod'

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
