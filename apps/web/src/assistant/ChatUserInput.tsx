'use client'

import { UseChatHelpers } from '@ai-sdk/react'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import styles from '@app/web/assistant/ChatSession.module.css'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React, { type FormEventHandler } from 'react'

/**
 * User interaction with the chat and completion execution logic
 */
const ChatUserInput = ({
  onSubmit: onSubmitProp,
  status,
  onChange,
  value,
  stop,
}: {
  onSubmit: FormEventHandler<HTMLFormElement>
  status: UseChatHelpers['status']
  error: UseChatHelpers['error']
  stop: UseChatHelpers['stop']
  value: UseChatHelpers['input']
  onChange: UseChatHelpers['handleInputChange']
}) => {
  const canSubmit = status === 'ready' || status === 'error'

  const isSendingUserMessage = status === 'submitted'
  const isGenerating = status === 'streaming'

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    if (!canSubmit) return
    onSubmitProp(event)
  }

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={onSubmit}>
        <div
          className={classNames(
            'fr-flex fr-flex-gap-4v fr-align-items-center fr-width-full',
            styles.input,
          )}
        >
          <input
            className="fr-input fr-flex-grow-1 fr-m-0 fr-input--alt-blue-ecume"
            type="text"
            minLength={1}
            placeholder="Envoyer un message à l’assistant"
            value={value}
            onChange={onChange}
            disabled={!canSubmit}
          />

          {isGenerating ? (
            <Button
              priority="tertiary"
              iconId="ri-stop-fill"
              type="button"
              className="fr-border-radius--32 fr-px-3v"
              onClick={stop}
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
