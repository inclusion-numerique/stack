import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { Spinner } from '@app/web/ui/Spinner'
import InfoButton from '@app/web/components/InfoButton'
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

const PersistenceStateBadge = ({
  state,
  openSavedInformationModal,
}: {
  state: PersistenceState
  openSavedInformationModal: () => void
}) =>
  state === 'saving' ? (
    <PersistenceStateBadgeWrapper>
      <Spinner size="small" />
      <span className="fr-ml-1w">Enregistrement&hellip;</span>
    </PersistenceStateBadgeWrapper>
  ) : (
    <PersistenceStateBadgeWrapper>
      <span className="fr-icon--sm fr-mb-0 fr-icon-check-line" />
      <span className="fr-ml-1w fr-mr-1v">Enregistré</span>
      <InfoButton
        iconId="fr-icon-information-line"
        title="Informations sur les lieux d'inclusion numérique"
        onClick={openSavedInformationModal}
      />
    </PersistenceStateBadgeWrapper>
  )

export default PersistenceStateBadge
