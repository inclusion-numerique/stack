import { z } from 'zod'
import { zodFunction } from 'openai/helpers/zod'
import axios from 'axios'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'

// See https://api.search.brave.com/app/documentation/web-search/query#LocalSearchAPIQueryParameters
export type BraveApiSearchParams = {
  q: string // The search query
  country?: string // The country code
  search_lang?: string // The language code
  ui_lang?: string // The UI language code
  count?: number // The number of results to return
  offset?: number // The offset of the first result to return
  safesearch?: 'off' | 'moderate' | 'strict' // The safe search level
  freshness?: string // The freshness of the results
  text_decorations?: boolean // Whether to show text decorations
  spellcheck?: boolean // Whether to enable spellcheck
  result_filter?: string // The result filter
  goggles_id?: string // The goggles ID
  units?: 'metric' | 'imperial' // The units
  extra_snippets?: boolean // Whether to show extra snippets
  summary?: boolean // Whether to show a summary
}

export type BraveApiSearchResponse = {
  query: {
    original: string
    // and more fields
  }
  mixed: {
    // and more fields
  }
  type: 'search'
  web: {
    type: 'search'
    family_friendly: boolean
    results: {
      title: string
      url: string
      is_source_local: boolean
      is_source_both: boolean
      description: string
      profile: {
        name: string
        url: string
        long_name: string
        img: string
      }
      language: string
      family_friendly: boolean
      type: string
      subtype: string
      is_live: boolean
      meta_url: {
        scheme: string
        netloc: string
        hostname: string
        favicon: string
        path: string
      }
      thumbnail: {
        src: string
        original: string
        logo: boolean
      }
    }[]
  }
}

const formatResultForAssistant = ({
  description,
  // meta_url,
  // profile,
  thumbnail,
  title,
  url,
}: BraveApiSearchResponse['web']['results'][number]) => ({
  title,
  description,
  url,
  thumbnail,
})

export const ragToolParameters = z.object({
  query: z
    .string()
    .describe(
      'Le message complet qui sera comparé avec les embeddings de nos collections de documents d’aides et ressources de médiation numérique. Cela doit contenir le contexte et assez de sens pour pouvoir faire un RAG efficace.',
    ),
})

// TODO Deeper search tool that crawls
// https://spider.cloud/credits/new

export const ragToolOptions = {
  name: 'rag',
  description:
    'Recherche dans le centre d’aide de la coop et les ressources de médiation numérique et de numérique d’intéret général présent sur les site lesbases.anct.gouv.fr' +
    'Utilise ce tool pour toutes les questions en rapport du support ou questions sur le site de la Coop de la médiation numérique, et pour tout sujet en relation avec la médiation numérique.',
  parameters: ragToolParameters,
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
      goggles_id:
        'https://gist.githubusercontent.com/Clrk/800bf69ac450d9fd07846c1dcb012d1f',
      extra_snippets: false,
      summary: true,
    }

    const url = 'https://api.search.brave.com/res/v1/web/search'

    const response = await axios.get<BraveApiSearchResponse>(url, {
      params,
      headers,
    })

    const { results } = response.data.web

    return {
      results: results.map(formatResultForAssistant),
    }
  },
} satisfies ZodFunctionOptions<typeof ragToolParameters>

export const ragTool = zodFunction(ragToolOptions)
