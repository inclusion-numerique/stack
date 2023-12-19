import React from 'react'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import BaseCard from '../Card/Card'
import { CreateBaseButton } from '../CreateBaseButton'
import styles from './Bases.module.css'

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
    <div className={styles.header}>
      <h3 className="fr-mb-0">Bases · {bases.length}</h3>
      {isConnectedUser && <CreateBaseButton className="fr-btn--secondary" />}
    </div>
    {bases.map((base) => (
      <BaseCard user={user} base={base} key={base.slug} />
    ))}
  </div>
)

export default Bases
