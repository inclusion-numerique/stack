import z from 'zod'

export const AssistantChatAiSdkRequestDataValidation = z.object({
  id: z.string().uuid(), // id of the chat session
  // custom data
  data: z
    .object({
      toolChoice: z.enum(['auto', 'none', 'required']).optional(),
    })
    .optional(),
  message: z
    .object({
      id: z.string().uuid(),
      role: z.enum(['user', 'tool', 'assistant']),
      content: z.string(),
      parts: z.array(z.object({}).passthrough()),
    })
    .passthrough()
    .optional(), // Optional because we can request to "trigger" the chat without prompting
})

export type AssistantChatAiSdkRequestData = z.infer<
  typeof AssistantChatAiSdkRequestDataValidation
>
