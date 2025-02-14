import {
  RagSearchChunkResult,
  RagSearchResult,
} from '@app/web/assistant/rag/executeRagSearch'

const formatRagChunkToMarkdown = (chunkResult: RagSearchChunkResult) => {
  const { content, source, url, type } = chunkResult

  return `
### ${source} ${type}

${url ? `Url: ${url}` : ''}

${content}
`
}

export const formatRagSearchResultToMarkdown = (ragResult: RagSearchResult) => {
  if (ragResult.length === 0) {
    return 'Aucun résultat pertinent.'
  }

  return `\n${ragResult.map(formatRagChunkToMarkdown).join('\n\n')}\n`
}

export const formatRagChunkToJsonForAssistant = ({
  source,
  content,
  url,
  id,
  similarity,
  type,
}: RagSearchChunkResult) => ({
  source,
  content,
  url,
  id,
  similarity,
  type,
})

export type RagChunkResultForAssistant = ReturnType<
  typeof formatRagChunkToJsonForAssistant
>

export const formatRagSearchResultToJsonForAssistant = (
  ragResult: RagSearchResult,
) => ragResult.map(formatRagChunkToJsonForAssistant)

export const formatRagChunkToYamlForAssistant = ({
  source,
  content,
  url,
  id,
  similarity,
  type,
}: RagSearchChunkResult) => {
  let yamlResult = `  - url: ${url}\n`

  yamlResult += `    source: ${source}\n`
  yamlResult += `    type: ${type}\n`
  yamlResult += `    id: ${id}\n`
  yamlResult += `    similarity: ${similarity}\n`

  if (content.includes('\n')) {
    yamlResult += `    content: |\n`
    content.split('\n').forEach((line) => {
      yamlResult += `      ${line}\n`
    })
  } else {
    yamlResult += `    content: ${content}\n`
  }

  return yamlResult
}

export const formatRagSearchResultToYamlForAssistant = (
  ragResult: RagSearchResult,
) => ragResult.map(formatRagChunkToYamlForAssistant)
