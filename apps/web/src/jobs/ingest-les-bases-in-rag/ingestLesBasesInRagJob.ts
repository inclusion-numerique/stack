import z from 'zod'

export const IngestLesBasesInRagValidation = z.object({
  name: z.literal('ingest-les-bases-in-rag'),
  payload: z.object({}).optional(),
})

export type IngestLesBasesInRagJob = z.infer<
  typeof IngestLesBasesInRagValidation
>
