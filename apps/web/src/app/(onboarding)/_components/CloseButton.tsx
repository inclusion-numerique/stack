import Button from '@codegouvfr/react-dsfr/Button'
import styles from './OnboardingLayout.module.css'

export const CloseButton = ({ closeHref }: { closeHref: string }) => (
  <Button
    className={styles.closeButton}
    iconId="fr-icon-close-line"
    priority="secondary"
    title="Fermer"
    linkProps={{ href: closeHref }}
  />
)
