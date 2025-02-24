import z from 'zod'

export const AssistantChatRequestDataValidation = z.object({
  prompt: z.string(),
  chatSessionId: z.string().uuid(),
})

export type AssistantChatRequestData = z.infer<
  typeof AssistantChatRequestDataValidation
>
