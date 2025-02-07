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
