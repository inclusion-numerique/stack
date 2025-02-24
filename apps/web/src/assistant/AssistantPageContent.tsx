'use client'

import ChatSession from '@app/web/assistant/ChatSession'
import ChatSessionHistorySideMenu from '@app/web/assistant/ChatSessionHistorySideMenu'
import NewChatButton from '@app/web/assistant/NewChatButton'
import type { AssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { initialiseChatSession } from '@app/web/assistant/hooks/useAssistantChatController'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useEffect } from 'react'
import styles from './ChatSession.module.css'

const AssistantPageContent = ({
  data: { chatSession, chatSessionHistory },
}: {
  data: AssistantPageData
}) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to initialize when id changes
  useEffect(() => {
    initialiseChatSession({
      chatSessionHistory: chatSessionHistory ?? [],
      chatSession: chatSession ?? null,
    })
  }, [chatSession?.id])

  return (
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
        <div className="fr-btns-group fr-btns-group--sm fr-btns-group--icon-left">
          <Button
            linkProps={{ href: '/assistant/parametres' }}
            iconId="fr-icon-settings-5-line"
            priority="tertiary"
          >
            Paramètres
          </Button>
          <NewChatButton />
        </div>
        <ChatSessionHistorySideMenu />
      </div>
      <div className="fr-flex-grow-1">
        <div className={styles.chatSessionContainer}>
          <ChatSession />
        </div>
      </div>
    </div>
  )
}

export default withTrpc(AssistantPageContent)
