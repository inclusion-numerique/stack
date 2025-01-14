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
    return 'Aucun résultat de recherche sur le centre d’aide. L’assistant doit peut-être utiliser un autre tool pour répondre à la question.'
  }

  return `
Voici les résultats de la recherche dans le centre d’aide que l’assistant doit utiliser pour répondre (si pertinent) et générer les liens vers les sources pour l’utilisateur :

${ragResult.map(formatRagChunkToMarkdown).join('\n\n')}
`
}
