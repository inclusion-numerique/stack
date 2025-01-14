import { z } from 'zod'
import { zodFunction } from 'openai/helpers/zod'
import axios from 'axios'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import type { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import {
  BraveApiSearchParams,
  BraveApiSearchResponse,
  braveSearchApiEndpoint,
  formatResultForAssistant,
} from '@app/web/assistant/tools/brave/braveSearch'

export const generalWebSearchToolParameters = z.object({
  query: z
    .string()
    .describe('Les termes de recherches pour le moteur de recherche web'),
  objectif: z
    .string()
    .describe(
      'L’objectif de la recherche dans le contexte de la discussion. Permet de ranker les résultats par ordre de pertinence.',
    ),
})

export const generalWebSearchToolOptions = {
  name: 'general_web_search',
  description:
    'recherche sur internet, utilise les résultats pour trouver quelles informations sont utiles afin de mieux répondre. ' +
    'utilise ce tool pour toutes les questions qui ne concernent pas la médiation numérique, les démarches administratives, ' +
    'l’état français ou un organisme public. à privilégier si la requête porte sur un autre sujet général, ' +
    'par exemple la technique, la science, la culture, ou toute autre information qui ne relève pas de la sphère administrative.',
  parameters: generalWebSearchToolParameters,
  function: async ({ query }) => {
    const headers = {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': ServerWebAppConfig.Assistant.Brave.apiKey,
    }

    const params: BraveApiSearchParams = {
      q: query,
      country: 'FR',
      search_lang: 'fr',
      ui_lang: 'fr-FR',
      count: 10,
      safesearch: 'strict',
      text_decorations: false,
      spellcheck: false,
      result_filter: 'web,news',
      extra_snippets: false,
      summary: true,
    }

    const response = await axios.get<BraveApiSearchResponse>(
      braveSearchApiEndpoint,
      {
        params,
        headers,
      },
    )

    const { results } = response.data.web

    return {
      results: results.map(formatResultForAssistant),
    }
  },
} satisfies ZodFunctionOptions<typeof generalWebSearchToolParameters>

export const generalWebSearchTool = zodFunction(generalWebSearchToolOptions)
