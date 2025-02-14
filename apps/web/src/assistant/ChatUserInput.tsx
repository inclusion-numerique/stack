'use client'

import classNames from 'classnames'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useScrollToBottom } from '@app/ui/hooks/useScrollToBottom'
import { chatStore } from '@app/web/assistant/chatStore'
import styles from '@app/web/assistant/ChatSession.module.css'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  useIsGenerating,
  useIsSendingUserMessage,
  useSendUserMessage,
} from '@app/web/assistant/hooks/useAssistantChatController'

/**
 * User interaction with the chat and completion execution logic
 */
const ChatUserInput = ({
  messagesContainerRef,
}: {
  // Used to scroll to the bottom of the messages
  messagesContainerRef: React.RefObject<HTMLDivElement>
}) => {
  const isSendingUserMessage = useIsSendingUserMessage()
  const isGenerating = useIsGenerating()

  const { scrollToBottom } = useScrollToBottom({
    containerRef: messagesContainerRef,
  })

  const form = useForm<{ prompt: string }>()

  const { sendUserMessage, abort } = useSendUserMessage()

  const onSubmit = form.handleSubmit(async (data) => {
    const prompt = data.prompt?.trim()

    if (!prompt) return

    try {
      scrollToBottom()
      await sendUserMessage({
        prompt,
        onStreamStarted: () => {
          form.reset({ prompt: '' })
        },
        onChunk: () => {
          scrollToBottom()
        },
      })
    } catch (error) {
      console.error('Chat stream error:', error)

      // This is an expected error, the user aborted the request
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (
        !!error &&
        typeof error === 'object' &&
        'name' in error &&
        error.name === 'AbortError'
      ) {
        // no op
      } else {
        chatStore.send({
          type: 'completionErrored',
          error: 'Une erreur est survenue 🙁, veuillez réessayer.',
        })
      }
    }
  })

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={onSubmit}>
        <div
          className={classNames(
            'fr-flex fr-flex-gap-4v fr-align-items-center fr-width-full',
            styles.input,
          )}
        >
          <InputFormField
            className="fr-flex-grow-1 fr-m-0"
            control={form.control}
            path="prompt"
            placeholder="Envoyer un message à l’assistant"
            disabled={isSendingUserMessage}
            classes={{
              input: 'fr-input--alt-blue-ecume',
              label: 'fr-display-none',
            }}
          />
          {isGenerating ? (
            <Button
              priority="tertiary"
              iconId="ri-stop-fill"
              type="button"
              className="fr-border-radius--32 fr-px-3v"
              onClick={abort}
              title="Arrêter"
            />
          ) : (
            <Button
              priority="primary"
              iconId="fr-icon-check-line"
              type="submit"
              {...buttonLoadingClassname(
                isSendingUserMessage,
                'fr-border-radius--32',
              )}
              title="Envoyer"
            />
          )}
        </div>
      </form>
      <p className="fr-mt-4v fr-mb-0 fr-text--xs fr-text-mention--grey fr-text--center">
        L’assistant peut faire des erreurs. Vérifiez les informations
        importantes.
      </p>
    </div>
  )
}

export default withTrpc(ChatUserInput)
