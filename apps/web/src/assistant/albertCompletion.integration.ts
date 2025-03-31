import { albertCompletion } from '@app/web/assistant/albertCompletion'

describe.skip('albertCompletion', () => {
  it('should return a valid response', async () => {
    const result = await albertCompletion({ prompt: 'hello' })
    expect(result).toBe({
      text: 'bonjour',
    })
  })
})
