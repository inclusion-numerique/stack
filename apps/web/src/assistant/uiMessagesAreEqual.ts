import { UIMessage } from 'ai'

export const uiMessagesAreEqual = (
  a: UIMessage & { revisionId?: string },
  b: UIMessage & { revisionId?: string },
) => {
  // Revision is added to UIMessage for streaming response

  return a.id === b.id && a.revisionId === b.revisionId
}
