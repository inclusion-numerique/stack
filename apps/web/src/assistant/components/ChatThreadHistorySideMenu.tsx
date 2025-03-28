'use client'

import HistoryChatThreadButton from '@app/web/assistant/components/HistoryChatThreadButton'
import type { AssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { useChatThreadHistory } from '@app/web/assistant/hooks/useAssistantChatController'
import { Fragment } from 'react'

// Groupe les messages pour la sidebar
// "Aujourd'hui
// "Hier
// "7 derniers jours"
// "30 derniers jours"
const groupHistoryChatThreadsByPeriod = (
  chatThreadHistory: AssistantPageData['chatThreadHistory'],
) => {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)
  const last7Days = new Date()
  last7Days.setDate(today.getDate() - 7)
  last7Days.setHours(0, 0, 0, 0)
  const last30Days = new Date()
  last30Days.setDate(today.getDate() - 30)
  last30Days.setHours(0, 0, 0, 0)

  return [
    {
      period: 'Aujourd’hui',
      chatThreads: chatThreadHistory.filter(
        (chatThread) => chatThread.updated.getTime() >= today.getTime(),
      ),
    },
    {
      period: 'Hier',
      chatThreads: chatThreadHistory.filter(
        (chatThread) =>
          chatThread.updated.getTime() >= yesterday.getTime() &&
          chatThread.updated.getTime() < today.getTime(),
      ),
    },
    {
      period: '7 derniers jours',
      chatThreads: chatThreadHistory.filter(
        (chatThread) =>
          chatThread.updated.getTime() >= last7Days.getTime() &&
          chatThread.updated.getTime() < yesterday.getTime(),
      ),
    },
    {
      period: '30 derniers jours',
      chatThreads: chatThreadHistory.filter(
        (chatThread) =>
          chatThread.updated.getTime() >= last30Days.getTime() &&
          chatThread.updated.getTime() < last7Days.getTime(),
      ),
    },
  ].filter(({ chatThreads: groupChatThreads }) => groupChatThreads.length > 0)
}

export const ChatThreadHistorySideMenu = () => {
  const chatThreadHistory = useChatThreadHistory()

  return (
    <>
      {groupHistoryChatThreadsByPeriod(chatThreadHistory).map(
        ({ period, chatThreads: periodChatThreadHistory }) => (
          <Fragment key={period}>
            <h2 className="fr-text--sm fr-text--medium fr-mb-0">{period}</h2>
            <div className="fr-btns-group fr-btns-group--sm">
              {periodChatThreadHistory.map((historyChatThread) => (
                <HistoryChatThreadButton
                  key={historyChatThread.id}
                  sessionHistoryItem={historyChatThread}
                />
              ))}
            </div>
          </Fragment>
        ),
      )}
    </>
  )
}

export default ChatThreadHistorySideMenu
