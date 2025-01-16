'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useCallback, useEffect, useRef, useState } from 'react'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { dateAsDayAndTimeInTimeZone } from '@app/web/utils/dateAsDayAndTime'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { AssistantPageDataChatSessionHistoryItem } from '@app/web/assistant/getAssistantPageData'
import { trpc } from '@app/web/trpc'

const defaultTitle = ({ created }: { created: Date }) =>
  `Chat du ${dateAsDayAndTimeInTimeZone(created, 'Europe/Paris')}`

/**
 * Displays the button for the history chat session.
 * Will generate a title for the chat session if the title is not set
 */
const HistoryChatSessionButton = ({
  sessionHistoryItem: {
    id,
    created,
    title: initialTitle,
    _count: { messages },
  },
}: {
  sessionHistoryItem: AssistantPageDataChatSessionHistoryItem
}) => {
  const [title, setTitle] = useState(initialTitle ?? defaultTitle({ created }))

  const isGeneratingTitle = useRef(false)

  const mutation = trpc.assistant.generateSessionTitle.useMutation()

  const generateTitle = useCallback(async () => {
    if (
      messages < 3 ||
      initialTitle ||
      mutation.isPending ||
      mutation.isSuccess ||
      mutation.isError ||
      isGeneratingTitle.current
    ) {
      return
    }
    isGeneratingTitle.current = true
    const updated = await mutation.mutateAsync({ chatSessionId: id })
    setTitle(updated.title ?? defaultTitle({ created }))
  }, [initialTitle, created, id, mutation, messages])

  useEffect(() => {
    // Should run only once
    generateTitle().catch(console.error)
  }, [generateTitle])

  return (
    <Button
      size="small"
      priority="tertiary no outline"
      data-history-chat-session-button={id}
      linkProps={{
        href: `/assistant/chat/${id}`,
      }}
      {...buttonLoadingClassname(
        mutation.isPending,
        'fr-display-block fr-mb-0',
      )}
    >
      {title}
    </Button>
  )
}

export default withTrpc(HistoryChatSessionButton)
