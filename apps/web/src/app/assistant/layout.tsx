import { authenticateUser } from '@app/web/auth/authenticateUser'
import Header from '@app/web/components/Header'
import { notFound } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

const AssistantLayout = async ({ children }: PropsWithChildren) => {
  const user = await authenticateUser()

  // For now only admins can access assistant
  if (user.role !== 'Admin') {
    notFound()
  }

  return (
    <div className="fr-layout__inner">
      <Header user={user} fullWidth variant="coop" />
      <div className="fr-layout__main">{children}</div>
    </div>
  )
}

export default AssistantLayout
