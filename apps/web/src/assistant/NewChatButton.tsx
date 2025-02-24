'use client'

import {
  initialiseChatSession,
  useIsChatSessionEmpty,
} from '@app/web/assistant/hooks/useAssistantChatController'
import Button from '@codegouvfr/react-dsfr/Button'

const NewChatButton = () => {
  const isChatSessionEmpty = useIsChatSessionEmpty()

  const onNewChat = () => {
    // Do not create a new chat if current one is new/empty
    if (isChatSessionEmpty) {
      return
    }
    initialiseChatSession({
      chatSession: null,
      chatSessionHistory: undefined,
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
