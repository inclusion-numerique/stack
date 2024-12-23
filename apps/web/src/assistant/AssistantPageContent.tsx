import type { AssistantPageData } from '@app/web/assistant/getAssistantPageData'
import ChatSession from '@app/web/assistant/ChatSession'
import { SessionUser } from '@app/web/auth/sessionUser'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import styles from './ChatSession.module.css'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'

// Groupe les messages pour la sidebar
// "Aujourd'hui
// "Hier
// "7 derniers jours"
// "30 derniers jours"
const groupHistoryChatSessionsByPeriod = (
  chatSessions: AssistantPageData['chatSessions'],
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
      chatSessions: chatSessions.filter(
        (chatSession) => chatSession.updated.getTime() >= today.getTime(),
      ),
    },
    {
      period: 'Hier',
      chatSessions: chatSessions.filter(
        (chatSession) =>
          chatSession.updated.getTime() >= yesterday.getTime() &&
          chatSession.updated.getTime() < today.getTime(),
      ),
    },
    {
      period: '7 derniers jours',
      chatSessions: chatSessions.filter(
        (chatSession) =>
          chatSession.updated.getTime() >= last7Days.getTime() &&
          chatSession.updated.getTime() < yesterday.getTime(),
      ),
    },
    {
      period: '30 derniers jours',
      chatSessions: chatSessions.filter(
        (chatSession) =>
          chatSession.updated.getTime() >= last30Days.getTime() &&
          chatSession.updated.getTime() < last7Days.getTime(),
      ),
    },
  ].filter(
    ({ chatSessions: groupChatSessions }) => groupChatSessions.length > 0,
  )
}

const filterChatSessionForClient = (
  chatSession: AssistantPageData['chatSession'],
) => {
  if (!chatSession) {
    return chatSession
  }
  return {
    ...chatSession,
    messages: chatSession.messages.filter(
      (message) => message.role === 'User' || message.role === 'Assistant',
    ),
  }
}

const AssistantPageContent = async ({
  data: { chatSession, chatSessions },
  user,
}: {
  data: AssistantPageData
  user: SessionUser
  // eslint-disable-next-line @typescript-eslint/require-await
}) => (
  <div
    className={classNames(
      'fr-flex fr-align-items-stretch',
      styles.assistantPageContent,
    )}
  >
    <div
      className={classNames(
        'fr-border-right fr-px-4v fr-py-4v',
        styles.assistantSidemenu,
      )}
    >
      <h1 className="fr-h5 fr-text-title--blue-france">
        <span className="fr-icon-chat-3-line fr-icon--md fr-mr-2v" />
        Assistant
      </h1>
      {!!chatSession && (
        <div className="fr-btns-group fr-btns-group--sm fr-btns-group--icon-left">
          <Button
            iconId="fr-icon-add-line"
            className="fr-mb-2v"
            priority="tertiary"
            size="small"
            linkProps={{
              href: `/assistant/chat`,
            }}
          >
            Nouveau chat
          </Button>
        </div>
      )}
      {groupHistoryChatSessionsByPeriod(chatSessions).map(
        ({ period, chatSessions: historyChatSessions }) => (
          <>
            <h2 className="fr-text--sm fr-text--medium fr-mb-0">{period}</h2>
            <div className="fr-btns-group fr-btns-group--sm">
              {historyChatSessions.map((historyChatSession) => (
                <Button
                  className="fr-display-block fr-mb-0"
                  size="small"
                  priority="tertiary no outline"
                  key={historyChatSession.id}
                  linkProps={{
                    href: `/assistant/chat/${historyChatSession.id}`,
                  }}
                >
                  {historyChatSession.title ??
                    `Chat du ${dateAsDayAndTime(historyChatSession.created)}`}
                </Button>
              ))}
            </div>
          </>
        ),
      )}
    </div>
    {/* TODO layout */}
    <div className="fr-flex-grow-1">
      <div className={styles.chatSessionContainer}>
        <ChatSession chatSession={filterChatSessionForClient(chatSession)} />
      </div>
    </div>
  </div>
)

export default AssistantPageContent
