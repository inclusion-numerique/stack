import { AiSdkChatRole } from '@app/web/assistant/assistantChatRole'
import { type Tokens, marked } from 'marked'
import type { CSSProperties } from 'react'

const renderer = new marked.Renderer()
const linkRenderer = renderer.link.bind(renderer)
renderer.link = (linkParameters: Tokens.Link) => {
  const html = linkRenderer(linkParameters)
  return html.replace(
    /^<a /,
    `<a target="_blank" class="fr-link" rel="noreferrer noopener nofollow" `,
  )
}

const ChatMessageTextPart = ({
  part: { text },
  cursor = false,
  markdown,
  style,
}: {
  part: {
    type: 'text'
    text: string
  }
  markdown: boolean
  cursor?: boolean
  previousMessageRole?: AiSdkChatRole
  previousMessageIsSameRole: boolean
  style?: CSSProperties
}) => {
  // Do not render empty messages
  if (!text) {
    return null
  }

  const parsedContent = text
    ? markdown
      ? marked.parse(text, { renderer, async: false })
      : text
    : ''

  const cleanedContent = parsedContent
    .replaceAll('\n', '<br />')
    // Replace all composed characters with non breakable spaces
    .replaceAll(/ ([!%:;?»])/g, '&nbsp;$1')

  const contentWithCursor = cursor
    ? `${cleanedContent ?? ''}<span class="chat-message__blinking-cursor" />`
    : cleanedContent

  return (
    <div style={style}>
      <div dangerouslySetInnerHTML={{ __html: contentWithCursor }} />
    </div>
  )
}

export default ChatMessageTextPart
