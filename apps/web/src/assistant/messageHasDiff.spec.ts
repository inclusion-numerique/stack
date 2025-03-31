import { messageHasDiff } from '@app/web/assistant/messageHasDiff'

describe('messageHasDiff', () => {
  it('should return true if the messages are different', () => {
    expect(
      messageHasDiff(
        {
          id: '1',
          role: 'user',
          content: 'Hello',
          parts: [
            {
              type: 'text',
              text: 'Hello',
            },
          ],
          annotations: [
            {
              type: 'test',
              text: 'test',
            },
          ],
          experimental_attachments: [
            {
              contentType: 'test',
              name: 'test',
              url: 'test',
            },
          ],
        },
        {
          id: '1',
          role: 'user',
          content: 'Hello',
          parts: [
            {
              type: 'text',
              text: 'Hello',
            },
          ],
          annotations: [
            {
              type: 'test',
              text: 'test 2',
            },
          ],
          experimental_attachments: [
            {
              contentType: 'test',
              name: 'test',
              url: 'test',
            },
          ],
        },
      ),
    ).toBe(true)
  })

  it('should return false if the messages are identical', () => {
    const message = {
      id: '1',
      role: 'user' as const,
      content: 'Hello',
      parts: [
        {
          type: 'text' as const,
          text: 'Hello',
        },
      ],
      annotations: [
        {
          type: 'test',
          text: 'test',
        },
      ],
      experimental_attachments: [
        {
          contentType: 'test',
          name: 'test',
          url: 'test',
        },
      ],
    }

    expect(
      messageHasDiff(message, {
        ...message,
        // cloning to check strict equality is not an issue
        parts: [...message.parts],
        annotations: [...message.annotations],
        experimental_attachments: [...message.experimental_attachments],
      }),
    ).toBe(false)
  })
})
