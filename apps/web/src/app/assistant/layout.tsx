import { canUseAssistant } from '@app/web/assistant/canUseAssistant'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import Header from '@app/web/components/Header'
import { notFound } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

const AssistantLayout = async ({ children }: PropsWithChildren) => {
  const user = await authenticateUser()

  if (!canUseAssistant(user)) {
    return notFound()
  }

  return (
    <div className="fr-layout__inner">
      <Header user={user} fullWidth variant="coop" />
      <div className="fr-layout__main">{children}</div>
    </div>
  )
}

export default AssistantLayout
