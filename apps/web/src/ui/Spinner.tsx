import classNames from 'classnames'
import styles from './Spinner.module.css'

export const Spinner = ({
  className,
  size = 'medium',
  inline,
}: {
  className?: string
  size?: 'small' | 'medium' | 'large'
  inline?: boolean
}) => (
  <span
    className={classNames(
      styles.spinner,
      inline && styles.inline,
      {
        [styles['spinner--sm']]: size === 'small',
        [styles['spinner--md']]: size === 'medium',
        [styles['spinner--lg']]: size === 'large',
      },
      className,
    )}
  />
)
