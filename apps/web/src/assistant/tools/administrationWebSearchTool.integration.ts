import {
  administrationWebSearchTool,
  administrationWebSearchToolOptions,
} from '@app/web/assistant/tools/administrationWebSearchTool'

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

    expect(response.sources.length).toBeGreaterThan(100)
    expect(response.sources).toContain('https://lesbases.anct.gouv.fr/')
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

    expect(response.sources.length).toBeGreaterThan(100)
    // It should be a website from  e.g. gouv.fr
    // It is sufficient to check that it is not the expected result from the general web search tool
    expect(response.sources).not.toContain('https://www.edbangerrecords.com/')
  })
})
