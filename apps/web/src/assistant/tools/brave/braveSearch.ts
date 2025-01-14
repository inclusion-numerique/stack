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

export const formatResultForAssistant = ({
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

export const formatResultToMarkdownForAssistant = ({
  description,
  title,
  url,
}: BraveApiSearchResponse['web']['results'][number]) =>
  `
  ## ${title}
  
  Url: ${url}
  
  ${description}
  `

export const braveSearchApiEndpoint =
  'https://api.search.brave.com/res/v1/web/search'
