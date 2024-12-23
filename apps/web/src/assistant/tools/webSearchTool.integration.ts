import {
  webSearchTool,
  webSearchToolOptions,
} from '@app/web/assistant/tools/webSearchTool'

describe('webSearchTool', () => {
  it('should return a list of results', async () => {
    if (!webSearchTool.$callback) {
      throw new Error('webSearchTool.$callback is not defined')
    }
    const response = await webSearchToolOptions.function({
      query: 'les bases inclusion numérique',
    })

    console.log('RESPONSE', response)

    expect(response.results).toHaveLength(20)
    expect(response.results[0].title).toBe(
      "Les Bases du numérique d'intérêt général - Societé Numérique",
    )
  })
})
