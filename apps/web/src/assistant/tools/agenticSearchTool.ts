import {
  type RagChunkResultForAssistant,
  formatRagSearchResultToJsonForAssistant,
  formatRagSearchResultToMarkdown,
} from '@app/web/assistant/rag/formatRagSearchResultToMarkdown'
import { getRagChunksForQuery } from '@app/web/assistant/rag/getRagChunksForQuery'
import { ragSources } from '@app/web/assistant/rag/sources'
import { summarizeWebPage } from '@app/web/assistant/tasks/summarizeWebPage'
import {
  type AgenticSearchToolName,
  agenticSearchToolDescription,
  agenticSearchToolName,
} from '@app/web/assistant/tools/agenticSearchToolConfig'
import {
  type BraveSearchResult,
  type BraveSearchResultForAssistant,
  type BraveSearchResults,
  executeBraveWebSearch,
  formatResultToJsonForAssistant,
  formatResultToMarkdownForAssistant,
} from '@app/web/assistant/tools/brave/braveSearch'
import type { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import { stringify } from 'yaml'
import { z } from 'zod'

import { tool } from 'ai'

const stringBooleanValidation = (description: string) =>
  z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true')
    .describe(description)

export const agenticSearchToolParameters = z.object({
  query: z
    .string()
    .describe('Les termes de recherches pour l’agent de recherche'),
  objectif: z
    .string()
    .describe(
      'L’objectif de la recherche dans le contexte de la discussion. Permet de ranker les résultats par ordre de pertinence.',
    ),
  lesBases: stringBooleanValidation(
    'Activer à "true" pour pour toutes les questions en rapport avec la médiation numérique ou le numérique d’intéret général pour trouver des ressources de médiation numérique et de numérique d’intéret général présent sur les site lesbases.anct.gouv.fr',
  ),
  sitesOfficiels: stringBooleanValidation(
    'Activer à "true" pour toutes les questions liées à la médiation numérique, aux démarches administratives, ' +
      'à l’état français ou à un organisme public. à privilégier si la question a un lien direct avec les services publics, ' +
      'la vie administrative ou la recherche d’informations officielles..',
  ),
  internet: stringBooleanValidation(
    'Activer à "true" si la requête porte sur un sujet général, ' +
      'par exemple la technique, la science, la culture, ou toute autre information qui ne relève pas de la sphère administrative, officielle, ou de médiation numérique.',
  ),
})

const summarizeWebSearchResult = async ({
  result,
  objectif,
}: {
  result: BraveSearchResult
  objectif: string
}) => {
  // Fetch HTML content from URL
  const response = await fetch(result.url)
  if (!response.ok) {
    // biome-ignore lint/suspicious/noConsole: used until feature is in production
    console.warn(`Failed to fetch ${result.url}: ${response.statusText}`)
    return result
  }

  const html = await response.text().catch(() => null)

  if (!html) {
    return result
  }

  const { summary } = await summarizeWebPage({
    objectif,
    url: result.url,
    html,
  })

  return {
    ...result,
    summary,
  }
}

const summarizeWebSearchResults = ({
  objectif,
  results,
}: {
  results: BraveSearchResults
  objectif: string
}) =>
  Promise.all(
    results.map((result) => summarizeWebSearchResult({ objectif, result })),
  )

// Should the tool return json or markdown?
export type AgenticReturnFormat = 'json' | 'yaml' | 'markdown'
// const returnFormat: AgenticReturnFormat = 'yaml' as AgenticReturnFormat
const returnFormat: AgenticReturnFormat = 'json' as AgenticReturnFormat

export type AgenticSearchToolYamlResult =
  | {
      tool: AgenticSearchToolName
      error: string
    }
  | {
      tool: AgenticSearchToolName
      error?: undefined
      objectif: string
      sources_sites_web: BraveSearchResultForAssistant[] | undefined
      sources_sites_officiels: BraveSearchResultForAssistant[] | undefined
      sources_les_bases: RagChunkResultForAssistant[] | undefined
    }

const errorResult = (errorMessage: string) => {
  if (returnFormat === 'json') {
    return { tool: agenticSearchToolName, error: errorMessage }
  }

  if (returnFormat === 'yaml') {
    const yamlErrorResult = {
      tool: agenticSearchToolName,
      error: errorMessage,
    } satisfies AgenticSearchToolYamlResult
    return stringify(yamlErrorResult)
  }
  return errorMessage
}

export const agenticSearchToolOptions = {
  name: agenticSearchToolName,
  description: agenticSearchToolDescription,
  parameters: agenticSearchToolParameters,
  function: async ({ query, lesBases, objectif, internet, sitesOfficiels }) => {
    if (!internet && !sitesOfficiels && !lesBases) {
      return errorResult(
        `Au moins une source doit être activée pour utiliser ce tool (internet, sitesOfficiels, lesBases)`,
      )
    }

    try {
      const [
        genericWebSearchRawResults,
        administrationWebSearchRawResults,
        lesBasesRagRawResults,
      ] = await Promise.all([
        internet
          ? executeBraveWebSearch({
              q: query,
              count: 3,
            }).then((results) =>
              summarizeWebSearchResults({ objectif, results }),
            )
          : null,
        sitesOfficiels
          ? executeBraveWebSearch({
              q: query,
              count: 3,
              goggles_id:
                'https://gist.githubusercontent.com/Clrk/800bf69ac450d9fd07846c1dcb012d1f',
            }).then((results) =>
              summarizeWebSearchResults({ objectif, results }),
            )
          : null,
        lesBases
          ? getRagChunksForQuery(query, {
              sources: [ragSources.lesBases],
            })
          : null,
      ])

      const genericWebSearchResults =
        !!genericWebSearchRawResults && genericWebSearchRawResults.length > 0
          ? genericWebSearchRawResults
          : false

      const oficialWebSearchResults =
        !!administrationWebSearchRawResults &&
        administrationWebSearchRawResults.length > 0
          ? administrationWebSearchRawResults
          : false

      const lesBasesRagChunkResults =
        !!lesBasesRagRawResults &&
        lesBasesRagRawResults.chunkResults?.length > 0
          ? lesBasesRagRawResults.chunkResults
          : false

      if (
        !genericWebSearchResults &&
        !oficialWebSearchResults &&
        !lesBasesRagChunkResults
      ) {
        return errorResult(
          `Aucun résultat pertinent ne correspond à la recherche.`,
        )
      }

      if (returnFormat === 'json') {
        return JSON.stringify(
          {
            status:
              'L’assistant doit utiliser ces informations pour répondre de manière complète et pertinente et générer les liens vers les sources pour l’utilisateur',
            internetSources: genericWebSearchResults
              ? genericWebSearchResults.map(formatResultToJsonForAssistant)
              : undefined,
            sitesOfficielsSources: oficialWebSearchResults
              ? oficialWebSearchResults.map(formatResultToJsonForAssistant)
              : undefined,
            lesBasesSources: lesBasesRagChunkResults
              ? formatRagSearchResultToJsonForAssistant(lesBasesRagChunkResults)
              : undefined,
          },
          null,
          2,
        )
      }

      if (returnFormat === 'yaml') {
        const yamlResultObject = {
          tool: agenticSearchToolName,
          objectif: `L’assistant doit utiliser ces informations pour répondre de manière complète et pertinente et générer les liens vers les sources pour l’utilisateur dans l’objectif de : ${objectif}`,
          sources_sites_web: genericWebSearchResults
            ? genericWebSearchResults.map(formatResultToJsonForAssistant)
            : undefined,
          sources_sites_officiels: oficialWebSearchResults
            ? oficialWebSearchResults.map(formatResultToJsonForAssistant)
            : undefined,
          sources_les_bases: lesBasesRagChunkResults
            ? formatRagSearchResultToJsonForAssistant(lesBasesRagChunkResults)
            : undefined,
        } satisfies AgenticSearchToolYamlResult

        return stringify(yamlResultObject)
      }

      let assistantResponse = `L’assistant doit utiliser ces informations pour répondre de manière complète et pertinente et générer les liens vers les sources pour l’utilisateur:
`

      if (genericWebSearchResults) {
        assistantResponse += `
# Sites internet

${genericWebSearchResults.map(formatResultToMarkdownForAssistant).join('\n\n')}

`
      }

      if (oficialWebSearchResults) {
        assistantResponse += `

# Sites internet administratifs et officiels

${oficialWebSearchResults.map(formatResultToMarkdownForAssistant).join('\n\n')}

`
      }

      if (lesBasesRagChunkResults) {
        assistantResponse += `
        
# Ressources sur les bases du numérique d’intéret général

${formatRagSearchResultToMarkdown(lesBasesRagChunkResults)}

        `
      }

      return assistantResponse
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.error('Error in agenticSearchTool', error)
      return errorResult('Une erreur est survenue 🙁, veuillez réessayer.')
    }
  },
} satisfies ZodFunctionOptions<typeof agenticSearchToolParameters>

export const agenticSearchTool = tool({
  description: agenticSearchToolDescription,
  parameters: agenticSearchToolParameters,
  execute: agenticSearchToolOptions.function,
})
