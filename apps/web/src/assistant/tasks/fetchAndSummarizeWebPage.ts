import { summarizeWebPage } from '@app/web/assistant/tasks/summarizeWebPage'

export type FetchAndSummarizeWebPageResult =
  | {
      status: 'success'
      statusCode: number
      error: null
      html: string
      summary: string
    }
  | {
      status: 'error'
      statusCode: number
      error: Error
      html: string | null
      summary: null
    }

export const fetchAndSummarizeWebPage = async ({
  url,
  objectif,
}: {
  url: string
  objectif: string
}) => {
  const response = await fetch(url)

  if (!response.ok) {
    return {
      status: 'error',
      statusCode: response.status,
      error: new Error(`Failed to fetch ${url}: ${response.statusText}`),
      html: null,
      summary: null,
    }
  }

  const html = await response.text()

  try {
    const summary = await summarizeWebPage({
      url,
      html,
      objectif,
    })

    return {
      status: 'success',
      statusCode: response.status,
      error: null,
      html,
      summary,
    }
  } catch (error) {
    return {
      status: 'error',
      statusCode: response.status,
      error,
      html,
      summary: null,
    }
  }
}
