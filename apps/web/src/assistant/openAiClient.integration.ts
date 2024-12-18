import {
  openAiClient,
  openAiClientConfiguration,
} from '@app/web/assistant/openAiClient'

describe('openAiClient', () => {
  it('should return a valid client', () => {
    expect(openAiClient).toBeDefined()
  })

  // TODO 500 error from the provider API :(
  it.skip('should be able to list models', async () => {
    const models = await openAiClient.models
      .list({
        method: 'post',
      })
      .withResponse()
    const modelsList = models.data.data

    expect(modelsList).toBeInstanceOf(Array)
    expect(modelsList.length).toBeGreaterThan(0)
  })

  it('should be able to create a completion', async () => {
    const completion = await openAiClient.completions.create({
      model: openAiClientConfiguration.chatModel,
      prompt: 'What is the meaning of life?',
      max_tokens: 1,
    })
    expect(completion.choices.at(0)?.text).toBeDefined()
  })
})
