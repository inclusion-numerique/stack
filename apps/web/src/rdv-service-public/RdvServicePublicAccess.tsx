import { Route } from 'next'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import RdvServicePublicSigninButton from '@app/web/rdv-service-public/RdvServicePublicSigninButton'

const RdvServicePublicAccess = async ({
  classes,
  callbackUrl,
}: {
  classes?: {
    button?: string
  }
  callbackUrl: Route
}) => {
  const user = await getSessionUser()
  if (!user) {
    return null
  }

  return (
    <RdvServicePublicSigninButton
      callbackUrl={callbackUrl}
      className={classes?.button}
      user={user}
    />
  )
}

export default RdvServicePublicAccess
