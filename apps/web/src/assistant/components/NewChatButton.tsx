'use client'

import {
  initialiseChatThread,
  useIsChatThreadEmpty,
} from '@app/web/assistant/hooks/useAssistantChatController'
import Button from '@codegouvfr/react-dsfr/Button'

const NewChatButton = () => {
  const isChatThreadEmpty = useIsChatThreadEmpty()

  const onNewChat = () => {
    // Do not create a new chat if current one is new/empty
    if (isChatThreadEmpty) {
      return
    }
    initialiseChatThread({
      chatThread: null,
      chatThreadHistory: undefined,
    })
  }

  return (
    <Button
      type="button"
      iconId="fr-icon-add-line"
      className="fr-mb-2v"
      priority="tertiary"
      size="small"
      onClick={onNewChat}
    >
      Nouveau chat
    </Button>
  )
}

export default NewChatButton
