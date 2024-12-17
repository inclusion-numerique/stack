import z from 'zod'

export const AssistantPromptRequestDataValidation = z.object({
  prompt: z.string(),
  chatSessionId: z.string().uuid(),
})

export type AssistantPromptRequestData = z.infer<
  typeof AssistantPromptRequestDataValidation
>
