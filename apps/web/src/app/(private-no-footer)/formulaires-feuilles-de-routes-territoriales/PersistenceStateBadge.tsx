import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
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

const SavedInformationModal = createModal({
  id: 'action-bar-saved-information',
  isOpenedByDefault: false,
})

const PersistenceStateBadge = ({ state }: { state: PersistenceState }) => (
  <>
    {state === 'saving' ? (
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
          onClick={SavedInformationModal.open}
        />
      </PersistenceStateBadgeWrapper>
    )}
    <SavedInformationModal.Component title="Enregistrement automatique">
      <p>
        Votre formulaire est enregistré automatiquement, vous pouvez quitter à
        tout moment et revenir le compléter plus tard.
      </p>
    </SavedInformationModal.Component>
  </>
)

export default PersistenceStateBadge
