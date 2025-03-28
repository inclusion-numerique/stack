'use client'

import ChatThread from '@app/web/assistant/components/ChatThread'
import ChatThreadHistorySideMenu from '@app/web/assistant/components/ChatThreadHistorySideMenu'
import NewChatButton from '@app/web/assistant/components/NewChatButton'
import type { AssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { initialiseChatThread } from '@app/web/assistant/hooks/useAssistantChatController'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useEffect } from 'react'
import styles from './ChatThread.module.css'

const AssistantPageContent = ({
  data: { chatThread, chatThreadHistory, messages },
  threadId,
}: {
  data: AssistantPageData
  threadId: string
}) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to initialize when id changes
  useEffect(() => {
    initialiseChatThread({
      chatThreadHistory: chatThreadHistory ?? [],
      chatThread: chatThread ?? null,
    })
  }, [chatThread?.id])

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
        <ChatThreadHistorySideMenu />
      </div>
      <div className="fr-flex-grow-1">
        <div className={styles.chatThreadContainer}>
          <ChatThread threadId={threadId} initialMessages={messages} />
        </div>
      </div>
    </div>
  )
}

export default withTrpc(AssistantPageContent)
