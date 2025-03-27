import { formatRagSearchResultToMarkdown } from '@app/web/assistant/rag/formatRagSearchResultToMarkdown'
import { getRagChunksForQuery } from '@app/web/assistant/rag/getRagChunksForQuery'
import { ragSources } from '@app/web/assistant/rag/sources'
import {
  centreAideRagToolDescription,
  centreAideRagToolName,
} from '@app/web/assistant/tools/centreAideRagToolConfig'
import { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import { tool } from 'ai'
import { z } from 'zod'

export const centreAideRagToolParameters = z.object({
  query: z
    .string()
    .describe(
      'Le message complet qui sera comparé avec les embeddings de nos collections de documents d’aides. Cela doit contenir le contexte et assez de sens pour pouvoir faire un RAG efficace.',
    ),
  objectif: z
    .string()
    .describe(
      'L’objectif de la recherche dans le contexte de la discussion. Permet de ranker les résultats par ordre de pertinence.',
    ),
})

export type CentreAideRagToolParameters = z.infer<
  typeof centreAideRagToolParameters
>

export const centreAideRagToolOptions = {
  name: centreAideRagToolName,
  description: centreAideRagToolDescription,
  parameters: centreAideRagToolParameters,
  function: async ({ query }) => {
    const ragResult = await getRagChunksForQuery(query, {
      sources: [ragSources.centreAideNotion],
    })

    return formatRagSearchResultToMarkdown(ragResult.chunkResults)
  },
} satisfies ZodFunctionOptions<typeof centreAideRagToolParameters>

export const centreAideRagTool = tool({
  parameters: centreAideRagToolParameters,
  description: centreAideRagToolDescription,
  execute: centreAideRagToolOptions.function,
})
