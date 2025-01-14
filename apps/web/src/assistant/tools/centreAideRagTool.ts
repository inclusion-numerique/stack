import { z } from 'zod'
import { zodFunction } from 'openai/helpers/zod'
import { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import { getRagChunksForQuery } from '@app/web/assistant/rag/getRagChunksForQuery'
import { ragSources } from '@app/web/assistant/rag/sources'
import { formatRagSearchResultToMarkdown } from '@app/web/assistant/rag/formatRagSearchResultToMarkdown'

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
  name: 'centre_aide_rag',
  description:
    'Recherche dans le centre d’aide de la coop ' +
    'Utilise ce tool pour toutes les questions en rapport du support ou questions sur le site de la Coop de la médiation numérique. Fonctionnalités, précisions, etc...',
  parameters: centreAideRagToolParameters,
  function: async ({ query }) => {
    const ragResult = await getRagChunksForQuery(query, {
      sources: [ragSources.centreAideNotion],
    })

    return formatRagSearchResultToMarkdown(ragResult.chunkResults)
  },
} satisfies ZodFunctionOptions<typeof centreAideRagToolParameters>

export const centreAideRagTool = zodFunction(centreAideRagToolOptions)
