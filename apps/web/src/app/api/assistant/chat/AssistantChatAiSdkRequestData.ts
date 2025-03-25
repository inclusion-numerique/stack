import z from 'zod'

export const AssistantChatAiSdkRequestDataValidation = z.object({
  id: z.string().uuid(), // id of the chat session
  // custom data
  data: z.object({}).optional(),
  message: z
    .object({
      id: z.string().uuid(),
      role: z.string(),
      content: z.string(),
      parts: z.array(z.object({}).passthrough()),
    })
    .passthrough(),
})

export type AssistantChatAiSdkRequestData = z.infer<
  typeof AssistantChatAiSdkRequestDataValidation
>
