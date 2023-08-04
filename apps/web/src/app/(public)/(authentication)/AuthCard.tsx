import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './AuthCard.module.css'

export const AuthCard = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div className={classNames(styles.card, className)}>
    <main role="main" id="content" className={styles.inner}>
      {children}
    </main>
  </div>
)
