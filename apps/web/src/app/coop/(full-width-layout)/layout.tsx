import React from 'react'
import Header from '@app/web/components/Header'
import CreateCraModal from '@app/web/app/coop/(full-width-layout)/mes-activites/CreateCraModal'
import MinimalFooter from '@app/web/app/coop/MinimalFooter'
import { authenticateUser } from '@app/web/auth/authenticateUser'

const CoopFullWidthLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await authenticateUser()
  return (
    <div className="fr-layout__inner">
      <Header user={user} fullWidth variant="coop" />
      <div className="fr-layout__main">{children}</div>
      <CreateCraModal />
      <MinimalFooter />
    </div>
  )
}

export default CoopFullWidthLayout
