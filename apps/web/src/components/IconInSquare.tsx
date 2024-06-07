import classNames from 'classnames'
import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import styles from './IconInSquare.module.css'

const IconInSquare = ({
  className,
  iconId,
}: {
  className?: string
  iconId: ButtonProps.IconOnly['iconId']
}) => (
  <div
    className={classNames(
      'fr-background-alt--blue-france fr-border-radius--8',
      styles.container,
      className,
    )}
  >
    <span
      className={classNames('fr-text-title--blue-france', styles.icon, iconId)}
    />
  </div>
)

export default IconInSquare
