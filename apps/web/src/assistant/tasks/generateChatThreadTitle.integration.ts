import { generateChatThreadTitle } from '@app/web/assistant/tasks/generateChatThreadTitle'

describe('generateChatThreadTitle', () => {
  it('should generate a title', async () => {
    const title = await generateChatThreadTitle({
      messages: [
        {
          role: 'user',
          parts: [
            {
              type: 'text',
              text: 'Comment s’appellent les bébés des biches ?',
            },
          ],
        },
        {
          role: 'assistant',
          parts: [
            {
              type: 'text',
              text: 'Les bébés des biches sont des faons.',
            },
          ],
        },
      ],
    })
    expect(title).toBeOneOf([
      'Faon de biche',
      'Faons de biche',
      'Bébés des biches',
      'Bébés de biches',
      'Nom des bébés biches',
    ])
  })
})
