'use client'

import HistoryChatThreadButton from '@app/web/assistant/components/HistoryChatThreadButton'
import type { AssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { UserChatThreadsList } from '@app/web/assistant/getChatThread'
import { groupChatThreadsByPeriod } from '@app/web/assistant/groupChatThreadsByPeriod'
import {
  initialiseChatUi,
  useChatThreadHistory,
} from '@app/web/assistant/hooks/useAssistantChatController'
import { Fragment, useEffect } from 'react'

export const ChatThreadHistorySideMenu = ({
  chatThread,
  initialChatThreadHistory,
  threadId,
}: {
  initialChatThreadHistory: UserChatThreadsList
  chatThread: AssistantPageData['chatThread']
  threadId: string
}) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to initialize when id changes
  useEffect(() => {
    initialiseChatUi({
      chatThreadHistory: initialChatThreadHistory ?? [],
      chatThread: chatThread ?? null,
    })
  }, [threadId])

  const chatThreadHistory = useChatThreadHistory(initialChatThreadHistory)

  const grouped = groupChatThreadsByPeriod(chatThreadHistory)

  return (
    <>
      {grouped.map(({ period, threads }) => (
        <Fragment key={period}>
          <h2 className="fr-text--sm fr-text--medium fr-mb-0">{period}</h2>
          <div className="fr-btns-group fr-btns-group--sm">
            {threads.map((thread) => (
              <HistoryChatThreadButton
                key={thread.id}
                sessionHistoryItem={thread}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </>
  )
}

export default ChatThreadHistorySideMenu
