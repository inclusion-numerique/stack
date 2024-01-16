import React from 'react'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import BaseCard from '@app/web/components/Base/Card/BaseCard'
import { CreateBaseButton } from '../CreateBaseButton'

const Bases = ({
  user,
  bases,
  isConnectedUser,
}: {
  user: SessionUser | null
  bases: BaseListItem[]
  isConnectedUser: boolean
}) => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <h3 className="fr-mb-0">Bases · {bases.length}</h3>
      {isConnectedUser && <CreateBaseButton className="fr-btn--secondary" />}
    </div>
    {bases.map((base) => (
      <BaseCard user={user} base={base} key={base.slug} />
    ))}
  </div>
)

export default Bases
