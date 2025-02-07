import { z } from 'zod'
import { zodFunction } from 'openai/helpers/zod'
import type { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import {
  executeBraveWebSearch,
  formatResultToMarkdownForAssistant,
} from '@app/web/assistant/tools/brave/braveSearch'
import { getRagChunksForQuery } from '@app/web/assistant/rag/getRagChunksForQuery'
import { ragSources } from '@app/web/assistant/rag/sources'
import { formatRagSearchResultToMarkdown } from '@app/web/assistant/rag/formatRagSearchResultToMarkdown'

export const agenticSearchToolParameters = z.object({
  query: z
    .string()
    .describe('Les termes de recherches pour l’agent de recherche'),
  objectif: z
    .string()
    .describe(
      'L’objectif de la recherche dans le contexte de la discussion. Permet de ranker les résultats par ordre de pertinence.',
    ),
})

export const agenticSearchToolOptions = {
  name: 'agentic_search',
  description: 'recherche sur internet et nos ressources interne',
  parameters: agenticSearchToolParameters,
  function: async ({ query }) => {
    const [
      genericWebSearchResults,
      administrationWebSearchResults,
      centreAideRagResults,
      lesBasesRagResults,
    ] = await Promise.all([
      executeBraveWebSearch({
        q: query,
        count: 4,
      }),
      executeBraveWebSearch({
        q: query,
        count: 4,
        goggles_id:
          'https://gist.githubusercontent.com/Clrk/800bf69ac450d9fd07846c1dcb012d1f',
      }),
      getRagChunksForQuery(query, {
        sources: [ragSources.centreAideNotion],
      }),
      getRagChunksForQuery(query, {
        sources: [ragSources.lesBases],
      }),
    ])

    if (
      genericWebSearchResults.length === 0 &&
      administrationWebSearchResults.length === 0 &&
      (!centreAideRagResults.chunkResults ||
        centreAideRagResults.chunkResults?.length === 0) &&
      (!lesBasesRagResults.chunkResults ||
        lesBasesRagResults.chunkResults?.length === 0)
    ) {
      return `Aucun résultat de recherche sur internet ou nos bases de ressources ne correspond à la recherche.`
    }

    return `
Voici les résultats de la recherche que l’assistant doit utiliser pour répondre (si pertinent) et générer les liens vers les sources pour l’utilisateur :

# Sites internet génériques

${genericWebSearchResults.map(formatResultToMarkdownForAssistant).join('\n\n')}

# Sites internet administratifs à privilégier

${administrationWebSearchResults.map(formatResultToMarkdownForAssistant).join('\n\n')}

# Articles dans le centre d’aide de la coop

${
  centreAideRagResults?.chunkResults
    ? formatRagSearchResultToMarkdown(centreAideRagResults?.chunkResults)
    : 'Aucun résultat pertinent dans le centre d’aide.'
}

# Ressources sur les bases du numérique d’intéret général

${
  lesBasesRagResults?.chunkResults
    ? formatRagSearchResultToMarkdown(lesBasesRagResults?.chunkResults)
    : 'Aucun résultat pertinent dans les bases du numérique d’intéret général.'
}

`
  },
} satisfies ZodFunctionOptions<typeof agenticSearchToolParameters>

export const agenticSearchTool = zodFunction(agenticSearchToolOptions)
