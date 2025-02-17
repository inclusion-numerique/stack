// See https://api.search.brave.com/app/documentation/web-search/query#LocalSearchAPIQueryParameters
import axios from 'axios'
import pThrottle from 'p-throttle'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

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

export const braveSearchApiEndpoint =
  'https://api.search.brave.com/res/v1/web/search'

// Our free tier allows for 1 request per second
const throttle = pThrottle({
  limit: 1,
  interval: 1400, // Getting 429 even with a limit of 1 / 1000
})

const executeBraveWebSearchImmediate = async ({
  q,
  ...params
}: Partial<BraveApiSearchParams> & { q: string }) => {
  const headers = {
    Accept: 'application/json',
    'Accept-Encoding': 'gzip',
    'X-Subscription-Token': ServerWebAppConfig.Assistant.Brave.apiKey,
  }

  const paramsMergedWithDefaults = {
    q,
    country: 'FR',
    search_lang: 'fr',
    ui_lang: 'fr-FR',
    count: 4,
    safesearch: 'strict',
    text_decorations: false,
    spellcheck: false,
    result_filter: 'web,news',
    extra_snippets: false,
    summary: true,
    ...params, // Allow to pass extra params
  } satisfies BraveApiSearchParams

  console.log('BRAVE PARAMS', paramsMergedWithDefaults)

  const response = await axios.get<BraveApiSearchResponse>(
    braveSearchApiEndpoint,
    {
      params: paramsMergedWithDefaults,
      headers,
    },
  )

  const { results } = response.data.web

  return results
}

export type BraveSearchResults = Awaited<
  ReturnType<typeof executeBraveWebSearchImmediate>
>
export type BraveSearchResult = BraveSearchResults[number]

export const executeBraveWebSearch = throttle(executeBraveWebSearchImmediate)

export const formatResultToJsonForAssistant = ({
  description,
  // meta_url,
  // profile,
  thumbnail,
  title,
  url,
  summary,
}: BraveSearchResult & { summary?: string | null }) => ({
  url,
  title,
  thumbnail,
  description,
  summary,
})

export type BraveSearchResultForAssistant = ReturnType<
  typeof formatResultToJsonForAssistant
>
export const formatResultToMarkdownForAssistant = ({
  description,
  title,
  url,
  summary,
}: BraveSearchResult & { summary?: string | null }) =>
  `
---
title: ${title}
url: ${url}
---
${summary || description}
`
