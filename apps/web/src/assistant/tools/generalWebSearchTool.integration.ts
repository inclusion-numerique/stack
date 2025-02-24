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

    // The response should include results and sources from generic web
    // not limited to administration websites
    expect(response.length).toBeGreaterThan(100)
    expect(response).toContain('https://www.edbangerrecords.com/')
  })
})
