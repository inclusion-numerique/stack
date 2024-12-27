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
      query: 'les bases du numérique d’intéret géneral',
    })

    expect(response.results).toHaveLength(10)
    expect(response.results[0].url).toStartWith(
      'https://lesbases.anct.gouv.fr/',
    )
  })
})
