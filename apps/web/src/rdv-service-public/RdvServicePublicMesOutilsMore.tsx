import RdvServicePublicAccountStatusCard from '@app/web/app/coop/(full-width-layout)/mon-profil/RdvServicePublicAccountStatusCard'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasFeatureFlag } from '@app/web/security/hasFeatureFlag'
import React from 'react'

const RdvServicePublicMesOutilsMore = async () => {
  const user = await getSessionUser()

  if (!user) {
    return null
  }

  const hasRdvFeature = hasFeatureFlag(user, 'RdvServicePublic')

  if (!hasRdvFeature) {
    return null
  }

  return (
    <RdvServicePublicAccountStatusCard
      oAuthFlowRedirectTo="/coop/mes-outils/rdv-aide-numerique"
      user={user}
    />
  )
}

export default RdvServicePublicMesOutilsMore
