import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { Spinner } from '@app/web/ui/Spinner'
import styles from './PersistenceStateBadge.module.css'

const PersistenceStateBadgeWrapper = ({ children }: PropsWithChildren) => (
  <p
    className={classNames('fr-text--sm', 'fr-mb-0', styles.badge)}
    data-testid="resource-edition-state"
  >
    {children}
  </p>
)

export type PersistenceState = 'saving' | 'saved'

const PersistenceStateBadge = ({ state }: { state: PersistenceState }) => {
  if (state === 'saving') {
    return (
      <PersistenceStateBadgeWrapper>
        <Spinner size="small" />
        <span className="fr-ml-1w">Enregistrement&hellip;</span>
      </PersistenceStateBadgeWrapper>
    )
  }
  return (
    <PersistenceStateBadgeWrapper>
      <span className="fr-icon--sm fr-mb-0 fr-icon-check-line" />
      <span className="fr-ml-1w">Enregistré</span>
    </PersistenceStateBadgeWrapper>
  )
}

export default PersistenceStateBadge
