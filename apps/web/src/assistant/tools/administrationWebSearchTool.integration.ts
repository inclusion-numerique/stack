import {
  administrationWebSearchTool,
  administrationWebSearchToolOptions,
} from '@app/web/assistant/tools/administrationWebSearchTool'

// TODO brave serach integration test separated from the tools
// TODO this should test for markdown result ?
describe('administrationWebSearchTool', () => {
  it('should return a list of results', async () => {
    if (!administrationWebSearchTool.$callback) {
      throw new Error('webSearchTool.$callback is not defined')
    }
    const response = await administrationWebSearchToolOptions.function({
      query: 'les bases du numérique d’intéret géneral',
      objectif:
        'l’utilisateur veut publier des ressources de médiation numérique',
    })

    expect(response.results).toHaveLength(10)
    expect(response.results[0].url).toStartWith(
      'https://lesbases.anct.gouv.fr/',
    )
  })

  it('should not return result from general web search tools (cf. generalWebSearchTool.integration.ts)', async () => {
    if (!administrationWebSearchTool.$callback) {
      throw new Error('webSearchTool.$callback is not defined')
    }
    const response = await administrationWebSearchToolOptions.function({
      query: 'ed banger reccords website',
      objectif:
        'l’utilisateur veut trouver des informations sur son label préféré',
    })

    expect(response.results.length).toBeGreaterThan(4)
    // It should be a website from  e.g. gouv.fr
    // It is sufficient to check that it is not the expected result from the general web search tool
    expect(response.results[0].url).not.toStartWith(
      'https://www.edbangerrecords.com/',
    )
  })
})
