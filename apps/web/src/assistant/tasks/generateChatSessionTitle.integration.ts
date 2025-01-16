import { generateChatSessionTitle } from '@app/web/assistant/tasks/generateChatSessionTitle'

describe('generateChatSessionTitle', () => {
  it('should generate a title', async () => {
    const title = await generateChatSessionTitle({
      messages: [
        {
          role: 'User',
          content: 'Comment s’appellent les bébés des biches ?',
        },
        {
          role: 'Assistant',
          content: 'Les bébés des biches sont des faons.',
        },
      ],
    })
    expect(title).toBeOneOf([
      'Bébés des biches',
      'Bébés de biches',
      'Nom des bébés biches',
    ])
  })
})
