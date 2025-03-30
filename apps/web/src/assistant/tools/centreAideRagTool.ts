import {
  type RagChunkResultForAssistant,
  formatRagSearchResultToJsonForAssistant,
} from '@app/web/assistant/rag/formatRagSearchResultToMarkdown'
import { getRagChunksForQuery } from '@app/web/assistant/rag/getRagChunksForQuery'
import { ragSources } from '@app/web/assistant/rag/sources'
import type { AgenticSearchToolYamlResult } from '@app/web/assistant/tools/agenticSearchTool'
import {
  centreAideRagToolDescription,
  centreAideRagToolName,
} from '@app/web/assistant/tools/centreAideRagToolConfig'
import type { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import { tool } from 'ai'
import { stringify } from 'yaml'
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

export type CentreAideToolResult =
  | {
      error: string
    }
  | {
      error?: undefined
      objectif: string
      sources: RagChunkResultForAssistant[] | undefined
    }

export type CentreAideRagToolParameters = z.infer<
  typeof centreAideRagToolParameters
>

const errorResult = (errorMessage: string) => {
  const yamlErrorResult = {
    error: errorMessage,
  } satisfies AgenticSearchToolYamlResult
  return stringify(yamlErrorResult)
}

export const centreAideRagToolOptions = {
  name: centreAideRagToolName,
  description: centreAideRagToolDescription,
  parameters: centreAideRagToolParameters,
  function: async ({ query }) => {
    const ragRawResults = await getRagChunksForQuery(query, {
      sources: [ragSources.centreAideNotion],
    })

    const chunks =
      ragRawResults?.chunkResults.length > 0
        ? ragRawResults.chunkResults
        : false

    if (!chunks) {
      return errorResult(
        `Aucun résultat pertinent ne correspond à la recherche.`,
      )
    }

    const yamlResultObject = {
      objectif: `L’assistant doit utiliser ces informations pour répondre de manière complète et pertinente et générer les liens vers les sources pour l’utilisateur dans l’objectif de : ${query}`,
      sources: formatRagSearchResultToJsonForAssistant(chunks),
    }

    return stringify(yamlResultObject)
  },
} satisfies ZodFunctionOptions<typeof centreAideRagToolParameters>

export const centreAideRagTool = tool({
  parameters: centreAideRagToolParameters,
  description: centreAideRagToolDescription,
  execute: centreAideRagToolOptions.function,
})
