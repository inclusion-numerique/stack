import { openAiClient } from '@app/web/assistant/openAiClient'

describe('openAiClient', () => {
  it('should return a valid client', () => {
    expect(openAiClient).toBeDefined()
  })

  it('should be able to list models', async () => {
    const models = await openAiClient.models.list().withResponse()
    expect(models.data.data).toBeInstanceOf(Array)
  })
})
