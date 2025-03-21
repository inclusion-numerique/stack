import {
  openAiClient,
  openAiClientConfiguration,
} from '@app/web/assistant/openAiClient'

describe('openAiClient', () => {
  it('should return a valid client', () => {
    expect(openAiClient).toBeDefined()
  })

  it('should be able to list models', async () => {
    const models = await openAiClient.models
      .list({
        method: 'post',
      })
      .withResponse()
    const modelsList = models.data.data

    expect(Array.isArray(modelsList)).toBe(true) // instanceof does not work on CI :/
    expect(modelsList.length).toBeGreaterThan(0)

    // Our configured model should be in the list
    expect(
      modelsList.find(
        (model) => model.id === openAiClientConfiguration.chatModel,
      ),
    ).toBeDefined()

    // Our configured embeddings model should be in the list
    expect(
      modelsList.find(
        (model) => model.id === openAiClientConfiguration.embeddingsModel,
      ),
    ).toBeDefined()
  })

  it('should be able to create a completion', async () => {
    const completion = await openAiClient.completions.create({
      model: openAiClientConfiguration.chatModel,
      prompt: 'What is the meaning of life?',
      max_tokens: 1,
    })
    expect(completion.choices.at(0)?.text).toBeDefined()
  }, 15_000)
})
