import {
  generalWebSearchTool,
  generalWebSearchToolOptions,
} from '@app/web/assistant/tools/generalWebSearchTool'

describe('generalWebSearchTool', () => {
  it('should return a list of results', async () => {
    if (!generalWebSearchTool.$callback) {
      throw new Error('webSearchTool.$callback is not defined')
    }
    const response = await generalWebSearchToolOptions.function({
      query: 'ed banger reccords website',
      objectif:
        'l’utilisateur veut trouver des informations sur son label préféré',
    })

    expect(response.results.length).toBeGreaterThan(4)
    expect(response.results.at(0)?.url).toStartWith(
      'https://www.edbangerrecords.com/',
    )
  })
})
