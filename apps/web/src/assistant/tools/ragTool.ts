import { z } from 'zod'
import { zodFunction } from 'openai/helpers/zod'
import { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import { createEmbedding } from '@app/web/assistant/createEmbedding'
import { executeRagSearch } from '@app/web/assistant/executeRagSearch'

export const ragToolParameters = z.object({
  query: z
    .string()
    .describe(
      'Le message complet qui sera comparé avec les embeddings de nos collections de documents d’aides et ressources de médiation numérique. Cela doit contenir le contexte et assez de sens pour pouvoir faire un RAG efficace.',
    ),
  objectif: z
    .string()
    .describe(
      'L’objectif de la recherche dans le contexte de la discussion. Permet de ranker les résultats par ordre de pertinence.',
    ),
})

export type RagToolParameters = z.infer<typeof ragToolParameters>

export const ragToolOptions = {
  name: 'rag',
  description:
    'Recherche dans le centre d’aide de la coop et les ressources de médiation numérique et de numérique d’intéret général présent sur les site lesbases.anct.gouv.fr' +
    'Utilise ce tool pour toutes les questions en rapport du support ou questions sur le site de la Coop de la médiation numérique, et pour tout sujet en relation avec la médiation numérique.',
  parameters: ragToolParameters,
  function: async ({ query, ...rest }) => {
    const embeddedQuery = await createEmbedding(query)

    const chunkResults = await executeRagSearch({
      embedding: embeddedQuery.embedding,
      model: embeddedQuery.model,
      limit: 5,
      sources: (rest as unknown as { sources?: string[] }).sources, // hidden param used for testing but not for the tool
    })

    return {
      chunkResults,
    }
  },
} satisfies ZodFunctionOptions<typeof ragToolParameters>

export const ragTool = zodFunction(ragToolOptions)
