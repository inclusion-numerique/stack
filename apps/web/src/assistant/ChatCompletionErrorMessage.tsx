import Notice from '@codegouvfr/react-dsfr/Notice'
import React from 'react'

const ChatCompletionErrorMessage = ({ error }: { error?: string | null }) => {
  if (!error) return null
  return (
    <Notice
      title={`Une erreur est survenue : ${error}`}
      className="fr-my-8v fr-notice--alert"
    />
  )
}

export default ChatCompletionErrorMessage
