'use client'

import { Fragment } from 'react'
import HistoryChatSessionButton from '@app/web/assistant/HistoryChatSessionButton'
import type { AssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { useChatSessionHistory } from '@app/web/assistant/hooks/useAssistantChatController'

// Groupe les messages pour la sidebar
// "Aujourd'hui
// "Hier
// "7 derniers jours"
// "30 derniers jours"
const groupHistoryChatSessionsByPeriod = (
  chatSessionHistory: AssistantPageData['chatSessionHistory'],
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
      chatSessions: chatSessionHistory.filter(
        (chatSession) => chatSession.updated.getTime() >= today.getTime(),
      ),
    },
    {
      period: 'Hier',
      chatSessions: chatSessionHistory.filter(
        (chatSession) =>
          chatSession.updated.getTime() >= yesterday.getTime() &&
          chatSession.updated.getTime() < today.getTime(),
      ),
    },
    {
      period: '7 derniers jours',
      chatSessions: chatSessionHistory.filter(
        (chatSession) =>
          chatSession.updated.getTime() >= last7Days.getTime() &&
          chatSession.updated.getTime() < yesterday.getTime(),
      ),
    },
    {
      period: '30 derniers jours',
      chatSessions: chatSessionHistory.filter(
        (chatSession) =>
          chatSession.updated.getTime() >= last30Days.getTime() &&
          chatSession.updated.getTime() < last7Days.getTime(),
      ),
    },
  ].filter(
    ({ chatSessions: groupChatSessions }) => groupChatSessions.length > 0,
  )
}

export const ChatSessionHistorySideMenu = () => {
  const chatSessionHistory = useChatSessionHistory()

  return (
    <>
      {groupHistoryChatSessionsByPeriod(chatSessionHistory).map(
        ({ period, chatSessions: periodChatSessionHistory }) => (
          <Fragment key={period}>
            <h2 className="fr-text--sm fr-text--medium fr-mb-0">{period}</h2>
            <div className="fr-btns-group fr-btns-group--sm">
              {periodChatSessionHistory.map((historyChatSession) => (
                <HistoryChatSessionButton
                  key={historyChatSession.id}
                  sessionHistoryItem={historyChatSession}
                />
              ))}
            </div>
          </Fragment>
        ),
      )}
    </>
  )
}

export default ChatSessionHistorySideMenu
